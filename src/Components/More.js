import './More.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Base_url } from "./helper";
function More() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    return <div className='more-body'>
        <Searchbar />
        <Sponsors />
        <Products />
    </div>;
}
function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState();
    function showsearch() {
        navigate(`/search?query=${search}`);
    }
    function handleSearch(event) {
        if (event.key === "Enter")
            showsearch()
    }
    return <div className='searchbar'>
        <div className="search-box-ctn">
            <input onKeyDown={handleSearch} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search...." />
            <span onClick={showsearch}><i className="fa-solid fa-magnifying-glass"></i></span>
        </div>
    </div>
}

function Sponsors() {
    const [sponsor, setSponsor] = useState([]);
    const navigate = useNavigate();
    async function getSponsor() {
        try {
            let res = await fetch(Base_url+"/sponsoruser");
            res = await res.json()
            setSponsor(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    function showsearch(search) {
        navigate(`/search?query=${search}`);
    }
    useEffect(() => {
        getSponsor();
    }, [])
    return <div>
        <div className='sponsors'>Sponsored by</div>
        <div className='sponsors-ctn'>
            {
                sponsor.map((item, index) => {
                    return <div onClick={() => showsearch(item.brand)} key={index} className="sponsor-card"><img src={item.src} /></div>
                })
            }
        </div>
    </div>
}

function Products() {
    const [products, setProducts] = useState([]);
    async function getProducts() {
        try {
            let res = await fetch(Base_url+"/moreproducts");
            res = await res.json();
            setProducts(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useEffect(() => {
        getProducts();
    }, [])
    return <div className="mores-body">
        <div className="more-title">All Products</div>
        <div className="launch-list">
            {
                products.map((product, index) => {
                    return <div key={index} className="launch-card">
                        <Link to={"/product?id=" + product?._id + "&category=" + product?.categorie + "&brand=" + product?.brand} style={{ color: "inherit" }}>
                            <div className="launch-img-ctn">
                                <img src={product.images[0].src} />
                                {
                                    (product?.discount === 0) ? '' : <div className="discount-tag">{product?.discount}%<br />off</div>
                                }
                            </div>
                            <div className="launch-product-details">
                                <div className="product-brand">{product?.brand}</div>
                                <div className="product-title">{product?.description}</div>
                                <div className="price-ctn"><div className="launch-discounted-price"> <span className="rupee">₹</span> {product?.discountedPrice.toLocaleString()}</div>
                                {
                                    (product?.discount===0)?'':<div><div className="launch-real-price"> <span className="rupee">₹</span> {product?.price}</div><div className="launch-discounted-percent">{product?.discount}% off</div></div>
                                }
                                </div>
                            </div>
                        </Link>
                    </div>
                })
            }
        </div>
    </div>;
}
export default More;