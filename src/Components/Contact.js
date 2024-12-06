import { Link } from "react-router-dom";
import "./Contact.css";
import { useEffect } from "react";
function Contact (){
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])
    return(<div className="contact">
        <div className="row-1">
            <ContactDetail />
            <div className="return-detail">
                <div>To return or replacement the product please contact us on the given number or email.</div>
                <div>Before returning or replacing the product please read the <Link to="/terms">terms and condition</Link> properly.</div>
            </div>
        </div>
        <ContactForm />
    </div>);
}

function ContactDetail(){
    return <div className="contact-details">
        <div className="contact-titles">Contact Details</div>
        <div>Email: <span>support@timelessgem.com</span></div>
        <div>Phone: +91-800-123-4567<br />
        +91-800-234-9876</div>
        <div>Contact us on - Monday to Friday: 9 AM – 6 PM EST</div>
    </div>
}

function ContactForm(){
    return <div className="contact-form">
        <div className="contact-titles">Contact Form</div>
        <div>Have a question or need assistance? Fill out the form below and our team will get back to you promptly</div>
        <form>
            <div><label>Name : </label><input placeholder="John Doe" className="inputbox" type="text"/></div>
            <div><label>Email : </label><input placeholder="johndoe@gmail.com" className="inputbox" type="text"/></div>
            <div><label>Subject : </label><input placeholder="Subject" className="inputbox" type="text"/></div>
            <div><label>Message : </label><textarea placeholder="Hii!" className="message"></textarea></div>
            <button className="send">Send</button>
        </form>
    </div>
}
export default Contact;