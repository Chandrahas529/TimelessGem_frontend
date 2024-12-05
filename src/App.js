import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductView from "./Components/ProductView";
import Launched from "./Components/Launched";
import Offers from "./Components/Offers";
import Categories from "./Components/Categories";
import Aboutus from "./Components/Aboutus";
import Contact from "./Components/Contact";
import Terms from "./Components/Terms";
import More from "./Components/More";
import Bill from "./Components/Bill";
import AdminLogin from "./Components/AdminLogin";
import Nopage from "./Components/Nopage";
import Filtered from "./Components/Filtered";
import Forgetpwd from "./Components/Forgetpwd";
import AdminSignup from "./Components/AdminSingup";
import Setpassword from "./Components/Setpassword";
import Dashboard from "./Components/Dashboard";
import Search from "./Components/Search";
import './App.css';

function App() {
  return (
    <Router>
      <Mainlayout />
    </Router>
  );
}

function Mainlayout(){
  const location = useLocation();
  const hideNavbarRoutes = ["/admin", "/forgetpwd", "/adminsignup", "/setpassword", "/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));
  return <>
    {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route index path="/" element={<Home />}/>
        <Route path="/product" element={<ProductView />}/>
        <Route path="/launched" element={<Launched />}/>
        <Route path="/offers" element={<Offers />}/>
        <Route path="/categories" element={<Categories />}/>
        <Route path="/aboutus" element={<Aboutus />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/terms" element={<Terms />}/>
        <Route path="/more" element={<More />}/>
        <Route path="/bill" element={<Bill />}/>        
        <Route path="/filter" element={<Filtered />}/>        
        <Route path="/admin" element={<AdminLogin />}/>        
        <Route path="/forgetpwd" element={<Forgetpwd />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/setpassword" element={<Setpassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="*" element={<Nopage />}/>        
      </Routes>
  </>
}

export default App;
