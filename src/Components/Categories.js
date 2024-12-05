import { Link } from "react-router-dom";
import "./Categories.css";
import { useEffect, useState } from "react";
import { Base_url } from "./helper";
function Categories (){
    getCategory();
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])
    const [category,setCategory] = useState([]);
    async function getCategory(){
        try{
            let res = await fetch(Base_url+"/categorylist");
            res = await res.json();
            setCategory(res);
        }catch(err){
            console.log({error:err});
        }
    }
    return(<div className="categories">
        <div className="type-title">Types of Watches</div>
        <div className="categorie-ctn-list">
            {
                category.map((item,index)=>{
                    return <div key={index} className="card-categ-list">
                        <div className="img-categ-ctn-list"><img src={item.src} /></div>
                        <div className="categ-type-list">{item.categorie}</div>
                        <Link to={"/filter?category="+item.categorie}><button>See all</button></Link>
                    </div>
                })
            }
        </div>
    </div>);
}
export default Categories;