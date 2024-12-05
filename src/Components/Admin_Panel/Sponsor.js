import "./Sponsor.css";
import empty from '../../Images/upload.png'
import { useEffect, useState } from "react";
import { Base_url } from "./helper";
function Sponsor() {
    const [showblack, setShowblack] = useState(false);
    const [showform, setShowform] = useState(false);
    const [showname, setShowname] = useState(false);
    const [showURL, setShowURL] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [sponsors, setSponsors] = useState([]);
    const [newbrand, setNewbrand] = useState();
    const [newimage, setNewimage] = useState();
    const [brandId, setBrandId] = useState();
    const [brand, setBrand] = useState();
    const [image, setImage] = useState();
    function formatDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }
    const currentDate = new Date();
    let formattedDate = formatDate(currentDate);
    window.addEventListener("click", () => {
        let node = document.querySelectorAll('.sponsor-action-list.action-active');
        node.forEach(item => {
            item.classList.remove('action-active');
        })
    })
    function cancelForm() {
        setShowblack(false);
        setShowform(false);
        setNewbrand('');
        setNewimage('');
    }
    async function saveNew() {
        if (newbrand && newimage) {
            try {
                let res = await fetch(Base_url+"/addsponsor", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ brand: newbrand, src: newimage, date: formattedDate })
                })
                res = await res.json();
                if (res.success) {
                    cancelForm();
                    getSponsor();
                }
            } catch (error) {
                console.log({ err: error });
            }

        }
    }
    async function getSponsor() {
        try {
            let res = await fetch(Base_url+"/getsponsor");
            res = await res.json();
            setSponsors(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    async function changeBrandName() {
        if(brand){
            try {
                let res = await fetch(Base_url+"/updatebrand/" + brandId, {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ brand })
                })
                res = await res.json();
                if (res.acknowledged) {
                    getSponsor();
                    cancelName();
                } else {
                    console.log("Failed to update");
                }
            } catch (err) {
                console.log({ Error: err });
            }
        }else{

        }
    }
    async function deleteBrand() {
        try {
            const src = image;
            let res = await fetch(Base_url+"/deletebrand/" + brandId, {
                method: "delete",
            })
            res = await res.json();
            if (res.acknowledged) {
                getSponsor();
                cancelDelete();
            } else {
                console.log("Failed to delete");
            }
        } catch (err) {
            console.log({ Error: err });
        }
    }
    async function changeBrandImage() {
        if(image){
            try {
                const src = image;
                let res = await fetch(Base_url+"/updatebrand/" + brandId, {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ src })
                })
                res = await res.json();
                if (res.acknowledged) {
                    getSponsor();
                    cancelName();
                } else {
                    console.log("Failed to update");
                }
            } catch (err) {
                console.log({ Error: err });
            }
        }else{

        }
    }
    function cancelName() {
        setBrand('');
        setBrandId('');
        setShowname(false);
        setShowblack(false);
    }
    function cancelImage() {
        setBrand('');
        setBrandId('');
        setShowURL(false);
        setShowblack(false);
        setImage('');
    }
    function cancelDelete() {
        setBrand('');
        setBrandId('');
        setShowblack(false);
        setShowDelete(false);
    }
    useEffect(() => {
        getSponsor();
    }, [])
    return <div className="sponsor">
        <div className="sponsor-title">Collaborations</div>
        <div className="sponsor-categorie-ctn">
            <div onClick={() => { setShowblack(true); setShowform(true) }} className="add-sponsor-list">
                <img src={empty} className="sponsor-img" />
                <label className="sponsor-name">Add new</label>
            </div>
            {
                sponsors.map((sponsor) => {
                    return <div className="add-sponsor-list">
                        <div className="sponsor-img-ctn">
                            <img src={sponsor?.src} className="sponsor-img-2" />
                            <i onClick={(e) => { e.target.nextElementSibling.classList.toggle('action-active') ;e.stopPropagation();}} className="fa-solid fa-ellipsis-vertical three-dots"></i>
                            <div className="sponsor-action-list">
                                <span onClick={() => { setShowblack(true); setShowname(true); setBrand(sponsor.brand); setBrandId(sponsor._id) }}><i className="fa-solid fa-pen"></i> Edit</span>
                                <span onClick={() => { setShowblack(true); setShowURL(true); setBrand(sponsor.brand); setBrandId(sponsor._id) }}><i className="fa-solid fa-camera"></i> Image</span>
                                <span onClick={() => { setShowblack(true); setShowDelete(true); setBrand(sponsor.brand); setBrandId(sponsor._id) }}><i className="fa-solid fa-trash"></i> Delete</span>
                            </div>
                        </div>
                        <label className="sponsor-name">{sponsor.brand}</label>
                    </div>
                })
            }
        </div>
        {
            (showblack) ? <div className="black-layer">
                {
                    (showform) ? <div className="add-categ">
                        <label>Brand Name</label><input value={newbrand} onChange={e => setNewbrand(e.target.value)} className="add-categ-box" type="text" />
                        <label>Image URL</label><input value={newimage} onChange={e => setNewimage(e.target.value)} className="add-categ-box" type="text" />
                        <div className="categ-action"><button onClick={saveNew}>Save</button><button onClick={cancelForm}>Cancel</button></div>
                    </div> : ""
                }
                {
                    (showname) ? <div className="add-categ">
                        <label>Change {brand} to</label><input value={brand} onChange={e => setBrand(e.target.value)} className="add-categ-box" type="text" />
                        <div className="categ-action"><button onClick={changeBrandName}>Save</button><button onClick={cancelName}>Cancel</button></div>
                    </div> : ""
                }
                {
                    (showURL) ? <div className="add-categ">
                        <label>Change image of {brand}</label><input value={image} onChange={e => setImage(e.target.value)} className="add-categ-box" type="text" />
                        <div className="categ-action"><button onClick={changeBrandImage}>Save</button><button onClick={cancelImage}>Cancel</button></div>
                    </div> : ""
                }
                {
                    (showDelete) ? <div className="add-categ">
                        <label>Are you sure you want to delete this {brand} brand.</label>
                        <div className="categ-action"><button onClick={deleteBrand}>Yes</button><button onClick={cancelDelete}>No</button></div>
                    </div> : ""
                }
            </div> : ""
        }
    </div>;
}
export default Sponsor;