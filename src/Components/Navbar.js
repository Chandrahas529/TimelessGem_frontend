import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../Images/logo.png"
import "./Navbar.css";
function Navbar (){
    const [menu,setMenu] = useState(false)
    function showMenu(){
        if(menu){
            removeMenu();
        }
        else{
            document.querySelector('.black-bg').classList.add('show-bg');
            document.querySelector('.nav-right').classList.add('show-nav');
            setMenu(true);
        }
    }
    function removeMenu(){
        document.querySelector('.black-bg').classList.remove('show-bg');
        document.querySelector('.nav-right').classList.remove('show-nav');
        setMenu(false);
    }
    return<nav>
        <div className="nav-left">
            <img src={logo} className="nav-logo"/>
            <div>TimelessGem Watches</div>
        </div>
        <i onClick={showMenu} className="menu fa-solid fa-bars"></i>
        <div className="nav">
            <div className="nav-right-ctn">
            <div id="black-bg" onClick={removeMenu} className="black-bg"></div>
                <div id="nav-right" className="nav-right">
                    <Link className="links" onClick={removeMenu} to="/">Home</Link>
                    <Link className="links" onClick={removeMenu} to="/more">More</Link>
                    <Link className="links" onClick={removeMenu} to="/aboutus">About Us</Link>
                    <Link className="links" onClick={removeMenu} to="/contact">Contat Us</Link>
                </div>
            </div>
        </div>
    </nav>;
}
export default Navbar;