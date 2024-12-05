import { Link, useLocation } from "react-router-dom";
import category from "../../Images/category.png"
import "./Sidebar.css";
import { useEffect, useState } from "react";
function Sidebar(){
    const location = useLocation();
    const [value,setValue] = useState();
    let loc = location.pathname.replace('/dashboard','');
    useEffect(()=>{
        switch(loc){
            case '/orders':
                setValue(2);
                break;
            case '/products':
                setValue(3);
                break;
            case '/addproduct':
                setValue(4);
                break;
            case '/addoffers':
                setValue(5);
                break;
            case '/addbest':
                setValue(6);
                break;
            case '/categorie':
                setValue(7);
                break;
            case '/sponsors':
                setValue(8);
                break;
            case '/settings':
                setValue(9);
                break;
            case "":
                setValue(1);
                break;
            case "/":
                setValue(1);
                break;
        }
    },[loc])
    return <div className="sidebar">
        <ul className="sidebar-menu">
            <Link className="sidebar-links" to=""><li className={(value==1)?"active-li":''}><i className="fa-solid fa-house-chimney"></i> Home</li></Link>
            <Link className="sidebar-links" to="orders"><li className={(value==2)?"active-li":''}><i className="fa-solid fa-bag-shopping"></i> Orders</li></Link>
            <Link className="sidebar-links" to="products"><li className={(value==3)?"active-li":''}><i className="fa-solid fa-box-open"></i> Products</li></Link>
            <Link className="sidebar-links" to="addproduct"><li className={(value==4)?"active-li":''}><i className="fa-solid fa-plus"></i> Add Product</li></Link>
            <Link className="sidebar-links" to="addoffers"><li className={(value==5)?"active-li":''}><i className="fa-solid fa-tag"></i> Today's Offers</li></Link>
            <Link className="sidebar-links" to="addbest"><li className={(value==6)?"active-li":''}><i className="fa-solid fa-arrow-up-right-dots"></i> Best Selling</li></Link>
            <Link className="sidebar-links" to="categorie"><li style={{display:"flex",alignItems:"center"}} className={(value==7)?"active-li":''}><img style={{marginRight:'10px'}} height="16px" src={category} /> Category</li></Link>
            <Link className="sidebar-links" to="sponsors"><li className={(value==8)?"active-li":''}><i className="fa-solid fa-handshake"></i> Sponsors</li></Link>
            <Link className="sidebar-links" to="settings"><li className={(value==9)?"active-li":''}><i className="fa-solid fa-gear"></i> Settings</li></Link>
        </ul>
    </div>
}
export default Sidebar;