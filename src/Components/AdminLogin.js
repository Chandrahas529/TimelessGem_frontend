import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { useState } from "react";
import { Base_url } from "./helper";
function AdminLogin (){
    return <div className="admin-login">
        <div className="admin-title">Admin Login</div>
        <Login />
    </div>;
}

function Login (){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    async function validate(){
        if(username && password){
            let result = await fetch(Base_url+'/login',{
                method:"post",
                body:JSON.stringify({username,password}),
                headers:{"Content-Type":"application/json"}
            })
            result = await result.json();
            if(result.username){
                localStorage.setItem("user",JSON.stringify(result))
                navigate("/dashboard");
            }
            else{
                alert("Invalid username or password.");
            }
        }
        else{
            alert("Please enter the correct details");
        }
    }
    return <div className="login-bg">
        <div className="login-bg-2">
            <div className="login-ctn">
                <div className="sign-title">Sign in</div>
                <div className="login-row"><span><i className="fa-solid fa-user"></i></span><input value={username} onChange={(e)=>{setUsername(e.target.value)}} className="login-box" placeholder="User name" type="text"/></div>
                <div className="login-row"><span><i className="fa-solid fa-lock"></i></span><input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="login-box" placeholder="Password" type="password"/></div>
                <div><Link to="/forgetpwd"><span className="forget">Forget Password ?</span></Link></div>
                <div className="sign-btn-ctn"><button onClick={validate} className="sign-btn">Sign in</button></div>
                <div style={{display:"flex",margin:"15px 0 15px 0"}}><Link to="/adminsignup"><span className="account">Don't have an account ?</span></Link></div>
            </div>
        </div>
    </div>
}
export default AdminLogin;