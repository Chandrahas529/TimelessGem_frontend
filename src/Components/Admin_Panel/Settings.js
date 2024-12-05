import "./Settings.css";
import profile from "../../Images/images (1).jpeg"
import { useState } from "react";
import { useEffect } from "react";
import { Base_url } from "./helper";
let prof = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s";
function Settings() {
    return <div className="settings">
        <div className="settings-title">Settings</div>
        <YourDetail />
        <OtherAdmins />
    </div>
}
function YourDetail() {
    const user = JSON.parse(localStorage.getItem("user"))._id;
    const [name,setName] = useState();
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [mobile,setMobile] = useState();
    async function Userdata(){
        try{
            let result = await fetch(Base_url+"/userdetail/"+user,{method:"get"});
            result = await result.json();
            setName(result.name);
            setUsername(result.username);
            setMobile(result.mobile);
            setEmail(result.email);
        }catch(err){
            console.log("Error - "+err);
        }
    }
    useEffect(()=>{
        Userdata();
    },[]);
    function editBox(e) {
        e.target.parentElement.previousElementSibling.childNodes[0].disabled = false;
        e.target.parentElement.previousElementSibling.childNodes[0].focus();
        e.target.parentElement.previousElementSibling.childNodes[0].classList.add('edit-mode');
    }
    async function removeEdit(e){
        try{
            let result = await fetch(Base_url+"/userupdate/"+user,{
                headers:{"Content-Type":"application/json"},
                method:"put",
                body:JSON.stringify({name,email,mobile,username})
            });
            result = result.json();
            console.log(result.acknowledged)
            if(result.acknowledged){
                alert("Updated Successfully!");
            }else{
                alert("Update Fail!");
            }
        }catch(err){
            console.log("Error :"+err);
        }

        e.target.disabled = true;
        e.target.classList.remove('edit-mode');
    }
    return <div className="your-detail">
        <span className="your-detail-title">Your Details</span>
        <div className="bio">
            <table>
                <tr>
                    <td>Name</td>
                    <td><input onBlur={removeEdit} className="custmer-d-box" disabled type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} /></td>
                    <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input onBlur={removeEdit}  className="custmer-d-box" disabled type="text" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} /></td>
                    <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td><input onBlur={removeEdit}  className="custmer-d-box" disabled type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} /></td>
                    <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
                </tr>
                <tr>
                    <td>Mobile</td>
                    <td><input onBlur={removeEdit}  className="custmer-d-box" disabled type="text" name="mobile" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} /></td>
                    <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td style={{textAlign:"end"}}>********</td>
                    <td><i className="fa-solid fa-pen"></i></td>
                </tr>
                <tr>
                    <td>Account created on</td>
                    <td style={{textAlign:"end"}}>22 Aug 2024</td>
                    <td></td>
                </tr>
            </table>
            <div className="bio-dp">
                <div className="profile-pic">
                    <img src={prof} />
                </div>
                <div>
                    <button className="pic-btn"><i className="fa-solid fa-camera"></i></button>
                    <button className="pic-btn"><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
}
function OtherAdmins() {
    const [admins, setAdmins] = useState([]);
    async function getAdmins() {
        try {
            let res = await fetch('http://localhost:7000/getadmins');
            res = await res.json();
            setAdmins(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useEffect(() => {
        getAdmins();
    }, [])
    return <div className="other-admins">
        <div className="other-title">Other Admins</div>
        <table>
            {
                admins.map((admin, index) => {
                    return <tr key={index}>
                        <td><img src={(admin?.profile) ? admin?.profile : prof} /></td>
                        <td>{admin?.name}</td>
                        <td>{admin?.username}</td>
                        <td>{admin?.email}</td>
                        <td>{admin?.mobile}</td>
                        <td>Joined in {admin?.date}</td>
                    </tr>
                })
            }
        </table>
    </div>
}
export default Settings;