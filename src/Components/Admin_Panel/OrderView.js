import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Admin_Panel/OrderView.css";
import { Base_url } from "./helper";
function OrderView() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    const [order, setOrder] = useState({})
    const [product, setProduct] = useState();
    const [showbox2, setShowbox2] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    async function getOrderDetails() {
        try {
            let res = await fetch(Base_url+"/orderdetails/" + id);
            res = await res.json();
            let res2 = await fetch(Base_url+"/orderproduct/" + res[0].productId);
            res2 = await res2.json();
            setProduct(res2[0])
            setOrder(res[0]);
        } catch (err) {
            console.log("error : " + err);
        }
    }
    async function deleteOrder() {
        try {
            let res = await fetch(Base_url+"/deleteorder/" + id, { method: "delete" });
            res = await res.json();
            if (res.acknowledged) {
                alert("Deleted Successfuly");
                goBack();
            } else {
                console.log("Failed to delete");
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getOrderDetails();
    }, [])
    return <div className="order-view">
        <Custmer orders={order} product={product} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <Product product={product} />
            <div><button className="delete-order-btn" onClick={() => { setShowbox2(true); setShowDelete(true) }}>Delete this order</button></div>
        </div>
        {
            (showbox2) ? <div className="black-bg-admin">
                {
                    (showDelete) ? <div className="update-categ">
                        <label>Are you sure you want to delete this order ?</label>
                        <div className="categ-action"><button onClick={deleteOrder}>Yes</button><button onClick={() => { setShowbox2(false); setShowDelete(false); }}>No</button></div>
                    </div> : ""
                }
            </div> : ""
        }
    </div>;
}
function Custmer({ orders, product }) {
    const [order, setOrder] = useState(orders);
    useEffect(() => {
        setOrder(orders)
    }, [orders])
    let colorStatus;
    if (order.orderStatus === "Pending") {
        colorStatus = "blue-pending"
    }
    if (order.orderStatus === "Delivered") {
        colorStatus = "green-pending"
    }
    if (order.orderStatus === "Canceled") {
        colorStatus = "red-pending"
    }
    function editBox(e) {
        e.target.parentElement.previousElementSibling.childNodes[0].disabled = false;
        e.target.parentElement.previousElementSibling.childNodes[0].focus();
        e.target.parentElement.previousElementSibling.childNodes[0].classList.add('edit-mode');
    }
    async function removeEditBox(e) {
        const { name, value } = e.target;
        e.target.disabled = true;
        e.target.classList.remove('edit-mode');
        try {
            let result = await fetch(Base_url+"/updateorder/" + order._id, {
                method: 'put',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [name]: value })
            });
            result = await result.json();
        } catch (err) {
            console.log("Error : " + err)
        }
    }
    function editDetail(e) {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    }
    return <table className="custmer-data">
        <tr>
            <td>Order Id</td>
            <td>{order?._id}</td>
            <td></td>
        </tr>
        <tr>
            <td>Name</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="name" value={order?.name} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Mobile</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="mobile" value={order?.mobile} onChange={editDetail}/></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Quantity</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="quantity" value={order?.quantity} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Product Model No.</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="modelNumber" value={product?.modelNumber} onChange={editDetail}/></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Paid Amount</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="amount" value={order?.amount} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Order Status</td>
            <td><input onBlur={removeEditBox} style={{textTransform:"capitalize"}} className={colorStatus+" custmer-d-box"} disabled type="text" name="orderStatus" value={order?.orderStatus} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>State</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="state" value={order?.state} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>District</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="district" value={order?.district} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>City/Village</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="city" value={order?.city} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Pincode</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="pincode" value={order?.pincode} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Street Address</td>
            <td><input onBlur={removeEditBox} className="custmer-d-box" disabled type="text" name="street" value={order?.street} onChange={editDetail} /></td>
            <td><i onClick={editBox} className="fa-solid fa-pen"></i></td>
        </tr>
        <tr>
            <td>Order on</td>
            <td>{order.date}</td>
            <td></td>
        </tr>
    </table>;
}
function Product({ product }) {
    const [image, setImage] = useState(product?.images[0]?.src);
    useEffect(() => {
        if (product?.images) {
            setImage(product.images[0].src);
        }
    }, [product]);
    function showThis(src) {
        setImage(src)
    }
    return <div className="order-right-product">
        <div className="product-order-title">Product Details</div>
        <div>
            <div className="images-ctn">
                <div className="images-ctn-left"><img className="main-img-ordered" src={image} /></div>
                <div className="images-ctn-right">
                    {
                        product?.images?.map((item, index) => {
                            return <div key={index} className="p-img"><img onClick={(e) => { showThis(e.target.src) }} src={item?.src} /></div>;
                        })
                    }
                </div>
            </div>
            <div className='brand-order'>{product?.brand}</div>
            <div className='description-order'>{product?.description}</div>
            <div className='product-price-ctn'>
                <span className='price-order'><span className="rupee-order">₹</span> {product?.discountedPrice?.toLocaleString()}</span><span className='actual-price-order'><span className="rupee-order">₹</span> {product?.price?.toLocaleString()}</span><span className='discount-order'>{product?.discount}% off</span>
            </div>
            <div className='stock-avail'>Availability Status - {product?.availabilityStatus}</div>
            <div className='stock-avail'>Stock Quantity - {product?.stockQuantity}</div>
            <div className='model'>Model Number - {product?.modelNumber}</div>
        </div>
    </div>;
}
export default OrderView;