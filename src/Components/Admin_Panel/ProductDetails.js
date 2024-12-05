import { useEffect, useState } from "react";
import "../Admin_Panel/ProductDetails.css";
import { Link } from "react-router-dom";
import { Base_url } from "./helper";
function ProductDetails() {
    const [product, setProduct] = useState();
    const [image, setImage] = useState();
    const [sells, setSells] = useState();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    async function getproductdata() {
        try {
            let res = await fetch(Base_url+"/adminproductview/" + id);
            res = await res.json();
            let res2 = await fetch(Base_url+"/sellquantity/" + id);
            res2 = await res2.json();
            setSells(res2.quantity);
            setProduct(res[0]);
            setImage(res[0].images[0].src);
        } catch (err) {
            console.log("Error : " + err)
        }
    }
    useEffect(() => {
        getproductdata()
    }, [])
    function setSrc(src) {
        setImage(src);
    }
    async function changeOffer(val) {
        if (val) {
            try {
                let res = await fetch(Base_url+"/removeoffer/" + id, { method: "put" });
                res = await res.json();
                if (res.acknowledged) {
                    getproductdata();
                }
                else {
                    console.log("Failed to remove");
                }
            } catch (err) {
                console.log("error " + err);
            }
        }
        else{
            try{
                let res = await fetch(Base_url+"/addoffer/"+id,{method:"put"});
                res = await res.json();
                if(res.acknowledged){
                    getproductdata();
                }
                else{
                    console.log("Failed to add");
                }
            }catch(err){
                console.log("error "+err);
            }
        }
    }
    async function changeLaunch(val) {
        if (val) {
            try {
                let res = await fetch(Base_url+"/removelaunch/" + id, { method: "put" });
                res = await res.json();
                if (res.acknowledged) {
                    getproductdata();
                }
                else {
                    console.log("Failed to remove");
                }
            } catch (err) {
                console.log("error " + err);
            }
        }
        else{
            try{
                let res = await fetch(Base_url+"/addlaunch/"+id,{method:"put"});
                res = await res.json();
                if(res.acknowledged){
                    getproductdata();
                }
                else{
                    console.log("Failed to add");
                }
            }catch(err){
                console.log("error "+err);
            }
        }
    }
    async function changeBest(val) {
        if (val) {
            try {
                let res = await fetch(Base_url+"/removebest/" + id, { method: "put" });
                res = await res.json();
                if (res.acknowledged) {
                    getproductdata();
                }
                else {
                    console.log("Failed to remove");
                }
            } catch (err) {
                console.log("error " + err);
            }
        }
        else{
            try{
                let res = await fetch(Base_url+"/addbest/"+id,{method:"put"});
                res = await res.json();
                if(res.acknowledged){
                    getproductdata();
                }
                else{
                    console.log("Failed to add");
                }
            }catch(err){
                console.log("error "+err);
            }
        }
    }
    async function changePublish(val) {
        if (val==='public') {
            try {
                let res = await fetch(Base_url+"/removepublish/" + id, { method: "put" });
                res = await res.json();
                if (res.acknowledged) {
                    getproductdata();
                }
                else {
                    console.log("Failed to remove");
                }
            } catch (err) {
                console.log("error " + err);
            }
        }
        else{
            try{
                let res = await fetch(Base_url+"/addpublish/"+id,{method:"put"});
                res = await res.json();
                if(res.acknowledged){
                    getproductdata();
                }
                else{
                    console.log("Failed to add");
                }
            }catch(err){
                console.log("error "+err);
            }
        }
    }
    return <div className="product-details">
        <div className="product-view-title">Product View</div>
        <div className="product-sides-ctn">
            <div className="product-left-admin">
                <div>Product ID - {product?._id}</div>
                <div>Name - {product?.name}</div>
                <div>Brand - <span className="brand">{product?.brand}</span></div>
                <div>Model - {product?.modelNumber}</div>
                <div>Categorie - {product?.categorie}</div>
                <div>Total Sells - {sells}</div>
                <div>Date - {product?.date}</div>
                <div>Availability - <b className={(product?.availabilityStatus === "In stock") ? "greenstock" : "redstock"}>{product?.availabilityStatus}</b></div>
                <div>Stock Quantity - <b>{product?.stockQuantity}</b></div>
            </div>
            <div className="product-middle-admin">
                <div><b>Specifications</b> -
                    <table>
                        {
                            product?.specifications?.map((item) => {
                                return <tr><td className='data-type'>{item[0].speciality}</td><td className='data'>{item[0].value}</td></tr>
                            })
                        }
                    </table>
                </div>
                <div><b>Tags</b> -
                    <div className="tag-list-admin">
                        {
                            product?.tags?.map((item, index) => {
                                return <div key={index}>{item?.tag},</div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="product-right-admin">
                <div><img className="product-view-admin" src={image} /></div>
                <div className="product-admin-images">
                    {
                        product?.images.map((item) => {
                            return <img onClick={(e) => setSrc(e.target.src)} className="small-images" src={item.src} />
                        })
                    }
                </div>
            </div>
        </div>
        <div className='product-price-ctn'>
            <span className='price'><span className="rupee">₹</span> {product?.discountedPrice?.toLocaleString()}</span><span className='actual-price'><span className="rupee">₹</span> {product?.price?.toLocaleString()}</span><span className='discount'>{product?.discount}% off</span>
        </div>
        <div><b>Description</b> - <br />{product?.description}</div>
        <div>
            <b>Available in</b>
            <div className="offers-selling-launch">
                <div>Today's Offer Section - <b>{(product?.todaysOffer) ? "Yes" : "No"}</b><br /><br /><span><button onClick={()=>changeOffer(product?.todaysOffer)}>Change</button><i class="fa-solid fa-bullhorn big-icon"></i></span></div>
                <div>Launched Section - <b>{(product?.launched) ? "Yes" : "No"}</b><br /><br /><span><button onClick={()=>changeLaunch(product?.launched)}>Change</button><i className="fa-solid fa-tags big-icon"></i></span></div>
                <div>Best Selling Section - <b>{(product?.bestSelling) ? "Yes" : "No"}</b><br /><br /><span><button onClick={()=>changeBest(product?.bestSelling)}>Change</button><i className="fa-solid fa-arrow-up-right-dots big-icon"></i></span></div>
                <div>Publicaly available - <b>{(product?.publish === "public") ? "Yes" : "No"}</b><br /><br /><span><button onClick={()=>changePublish(product?.publish)}>Change</button><i class="fa-solid fa-globe big-icon"></i></span></div>
            </div>
        </div>
        <div>
            <b>Actions</b>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <div className="edit-box"><Link style={{display:"flex",alignItems:"center",color:"white"}} to={"/dashboard/editproduct?id="+product?._id}>Edit Product &ensp;&ensp;<i className="fa-solid fa-pen big-icon"></i></Link></div>
                <div className="delete-box">Delete Product &ensp;&ensp;<i className="fa-solid fa-trash big-icon"></i></div>
            </div>
        </div>
    </div>;
}
export default ProductDetails;