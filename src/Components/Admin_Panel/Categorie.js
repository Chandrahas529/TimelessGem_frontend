import { useEffect, useState } from "react";
import upload from "../../Images/upload.png"
import "./Categorie.css";
import { Base_url } from "./helper";
function Categorie() {
    const [showbox,setShowbox] = useState(false);
    const [showbox2,setShowbox2] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [category,setCategory] = useState();
    const [list,setList] = useState([]);
    const [src,setSrc] = useState();
    const [updatedURL,setUpdatedURL] = useState();
    const [updateId,setUpdateId] = useState();
    const [updatedText,setUpdatedText] = useState();
    const [updatecate,setUpdatecate] = useState();
    const [showImg,setShowImg] = useState(false);
    const [showText,setShowText] = useState(false);
    async function getCategories(){
        try{
            let result = await fetch(Base_url+"/getcategories");
            result = await result.json();
            setList(result);
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getCategories()
    },[])
    function formatDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${day} ${month} ${year}`;
    }
    const currentDate = new Date();
    let formattedDate = formatDate(currentDate);
    async function saveCateg(){
        if(category!="" && src!=""){
            try{
                let result = await fetch(Base_url+"/addcategorie",{
                    method:"post",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({categorie:category,src,date:formattedDate})
                })
                console.log(result)
                if(result){
                    getCategories();
                    setCategory('');
                    setSrc('');
                    setShowbox(false);
                    alert("Added successfuly!");
                }
                else{
                    alert("Error occured");
                }
            }
            catch(e){
                console.log("Error -",e);
            }
        }
    }
    async function updateImage(){
        try{
            let result = await fetch(Base_url+"/updatecategorieimage",{
                method:"put",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:updateId,src:updatedURL})
            });
            result = await result.json();
            if(result.acknowledged){
                setUpdateId('');
                setUpdatecate('');
                setShowbox2(false);
                setShowImg(false);
                getCategories();
                setUpdatedURL();
            }else{
                console.log("Failed to update.");
            }
        }catch(e){
            console.log(e)
        }
    }
    async function updateCategoryName(){
        try{
            let result = await fetch(Base_url+"/updatecategoryname",{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({categorie:updatedText,id:updateId})
            });
            result = await result.json();
            if(result.acknowledged){
                setUpdateId('');
                setUpdatecate('');
                setShowbox2(false);
                setShowText(false);
                getCategories();
            }else{
                console.log("Failed to update.")
            }
        }catch(err){
            console.log(err);
        }
    }
    async function deleteCategory(){
        try{
            let deleteCateg = await fetch(Base_url+"/deletecategorie/"+updateId,{method:"delete"});
            deleteCateg = await deleteCateg.json();
            if(deleteCateg.acknowledged){
                setShowbox2(false);setShowDelete(false);setUpdatecate('');setUpdateId('');
                getCategories();
            }else{
                console.log("Failed to delete.")
            }
        }catch(err){
            console.log("Error : "+err);
        }
    }
    function changeImg(index,categorie){
        setUpdateId(index);
        setUpdatecate(categorie);
        setShowbox2(true);
        setShowImg(true);
    }
    function changeText(index,categorie){
        setUpdateId(index);
        setUpdatecate(categorie);
        setUpdatedText(categorie);
        setShowbox2(true);
        setShowText(true);
    }
    function deleteCateg(index,categorie){
        setUpdateId(index);
        setUpdatecate(categorie);
        setShowbox2(true);
        setShowDelete(true);
    }
    function cancelImg(){
        setUpdateId('');
        setUpdatecate('');
        setShowbox2(false);
        setShowImg(false);
    }
    function cancelText(){
        setUpdateId('');
        setUpdatecate('');
        setShowbox2(false);
        setShowText(false);
    }
    return <div className="categorie">
        <div className="categories-title">Categories</div>
        <div className="add-categorie-ctn">
            <div onClick={()=>setShowbox(true)} className="add-categorie-list">
                <img className="categorie-img" src={upload} />
                <label className="categories-type">Add New</label>
            </div>
            {
                list.map((item)=>{
                    return <div key={item._id} className="add-categorie-list-2">
                        <img className="categorie-img-2" src={item?.src} />
                        <label className="categories-type-2">{item.categorie}</label>
                        <div onClick={()=>{changeImg(item._id,item.categorie)}} className="camera"><i className="fa-solid fa-camera"></i></div>
                        <div onClick={()=>{changeText(item._id,item.categorie)}} className="pen"><i className="fa-solid fa-pen"></i></div>
                        <div onClick={()=>{deleteCateg(item._id,item.categorie)}} className="trash"><i className="fa-solid fa-trash"></i></div>
                    </div>
                })
            }
        </div>
        {
            (showbox)?<div className="black-bg-add">
            <div className="add-categ">
                <label>Category</label><input value={category} onChange={e=>setCategory(e.target.value)} className="add-categ-box" type="text" />
                <label>Image URL</label><input value={src} onChange={e=>setSrc(e.target.value)} className="add-categ-box" type="text" />
                <div className="categ-action"><button onClick={saveCateg}>Save</button><button onClick={()=>{setShowbox(false);setCategory('');setSrc('')}}>Cancel</button></div>
            </div>
        </div>:""
        }
        {
            (showbox2)?<div className="black-bg-admin">
                {
                    (showImg)?<div className="update-categ">
                    <label>{updatecate}</label>
                    <label>Change URL</label><input value={updatedURL} onChange={e=>setUpdatedURL(e.target.value)} className="add-categ-box" type="text" />
                    <div className="categ-action"><button onClick={updateImage}>Save</button><button onClick={()=>{cancelImg(false);setUpdatedURL('')}}>Cancel</button></div>
                </div>:""
                }
                {
                    (showText)?<div className="update-categ">
                    <label>{updatecate}</label>
                    <label>Change Categorie</label><input value={updatedText} onChange={e=>setUpdatedText(e.target.value)} className="add-categ-box" type="text" />
                    <div className="categ-action"><button onClick={updateCategoryName}>Save</button><button onClick={()=>{cancelText(false);setUpdatedText('')}}>Cancel</button></div>
                </div>:""
                }
                {
                    (showDelete)?<div className="update-categ">
                    <label>Are you sure you want to delete this {updatecate} category ?</label>
                    <div className="categ-action"><button onClick={deleteCategory}>Yes</button><button onClick={()=>{setShowbox2(false);setShowDelete(false);setUpdatecate('');setUpdateId('')}}>No</button></div>
                </div>:""
                }
            </div>:""
        }
    </div>
}
export default Categorie;