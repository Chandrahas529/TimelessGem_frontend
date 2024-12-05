import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Admin_Panel/Navabar";
import Home from "./Admin_Panel/Home";
import AddProduct from "./Admin_Panel/AddProduct";
import Sidebar from "./Admin_Panel/Sidebar";
import Orders from "./Admin_Panel/Orders";
import Products from "./Admin_Panel/Products";
import Addoffers from "./Admin_Panel/Addoffers";
import AddBest from "./Admin_Panel/AddBest";
import Settings from "./Admin_Panel/Settings";
import Categorie from "./Admin_Panel/Categorie";
import Sponsor from "./Admin_Panel/Sponsor";
import OrderView from "./Admin_Panel/OrderView";
import ProductDetails from "./Admin_Panel/ProductDetails";
import EditProduct from "./Admin_Panel/EditProduct";
import Nopage from "./Nopage";
import "./Dashboard.css";
import { useEffect } from "react";
import { Base_url } from "./helper";
function Dashboard() {
  const navigate = useNavigate();
      useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("user"))?.username){
          navigate("/admin");
        }
      },[navigate])
  return (
    <div>
      <Navbar />
      <div className="main-ctn">
          <Sidebar />
          <div className="special-ctn">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addbest" element={<AddBest />} />
            <Route path="addoffers" element={<Addoffers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="products" element={<Products />} />
            <Route path="sponsors" element={<Sponsor />} />
            <Route path="categorie" element={<Categorie />} />
            <Route path="orderdetails" element={<OrderView />} />
            <Route path="productdetails" element={<ProductDetails />} />
            <Route path="editproduct" element={<EditProduct />} />
            <Route path="*" element={<Nopage />} /> {/* Catch-all route within Dashboard */}
          </Routes>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
