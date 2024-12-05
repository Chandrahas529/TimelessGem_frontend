import { Link, useNavigate } from "react-router-dom";
import "./Forgetpwd.css";
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from "./firebaseconfig";
import { Base_url } from "./helper";
function Forgetpwd() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const sendOtp = async () =>{
        try{
            const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{})
            const formattedNumber = "+91" + phoneNumber;
            const confirmation = await signInWithPhoneNumber(auth,formattedNumber,recaptcha)
            setConfirmationResult(confirmation)
            console.log(confirmation);
        }
        catch(err){
            console.log("Failed to sent.Error "+err)
        }
    }
    const verifyOtp = async () => {
        try{
            const data = await confirmationResult.confirm(otp)
            console.log(data)
        }
        catch(err){
            console.log("Failed.")
        }
    }
    return (
        <div className="pwd-bg">
            <div className="pwd-bg-2">
                <div className="pwd-ctn">
                    <div className="email-title">Please enter your phone number</div>
                    <div className="pwd-row">
                        <input 
                            className="login-box" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder="9090909090" 
                            type="text" 
                        />
                    </div>
                    <div className="pwd-btn-ctn">
                        <button onClick={sendOtp} className="sign-btn">Send OTP</button>
                    </div>
                    <div className="captcha" id="recaptcha"></div>
                    <div className="email-title">Please enter the OTP</div>
                    <div className="pwd-row">
                        <input 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            className="login-box" 
                            placeholder="Enter 6 digit OTP" 
                            type="text" 
                        />
                    </div>
                    <div className="pwd-btn-ctn">
                        <button onClick={verifyOtp} className="sign-btn">Verify OTP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgetpwd;
