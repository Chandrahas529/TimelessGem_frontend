import { useEffect, useState } from "react";
import "./AddBest.css";
import { Link } from "react-router-dom";
import { Base_url } from "./helper";
function AddBest(){
    const [showAdd,setShowAdd] = useState(false);
    const [noneBestFunction, setNoneBestFunction] = useState(null);
    const [bestFunction,setBestFunction] = useState(null);
    return <div className="add-best">
        <div className="best-sell-title">Best Selling Watches</div>
        {
            (showAdd)?<AddBestWatch BestFunction={setBestFunction} setShowAdd={setShowAdd}  getNoneBest={noneBestFunction}/>:<div className="add-best-btn-ctn"><button onClick={()=>setShowAdd(true)} className="show-add-form">Add</button><div>You can add the product here. It will show the user's in best selling section.</div></div>
        }
        <BestSellingList bestList={bestFunction} setNoneBest={setNoneBestFunction} />
    </div>;
}
function BestSellingList({setNoneBest,bestList}){
    const [list,setList] = useState([]);
    async function getBestList(){
        try{
            let res = await fetch(Base_url+"/bestproduct");
            res = await res.json();
            setList(res);
        }catch(err){
            console.log({error:err});
        }
        
    }
    async function removebest(id){
        try{
            let res = await fetch(Base_url+"/removebest/"+id,{method:"put"});
            res = await res.json();
            if(res.acknowledged){
                alert("Product removed successfully.");
                getBestList();
                bestList();
            }
            else{
                console.log("Failed to remove");
            }
        }catch(err){
            console.log("error "+err);
        }
    }
    useEffect(()=>{
        getBestList();
        setNoneBest(() => getBestList);
    },[])
    return <div className="best-selling-list">
        <div className="best-list-ctn">
            {
                list.map((item)=>{
                    return <div className="admin-best-list">
                        <div className="product-img-ctn"><img src={item.images[0].src} className="product-image"/></div>
                        <div className="v-d-btn-ctn"><Link to={"/dashboard/productdetails?id="+item._id}><button className="v-d-btn"><i className="fa-solid fa-eye"></i></button></Link><button onClick={()=>removebest(item._id)} className="v-d-btn"><i class="fa-solid fa-trash"></i></button></div>
                        <div>{item.name}</div>
                    </div>
                })
            }
        </div>
    </div>
}
function AddBestWatch({setShowAdd,getNoneBest,BestFunction}){
    const [list,setList] = useState([]);
    const [realProduct,setRealProduct] = useState([]);
    const [search,setSearch] = useState();
    async function getNonBestList(){
        let res = await fetch(Base_url+"/nonebestproduct");
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
    useEffect(()=>{
        getNonBestList();
        BestFunction(()=> getNonBestList);
    },[])
    async function addbest(id){
        try{
            let res = await fetch(Base_url+"/addbest/"+id,{method:"put"});
            res = await res.json();
            if(res.acknowledged){
                alert("Product added successfully.");
                getNonBestList();
                getNoneBest();
            }
            else{
                console.log("Failed to add");
            }
        }catch(err){
            console.log("error "+err);
        }
    }
    return <div className="add-best-watch">
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="add-product-best-list-title">Add Product in best list</div>
                <button onClick={()=>{setShowAdd(false)}} className="add-best-cancel">Cancel</button>
            </div>
            <div><input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search here....." className="searchbox-best"/></div>
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
                list.map((product,index)=>{
                    return <tr>
                        <td><div style={{background:"white",display:"flex",justifyContent:"center"}}><img className="product-img" src={product.images[0].src} /></div></td>
                        <td>{product.name}</td>
                        <td className='t-c'>{product.brand}</td>
                        <td className='t-c'><span class="rupee">₹</span>{product.discountedPrice.toLocaleString()}</td>
                        <td className='t-c'><button className="add-best-btn" onClick={()=>addbest(product._id)}><i className="fa-solid fa-plus"></i></button></td>
                    </tr>
                })
            }
        </table>
            </div>
    </div>;
}

export default AddBest;