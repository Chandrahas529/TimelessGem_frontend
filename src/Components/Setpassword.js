import { useNavigate } from "react-router-dom";
import "./Setpassword.css";
import { useState , useEffect } from "react";
import { Base_url } from "./helper";
function Setpassword(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password ,setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [match, setMatch] = useState(true);
    const [errors, setErrors] = useState("Password must be at least 8 characters long.");
    const [err,setErr] = useState(false);
    useEffect(() => {
        const storedUsername = localStorage.getItem("new-user");
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate('/register');
        }
    }, [navigate]);
    function handlepwd(){
        if(password && cpassword){
            if(password === cpassword){
                setMatch(true);
                validatePassword(password);
            }
            else{
                setMatch(false);
            }
        }
    }
    async function validatePassword(password) {
        if (password.length < 8) {
            setErr(true);
            return setErrors("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            setErr(true);
            return setErrors("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            setErr(true);
            return setErrors("Password must contain at least one lowercase letter.");
        }
        if (!/\d/.test(password)) {
            setErr(true);
            return setErrors("Password must contain at least one number.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErr(true);
            return setErrors("Password must contain at least one special character.");
        }
        else{
            try{
                let result = await fetch(Base_url+"/setpassword",{
                    method:"post",
                    body:JSON.stringify({username,password}),
                    headers:{"Content-Type":"application/json"}
                })
                result = await result.json()
                if(result.acknowledged){
                    alert("Password saved successfully.");
                    localStorage.clear("new-user");
                    navigate("/admin");
                }
                else{
                    alert("No result found");
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }
    return <div className="set-pwd">
    <div className="set-pwd-bg">
        <div className="set-pwd-ctn">
            <div class="set-pwd-title">Set Password</div>
            <div className="row-set-pwd"><label>Password</label><input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="set-pwd-box"/></div>
            <div className="pwd-message">{(err)&& errors}</div>
            <div className="row-set-pwd"><label>Confirm Password</label><input value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} type="text" className="set-pwd-box"/></div>
            <div className="pwd-message">{(!match)&&"Password does not match"}</div>
            <div class="set-pwd-btn-ctn"><button onClick={handlepwd} class="set-pwd-btn">Save</button></div>
        </div>
    </div>
</div>;
}
export default Setpassword;