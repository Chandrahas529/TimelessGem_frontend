import "./Offers.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Base_url } from "./helper";
function Offers() {
    useEffect(() => {
        getOffers();
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    const [products, setProducts] = useState([]);
    async function getOffers() {
        try {
            let res = await fetch(Base_url+"/offerproducts");
            res = await res.json();
            setProducts(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    return (<div className="offers-body">
        <div className="offer-title">Today's offers</div>
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
    </div>);
}
export default Offers;