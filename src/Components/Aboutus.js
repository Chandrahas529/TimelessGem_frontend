import { useEffect } from "react";
import "./Aboutus.css";
function Aboutus() {
  useEffect(()=>{
    window.scrollTo({
        top:0,
        behavior:"instant"
    })
  },[])
  return (<div className="aboutus">
    <div className="boxes">
      <div className="story">Brand Story</div>
      <div className="show-about">At TimelessGem, we believe that a watch is more than just a timepiece; it’s a reflection of your personal style and a testament to timeless craftsmanship. Our passion for excellence drives us to curate a collection of watches that blend classic elegance with modern innovation.</div>
    </div>
    <div className="boxes">
      <div className="mission">Mission</div>
      <div className="show-about">Our mission is to provide exceptional timepieces that combine quality, style, and precision, ensuring every moment is captured in elegance.</div>
    </div>
    <div className="boxes">
      <div className="choose">Why Choose Us</div>
      <div className="show-about">With a commitment to superior quality, unparalleled customer service, and a dedication to craftsmanship, TimelessGem is your go-to destination for exquisite watches.</div>
    </div>
  </div>);
}
export default Aboutus;