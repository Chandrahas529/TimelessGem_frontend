import { useState } from 'react';
import './EditProduct.css';
import upload from "../../Images/upload.png"
import { useEffect } from "react";
import { Base_url } from "./helper";
let tagNo = 0;
let imageNo = 0;
let specialityNo = 0;
function EditProduct(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const [product, setProduct] = useState();
    const [sells, setSells] = useState();
    async function getproductdata() {
        try {
            let res = await fetch(Base_url+"/adminproductview/" + id);
            res = await res.json();
            let res2 = await fetch(Base_url+"/sellquantity/" + id);
            res2 = await res2.json();
            setSells(res2.quantity);
            setProduct(res[0]);
        } catch (err) {
            console.log("Error : " + err)
        }
    }
    useEffect(() => {
        getproductdata()
    }, [])
    const [name,setName] = useState('');
    const [brand,setBrand] = useState('');
    const [model,setModel] = useState();
    const [desc,setDesc] = useState();
    const [price,setPrice] = useState(0);
    const [discount,setDiscount] = useState(0);
    const [discounted,setDiscounted] = useState();
    const [stock,setStock] = useState();
    const [categ,setCateg] = useState();
    const [availability,setAvailability] = useState();
    const [tag,setTag] = useState();
    const [tags,setTags] = useState([]);
    const [image,setImage] = useState();
    const [images,setImages] = useState([]);
    const [urlbox,setUrlbox] = useState(false);
    const [speciality,setSpeciality] = useState();
    const [value,setValue] = useState();
    const [specifications,setSpecifications] = useState([]);
    const [categorylist,setCategorylist] = useState([]);

    useEffect(()=>{
        setName(product?.name)
        setBrand(product?.brand)
        setModel(product?.modelNumber)
        setPrice(product?.price)
        setDiscount(product?.discount)
        setDiscounted(product?.discountedPrice)
        setStock(product?.stockQuantity)
        setAvailability(product?.availabilityStatus)
        setCateg(product?.categorie)
        setDesc(product?.description)
        setImages(product?.images)
        setSpecifications(product?.specifications)
        setTags(product?.tags)
        let tl = product?.tags.length - 1;
        let sl = product?.specifications.length - 1;
        specialityNo = product?.specifications[sl][0].id + 1;
        let il = product?.images.length - 1;
        imageNo = product?.images[il].id + 1;
        tagNo = product?.tags[tl].id + 1;
    },[product])
    useEffect(() =>{
        Categorylist();
    },[])
    async function Categorylist(){
        try{
            let res = await fetch(Base_url+"/categorylist");
            res = await res.json();
            setCategorylist(res);
        }catch(err){
            console.log({error:err});
        }
    }
    function calculate(){
        let calc = price*(100 - discount)/100;
        calc = parseInt(calc);
        setDiscounted(calc);
    }
    function removeSpeciality(index){
        const updated = specifications.filter((item)=>item[0].id != index);
        setSpecifications(updated);
    }
    function addspeciality(){
        setSpecifications([...specifications,[{id:specialityNo++,speciality:speciality,value:value}]]);
        setSpeciality('');
        setValue('');
    }
    function updateSpeciality(index,value){
        const update = specifications.map((item)=>item.id===index?{...item,speciality:value}:item);
        setSpecifications(update);
    }
    function updateValue(index,val){
        const update = specifications.map((item)=>item.id===index?{...item,value:val}:item);
        setSpecifications(update);
    }
    function showURLbox(){
        setUrlbox(true);
    }
    function addimage(){
        if(image!=""){
            setImages([...images,{id:imageNo++,src:image}])
            setImage('');
        }
    }
    function removeimage(index){
        const updated = images.filter((item)=>item.id != index);
        setImages(updated);
    }
    function addTag(){
        if(tag!=""){
            setTags([...tags,{id:tagNo++,tag:tag}]);
            setTag('');
        }
    }
    function deleteTag(index){
        const newTag = tags.filter((item)=>item.id != index);
        setTags(newTag);
    }
    function updateTag(index,value){
        const updated = tags.map((tag)=>tag.id===index?{...tag,tag:value}:tag);
        setTags(updated);
    }
    function handleChange(e){
        setCateg(e.target.value);
    }
    
    async function saveProduct() {
        try {
            let result = await fetch(Base_url+"/editproduct/"+id, {
                method: "PUT",
                body: JSON.stringify({
                    name, 
                    brand, 
                    modelNumber: model, 
                    description: desc, 
                    specifications, 
                    price, 
                    discount, 
                    discountedPrice: discounted, 
                    stockQuantity: stock, 
                    images, 
                    availabilityStatus: availability, 
                    categorie: categ, 
                    tags
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
                if (result.ok) {
                const data = await result.json();
                alert("Product saved successfully");
            } else {
                console.error("Failed to save the product:", result.statusText);
            }
        } catch (error) {
            console.error("Error saving the product:", error);
        }
    }

    return <div className="add-product">
    <div className="add-product-title">Add product</div>
    <div className="add-details">
        <div className="one-line-ctn">
            <div><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} type="text" /></div>
            <div><label>Brand</label><input value={brand} onChange={e=>setBrand(e.target.value)} type="text" /></div>
            <div><label>Model Number</label><input value={model} onChange={e=>setModel(e.target.value)} type="text" /></div>
            <div><label>Price</label><input onBlur={calculate} value={price} onChange={e=>setPrice(e.target.value)} type="text" /></div>
            <div><label>Discount Percentage(%)</label><input value={discount} onBlur={calculate} onChange={e=>setDiscount(e.target.value)} type="text" /></div>
            <div><label>Discounted Price</label><input value={discounted} type="text" disabled/></div>
            <div><label>Stock Quantity</label><input value={stock} onChange={e=>setStock(e.target.value)} type="text" /></div>
            <div><label>Availability Status</label><input value={availability} onChange={e=>setAvailability(e.target.value)} type="text" /></div>
            <div><label>Category</label>
                <select value={categ} onChange={handleChange}>
                    {
                        categorylist?.map((item)=>{
                            return <option value={item.categorie}>{item.categorie}</option>
                        })
                    }
                </select>
            </div>
        </div>        
        <div>
            <div>Specifications</div>
            <table className="speciality-list-ctn">
                <tr><th>Speciality</th><th>Value</th><th></th></tr>
                <tr><td><input value={speciality} onChange={e=>setSpeciality(e.target.value)} className="specific" type="text" /></td><td><input value={value} onChange={e=>setValue(e.target.value)} className="specific" type="text" /></td><td><button onClick={addspeciality} className="remove-specific-btn-add"><i className="fa-solid fa-plus"></i></button></td></tr>
                {
                    specifications?.map((item)=>{
                        return <tr key={item[0].id}><td><input value={item[0]?.speciality} onChange={e=>updateSpeciality(item.id,e.target.value)} className="specific" type="text" /></td><td><input value={item[0]?.value} onChange={e=>updateValue(item.id,e.target.value)} className="specific" type="text" /></td><td><button onClick={()=>removeSpeciality(item[0].id)} className="remove-specific-btn"><i className="fa-solid fa-trash"></i></button></td></tr>
                    })
                }
            </table>
        </div>
        <div>
            <div>Tags</div>
            <div className="tag-box-ctn">
                <input value={tag} onChange={(e)=>{setTag(e.target.value)}} className="tag-box" type="text"/>
                <button className="add-tag-btn" onClick={addTag}><i className="fa-solid fa-plus"></i></button>
            </div>
            <div className="tag-list">
                {
                    tags?.map((item)=>{
                         return <div key={item.id} className="tag-no"><input onChange={(e)=>{updateTag(item.id,e.target.value)}} value={item.tag} className="tags" type="text" /><button className="remove-tag-btn" onClick={()=>{deleteTag(item.id)}}><i className="fa-solid fa-trash"></i></button></div>
                    })
                }
            </div>
        </div>
        <div className="multi-line-ctn">
            <label>Description</label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)}></textarea>
        </div>
        <div className="image-upload-ctn">
            <div className="upload-title">Upload images</div>
            <div className="uploaded-images">
                {
                    images?.map((image)=>{
                        return <div key={image.id} className="uploaded-image">
                            <div className="uploaded-images-ctn"><img className="upload-icon" src={image?.src} /><button className="remove-image" onClick={()=>removeimage(image.id)}><i className="fa-solid fa-trash"></i></button></div>
                        </div>
                    })
                }
                <div onClick={showURLbox} className="uploaded-images-ctn"><img className="upload-icon" src={upload} /></div>
            </div>
        </div>
        <div className="save-product">
            <button onClick={saveProduct}>Save</button>
        </div>
    </div>
    {(urlbox)?<Showbox setUrlbox={setUrlbox} image={image} setImage={setImage} addimage={addimage}/>:""}
</div>;
}
function Showbox({setUrlbox,image,setImage,addimage}){
    return <div className="url-bg">
        <div className="url-ctn">
            <div>Paste URL here</div>
            <input value={image} onChange={(e)=>setImage(e.target.value)} className="url-box" type="text"/>
            <div className="url-action-btns"><button onClick={addimage}>Upload</button><button onClick={()=>{setUrlbox(false);setImage('')}}>Cancel</button></div>
        </div>
    </div>
}
export default EditProduct;