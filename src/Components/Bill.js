import { useEffect, useState } from "react";
import "./Bill.css";
import { useNavigate } from "react-router-dom";
import { Base_url } from "./helper";
function Bill() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const [product, setProduct] = useState([]);
    const [quantity,setQuantity] = useState(1);
    const [forpay,setForpay] = useState(null);
    const [amount,setAmount] = useState();
    async function getData() {
      try {
        let res = await fetch(Base_url+"/getproductdata/" + id);
        res = await res.json();
        setProduct(res);
      } catch (err) {
        console.log({ error: err });
      }
    }
    useEffect(() => {
        getData();
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    function callFunc(){
        forpay(quantity,amount);
    }
    return (<div className="bill">
        <ProductData product={product[0]} Quantity={setQuantity}/>
        <div className="row-2">
            <Form quantity={quantity} pay={setForpay} id={id}/>
            <Billing quantity={quantity} product={product[0]} Totalamount={setAmount}/>
        </div>
        <div className="pay-ctn"><button onClick={callFunc} className="pay">Pay</button></div>
    </div>);
}

function ProductData({product,Quantity}) {
    const [quantity,setQuantity] = useState(1);
    function increaseQuantity(){
        if(quantity==10){

        }else{
            setQuantity(quantity=> quantity + 1);
        }
    }
    function decreaseQuantity(){
        if(quantity==1){

        }
        else{
            setQuantity(quantity => quantity - 1);
        }
    }
    useEffect(()=>{
        Quantity(quantity);
    },[quantity]);
    return <div className="product-data">
        <div className="product-img-ctn-2">
            <img src={product?.images[0]?.src} />
        </div>
        <div className='product-right-2'>
            <div className='brand-2'>{product?.brand}</div>
            <div className='description-2'>{product?.description}</div>
            <div className='product-price-ctn'>
                <span className='price-2'><span className="rupee">₹</span> {product?.discountedPrice.toLocaleString()}</span><span className='actual-price-2'><span className="rupee">₹</span> {product?.price.toLocaleString()}</span><span className='discount-2'>{product?.discount}% off</span>
            </div>
            <div className='delivery'>Free Delivery all over India</div>
            <div>Product will be delivery within week.</div>
            <div className='return-policy'>Return Policy: 30-day return policy.</div>
            <div className="quantity-ctn"><span>Quantity </span><span onClick={()=>decreaseQuantity()} className="minus"><i class="fa-solid fa-minus"></i></span><span className="quantity">{quantity}</span><span onClick={()=>increaseQuantity()} className="plus"><i class="fa-solid fa-plus"></i></span></div>
        </div>
    </div>;
}

function Form({pay,id}){
    const [name,setName] = useState();
    const [mobile,setMobile] = useState();
    const [state,setState] = useState();
    const [district,setDistrict] = useState();
    const [pincode,setPincode] = useState();
    const [city,setCity] = useState();
    const [street,setStreet] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        pay(()=>submitForm);
    },[])
    function submitForm(quantity,amount){
        //if(name && pincode && city && street){
            // if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            //     return alert("Name must contain only letters and spaces, and cannot be empty.");
            // }
            // if (!state || !/^[a-zA-Z\s]+$/.test(state)) {
            //     return alert("State must contain only letters and spaces, and cannot be empty.");
            // }
            // if (!district || !/^[a-zA-Z\s]+$/.test(district)) {
            //     return alert("District must contain only letters and spaces, and cannot be empty.");
            // }
            // if (!city || !/^[a-zA-Z\s]+$/.test(city)) {
            //     return alert("City must contain only letters and spaces, and cannot be empty.");
            // }
            // if (!mobile || !/^\d{10}$/.test(mobile)) {
            //     return alert("Mobile number must be exactly 10 digits.");
            // }
            // if (!pincode || !/^\d{6}$/.test(pincode)) {
            //     return alert("Pincode number must be exactly 6 digits.");
            // }
            // if (!street) {
            //     return alert("Street can contain letters, numbers, underscores, and dots, and cannot be empty.");
            // }
            senddetail(quantity,amount);
        // }
        // else{
        //     return alert("Please fill the all details");
        // }
    }
    async function senddetail(quantity,amount){
        let date = new Date().toISOString();
        const productId = id;
        try{
            if(name){
                let result = await fetch(Base_url+"/order",{
                    method:"post",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({street,name,mobile,quantity,city,pincode,district,state,productId,amount,date,orderStatus:"Pending",seenByAdmin:false})
                });
                result = await result.json();
                if(result){
                    alert("Order is completed.Your orderId is "+result);
                    //navigate("/");
                }
                else{
                    console.log("Order is failed.");
                }
            }
        }catch(err){
            console.log({error:err});
        }
    }
    return <div>
        <table className="table">
            <tr className="tr"><td className="td lable">Name : </td><td><input value={name} onChange={(e=>{setName(e.target.value)})} type="text" className="td txt-box"/></td></tr>
            <tr className="tr"><td className="td lable">Mobile : </td><td><input value={mobile} onChange={(e=>{setMobile(e.target.value)})} type="text" className="td txt-box"/></td></tr>
            <tr className="tr"><td className="td lable add-title">Address </td></tr>
            <tr className="tr"><td className="td lable">State : </td><td><input value={state} onChange={(e=>{setState(e.target.value)})} type="text" className="td txt-box"/></td></tr>
            <tr className="tr"><td className="td lable">District : </td><td><input value={district} onChange={(e=>{setDistrict(e.target.value)})} type="text" className="td txt-box"/></td></tr>
            <tr className="tr"><td className="td lable">Pincode : </td><td><input value={pincode} onChange={(e=>{setPincode(e.target.value)})} type="text" className="td txt-box"/></td></tr>
            <tr className="tr"><td className="td lable">City/Village : </td><td><input value={city} onChange={(e=>{setCity(e.target.value)})} type="text" className="td txt-box"/></td></tr>
            <tr className="tr"><td className="td lable">Street Address : </td><td><input value={street} onChange={(e=>{setStreet(e.target.value)})} type="text" className="td txt-box"/></td></tr>
        </table>
    </div>;
}

function Billing({quantity,product,Totalamount}){
    const [amount,setAmount] = useState(0);
    useEffect(()=>{
        const calc = 90 + (quantity * product?.discountedPrice);
        setAmount(calc);
        Totalamount(amount);
    },[product][quantity]);
    return <div>
        <table className="table-2">
            <tr className="oran"><td className="td-2" colSpan={2}>Bill</td></tr>
            <tr><td className="td-2">Brand</td><td className="td-2">{product?.brand}</td></tr>
            <tr><td className="td-2">Model</td><td className="td-2">{product?.modelNumber}</td></tr>
            <tr><td className="td-2">Watch Type</td><td className="td-2">{product?.categorie}</td></tr>
            <tr><td className="td-2">Price</td><td className="td-2"><span className="rupee">₹</span> {product?.discountedPrice.toLocaleString()}</td></tr>
            <tr><td className="td-2">Quantity</td><td className="td-2">{quantity}</td></tr>
            <tr><td className="td-2">Shipping Charge</td><td className="td-2"><span className="rupee">₹</span> 40</td></tr>
            <tr><td className="td-2">Total Tax</td><td className="td-2"><span className="rupee">₹</span> 50</td></tr>
            <tr className="oran"><td className="td-2">Total Price</td><td className="td-2"><span className="rupee">₹</span> {amount.toLocaleString()}</td></tr>
        </table>
    </div>;
}
export default Bill;