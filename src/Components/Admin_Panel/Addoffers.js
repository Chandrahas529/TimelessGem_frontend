import { useEffect, useState } from "react";
import "./Addoffers.css";
import { Link } from "react-router-dom";
import { Base_url } from "./helper";
function Addoffers() {
    const [showAdd, setShowAdd] = useState(false);
    const [reloadlist,setReloadlist] = useState(null);
    const [nonoffer,setNonoffer] = useState(null);
    return <div className="add-offers">
        <div className="offers-title">Today's Offers</div>
        {
            (showAdd) ? <AddTodaysOffer setNonoffer={setNonoffer} setShowAdd={setShowAdd} offerPro={reloadlist}/> : <div className="add-best-btn-ctn"><button onClick={() => setShowAdd(true)} className="show-add-form">Add</button><div>You can add the product here. It will show the user's in today's offers section.</div></div>
        }
        <div>
            <Products nonoffer={nonoffer} setReloadlist={setReloadlist}/>
        </div>
    </div>;
}
function AddTodaysOffer({ setShowAdd , offerPro , setNonoffer}) {
    const [list, setList] = useState([]);
    const [realProduct,setRealProduct] = useState([]);
    const [search,setSearch] = useState();
    async function getNonOfferList() {
        let res = await fetch(Base_url+"/noneoffersproduct");
        res = await res.json();
        setList(res);
        setRealProduct(res);
    }
    useEffect(()=>{
        const filteredData = realProduct.filter(sea=>{
            let sear = search.toLowerCase()
            if(sea.brand.toLowerCase().includes(sear))
                return true;
            else if(sea.name.toLowerCase().includes(sear))
                return true;
            else if(sea.categorie.toLowerCase().includes(sear))
                return true;
            else if(sea.modelNumber.toLowerCase().includes(sear))
                return true;
            else if(sea.tags.length>0){
                return sea.tags.some((item)=>{
                    if(item.tag.toLowerCase().includes(sear))
                    return true;
                }) 
            }
        })
        setList(filteredData);
    },[search]);
    useEffect(() => {
        getNonOfferList();
        setNonoffer(()=>getNonOfferList);
    }, []);
    async function addoffer(id){
        try{
            let res = await fetch(Base_url+"/addoffer/"+id,{method:"put"});
            res = await res.json();
            if(res.acknowledged){
                alert("Product added successfully.");
                getNonOfferList();
                offerPro();
            }
            else{
                console.log("Failed to add");
            }
        }catch(err){
            console.log("error "+err);
        }
    }

    return <div className="add-best-watch">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="add-product-best-list-title">Add Product in Today's offer</div>
            <button onClick={() => { setShowAdd(false) }} className="add-best-cancel">Cancel</button>
        </div>
        <div><input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search here....." className="searchbox-best" /></div>
        <div>
            <table className="product-table">
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Discounted Price</th>
                    <th>Add</th>
                </tr>
                {
                    list.map((product, index) => {
                        return <tr>
                            <td><div style={{ background: "white", display: "flex", justifyContent: "center" }}><img className="product-img" src={product.images[0].src} /></div></td>
                            <td>{product.name}</td>
                            <td className='t-c'>{product.brand}</td>
                            <td className='t-c'><span class="rupee">₹</span>{product.discountedPrice.toLocaleString()}</td>
                            <td className='t-c'><button className="add-best-btn" onClick={()=>{addoffer(product._id)}}><i className="fa-solid fa-plus"></i></button></td>
                        </tr>
                    })
                }
            </table>
        </div>
    </div>;
}
function Products({setReloadlist,nonoffer}){
    const [products,setProducts] = useState([]);
    async function getProducts(){
        try{
            let res = await fetch(Base_url+'/offersproduct');
            res = await res.json();
            setProducts(res);
        }catch(err){
            console.log("Error - " + err);
        }
    }
    async function removeOffer(id){
        try{
            let res = await fetch(Base_url+"/removeoffer/"+id,{method:"put"});
            res = await res.json();
            if(res.acknowledged){
                alert("Product removed successfully.");
                getProducts();
                nonoffer();
            }
            else{
                console.log("Failed to remove");
            }
        }catch(err){
            console.log("error "+err);
        }
    }
    useEffect(()=>{
        getProducts();
        setReloadlist(()=>getProducts);
    },[])
    return<div className="mores-body">
    <div className="more-title">Offers</div>
    <div className="more-list">
        {
            products.map((item)=>{
                return <div key={item._id} className="add-offers-card">
                <div className="add-offer-img-ctn">
                    <img src={item?.images[0]?.src}/>
                    <div className="v-d-btn-ctn"><Link to={"/dashboard/productdetails?id="+item._id}><button className="v-d-btn"><i className="fa-solid fa-eye"></i></button></Link><button onClick={()=>removeOffer(item._id)} className="v-d-btn"><i class="fa-solid fa-trash"></i></button></div>
                </div>
                <div className="more-product-details">
                    <div className="product-brand">{item.brand}</div>
                    <div className="product-title">{item.description}</div>
                    <div className="price-ctn"><div className="more-discounted-price"> <span className="rupee">₹</span> {item.discountedPrice}</div><div className="more-real-price"> <span className="rupee">₹</span> {item.price}</div><div className="more-discounted-percent">{item.discount}% off</div></div>
                </div>
            </div>
            })
        }
    </div>
</div>;
}
export default Addoffers;