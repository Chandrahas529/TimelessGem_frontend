import { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { Base_url } from "./helper";
function Products(){
    const [search,setSearch] = useState();
    const [outStock,setOutStock] = useState(false);
    const [lessStock,setLessStock] = useState(false);
    return <div className="products">
        <div className="products-title">Products</div>
        <Searchbox outStock={outStock} setOutStock={setOutStock} lessStock={lessStock} setLessStock={setLessStock} search={search} setSearch={setSearch}/>
        <ProductTable outStock={outStock} lessStock={lessStock} search={search}/>
    </div>
}
function Searchbox({search,setSearch,outStock,setOutStock,lessStock,setLessStock}){
    return <div className="admin-search-box">
        <div className="admin-search-ctn"><input value={search} onChange={(e)=>setSearch(e.target.value)} className="search-input" placeholder="Search here any name, brand, model no." type="text"/><i className="fa-solid fa-magnifying-glass admin-search"></i></div>
        <div className="check-boxes">
            <div className="check-ctn"><input type="checkbox" onChange={()=>(outStock)?setOutStock(false):setOutStock(true)} id="stock"/><label for="stock">Out of Stock</label></div>
            <div className="check-ctn"><input type="checkbox" onChange={()=>(lessStock)?setLessStock(false):setLessStock(true)} id="less-stock"/><label for="less-stock">Less Stock</label></div>
        </div>
    </div>
}
function ProductTable({search,outStock,lessStock}){
    const [products,setProducts] = useState([]);
    const [realProduct,setRealProduct] = useState([]);
    async function getProducts(){
        try{
            let result = await fetch(Base_url+"/product");
            result = await result.json();
            const newdata = result.map((item) =>
                fetch(`http://localhost:7000/sellquantity/${item._id}`).then(res => res.json())
            );
            const newData = await Promise.all(newdata);
            const realData = result.map((item, index) => ({
                ...item,
                sells:newData[index].quantity
            }))
            setProducts(realData);
            setRealProduct(realData);
        }catch(err){
            console.log("Error : "+err)
        }
    }
    useEffect(()=>{
        if(outStock){
            const filteredData = products.filter(item=>{
                if(item.availabilityStatus==="Out of stock"){
                    return true;
                }
            })
            setProducts(filteredData);
        }else{
            setProducts(realProduct);
        }
    },[outStock])
    useEffect(()=>{
        if(lessStock){
            const filteredData = products.filter(item=>{
                if(item.stockQuantity<10){
                    return true;
                }
            })
            setProducts(filteredData);
        }else{
            setProducts(realProduct);
        }
    },[lessStock])
    useEffect(()=>{
        const filteredData = realProduct?.filter(sea=>{
            search = search?.toLowerCase()
            if(sea.brand.toLowerCase().includes(search))
                return true;
            else if(sea.name.toLowerCase().includes(search))
                return true;
            else if(sea.categorie.toLowerCase().includes(search))
                return true;
            else if(sea.modelNumber.toLowerCase().includes(search))
                return true;
            else if(sea.tags.length>0){
                return sea.tags.some((item)=>{
                    if(item.tag.toLowerCase().includes(search))
                    return true;
                }) 
            }
        })
        setProducts(filteredData);
    },[search])
    useEffect(()=>{
        getProducts();
    },[])
    return <div>
        <table className="product-table">
            <tr>
                <th>S No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Brand</th>
                <th>Discounted/ <br />Actual Price</th>
                <th>Stock Quantity</th>
                <th>Sells</th>
                <th>View</th>
            </tr>
            {
                products.map((product,index)=>{
                    return <tr>
                        <td className='t-c'>{index + 1}</td>
                        <td><div style={{background:"white",display:"flex",justifyContent:"center"}}><img className="product-img" src={product?.images[0]?.src} /></div></td>
                        <td>{product?.name}</td>
                        <td>{product?.publish}</td>
                        <td className='t-c'>{product?.brand}</td>
                        <td className='t-c'><span className="rupee">₹</span>{product?.discountedPrice?.toLocaleString()}</td>
                        <td className='t-c'>{product?.stockQuantity}</td>
                        <td className='t-c'>{product?.sells}</td>
                        <td><Link to={"/dashboard/productdetails?id="+product?._id}><button className="view-product-btn">View</button></Link></td>
                    </tr>
                })
            }
        </table>
    </div>
}
export default Products;