import "./Terms.css";
import { useEffect } from "react";
function Terms() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    return (<div className="terms">
        <div className="terms-title">Terms and Conditions</div><br />

        <div className="terms-date">**Effective Date: July 27, 2024**</div><br />

        Welcome to TimelessGem. These Terms and Conditions ("Terms") govern your use of our website, products, and services. By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our website.<br />
        <br />
        <div className="terms-topic"> 1. **Acceptance of Terms**</div>
        By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms. These Terms constitute a legally binding agreement between you and TimelessGem.<br />
        <br />
        <div className="terms-topic">2. **Changes to Terms**</div>

        We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.<br />
        <br />
        <div className="terms-topic"> 3. **Use of the Website**</div>

        You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.<br />
        <br />
        <div className="terms-topic"> 4. **Account Registration**</div>

        To access certain features of our website, you may be required to create an account. You agree to provide accurate and complete information when creating an account and to update your information as necessary. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.<br />
        <br />
        <div className="terms-topic"> 5. **Privacy Policy**</div>

        Your use of our website is also governed by our Privacy Policy, which can be found [here](#). Our Privacy Policy explains how we collect, use, and disclose your personal information.<br />
        <br />
        <div className="terms-topic"> 6. **Product Information**</div>

        We strive to provide accurate descriptions and images of our products. However, we do not warrant that product descriptions or other content on the website are accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.<br />
        <br />
        <div className="terms-topic"> 7. **Pricing and Availability**</div>

        All prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time. In the event that a product is listed at an incorrect price due to a typographical error or an error in pricing information, we shall have the right to refuse or cancel any orders placed for products listed at the incorrect price.<br />
        <br />
        <div className="terms-topic"> 8. **Payment**</div>

        We accept various forms of payment, as indicated on our website. By placing an order, you represent and warrant that you have the legal right to use the payment method provided. You agree to pay all charges incurred by you or any users of your account and credit card (or other applicable payment mechanism) at the prices in effect when such charges are incurred.<br />
        <br />
        <div className="terms-topic"> 9. **Shipping and Returns**</div>

        Shipping and return policies are detailed **. By placing an order, you agree to our shipping and return policies.<br />
        <br />
        <div className="terms-topic"> 10. **Intellectual Property**</div>

        All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of TimelessGem or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, modify, or distribute any content from our website without our prior written permission.<br />
        <br />
        <div className="terms-topic"> 11. **Disclaimer of Warranties and Limitation of Liability**</div>

        Our website and products are provided "as is" and "as available" without warranties of any kind, either express or implied. TimelessGem disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose. In no event shall TimelessGem be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our website or products.<br />
        <br />
        <div className="terms-topic"> 12. **Indemnification**</div>

        You agree to indemnify, defend, and hold harmless TimelessGem, its officers, directors, employees, agents, and suppliers from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of our website or products.<br />
        <br />
        <div className="terms-topic"> 13. **Governing Law**</div>

        These Terms and any disputes arising out of or related to these Terms or your use of our website or products shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law principles.<br />
        <br />
        <div className="terms-topic"> 14. **Contact Information**</div>

        If you have any questions about these Terms, please contact us at:<br />

        TimelessGems <br />
        Email: <span style={{ color: "#04c3ff", cursor: "pointer" }}>support@timelessgem.com</span>  <br />
        Phone: 1-800-123-4567  <br />
        Address: Raipur, Chhattisgarh India<br />

        Thank you for choosing TimelessGem. We appreciate your business and look forward to serving you.
    </div>);
}
export default Terms;