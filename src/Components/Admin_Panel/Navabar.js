import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../Images/logo.png"
import "./Navbar2.css";
function Navbar (){
    const navigate = useNavigate();
    const username = JSON?.parse(localStorage?.getItem("user"))?.username || '';
    if(username==''){
        navigate("/admin");
      }
    function togglename(){
        document.querySelector('.admin-name').classList.toggle('show-name')
    }
    function logout(){
        localStorage.clear();
        navigate("/admin");
    }
    return <nav className="nav2">
        <div className="nav-left-2">
            <img src={logo} className="nav-logo"/>
            <div><div>TimelessGem</div>
                <div className="admin-panel-title">Admin Panel</div>
            </div>
        </div>
            <div className="nav-right-ctn-2">
                <div id="nav-right" className="nav-right-2">
                    <div className="user-info">
                        <div className="admin-name">{username}</div>
                        <div onClick={togglename} className="admin-photo-ctn">
                            <img className="admin-photo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s"/>
                        </div>
                    </div>
                    <button onClick={logout} className="logout"><div className="logout-txt">Logout</div><i className="logout-icon fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
    </nav>;
}
export default Navbar;