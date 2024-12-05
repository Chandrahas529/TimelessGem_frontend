import { useEffect, useRef, useState } from "react";
import "./Search.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Base_url } from "./helper";
function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const searchBox = useRef();

    useEffect(() => {
        //searchBox.current.focus();
    }, []);

    function showSearch() {
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${searchTerm}`);
        }
    }

    useEffect(() => {
        // Sync the input field with the current query in the URL
        const query = new URLSearchParams(location.search).get('query') || '';
        setSearchTerm(query);
    }, [location.search]);
    function handleSearch(event) {
        if (event.key === "Enter") {
            showSearch();
        }
    }
    return (
        <div>
            <div className="search-box-ctn">
                <input ref={searchBox} value={searchTerm} onKeyDown={handleSearch} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search...." />
                <span onClick={showSearch}><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            {/* Render SearchResult with the current URL query */}
            <SearchResult />
        </div>
    );
}

function SearchResult() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    async function getProducts(query) {
        try {
            let res = await fetch(`http://192.168.43.148:7000/search?searched=${query}`);
            res = await res.json();
            setProducts(res);
        } catch (err) {
            console.log({ error: err });
        }
    }

    useEffect(() => {
        // Get the query from the URL and fetch the results
        const query = new URLSearchParams(location.search).get('query') || '';
        if (query) {
            getProducts(query);
        }
    }, [location.search]);

    return (
        <div className="search-body">
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
        </div>
    );
}

export default Search;
