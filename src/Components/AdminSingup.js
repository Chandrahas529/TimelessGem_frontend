import { useNavigate } from "react-router-dom";
import "./AdminSignup.css";
import { useState } from "react";
import { Base_url } from "./helper";
function AdminSignup() {
    const navigate = useNavigate();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [username,setUsername] = useState();
    const [mobile,setMobile] = useState();
    async function signup(){
        if(name && email && username && mobile){
            if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
                return alert("Name must contain only letters and spaces, and cannot be empty.");
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return alert("Invalid email format.");
            }
            if (!mobile || !/^\d{10}$/.test(mobile)) {
                return alert("Mobile number must be exactly 10 digits.");
            }
            if (!username || !/^[a-zA-Z0-9._]+$/.test(username)) {
                return alert("Username can contain letters, numbers, underscores, and dots, and cannot be empty.");
            }
            senddetail();
        }
        else{
            return alert("Please fill the all details");
        }
    }
    async function senddetail(){
        let result = await fetch(Base_url+"/register",{
            method:"post",
            body:JSON.stringify({name,email,username,mobile}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json()
        if(result.exists){
            if(result.matchedField === "email"){
                alert("The entered email is already exists. Please use the different email")
            }
            if(result.matchedField === "username"){
                alert("This username is already exists. Please use the different username")
            }
            else{
                alert("The entered number is already exists. Please use the different number.")
            }
        }
        else{
            localStorage.setItem("new-user",result.username)
            alert("Registered successfully!")
            navigate("/setpassword");
        }
    }
    return <div className="signup">
        <div className="signup-bg">
            <div className="signup-ctn">
                <div className="signup-title">Sign up</div>
                <div className="row-sign"><label>Name</label><input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="signup-box"/></div>
                <div className="row-sign"><label>Email</label><input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" className="signup-box"/></div>
                <div className="row-sign"><label>Username</label><input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" className="signup-box"/></div>
                <div className="row-sign"><label>Mobile</label><input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} type="text" className="signup-box"/></div>
                <div className="sign-btn-ctn"><button onClick={signup} className="sign-btn">Submit</button></div>
            </div>
        </div>
    </div>;
}
export default AdminSignup;