import { Link } from "react-router-dom";
import Video from "../Videos/video4.mp4";
import cgi from "../Videos/cgi.mp4";
import logo from "../Images/logo.png";
import "./Home.css";
import { useEffect, useState } from "react";
import { Base_url } from "./helper";
function Home() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    return (
        <div className="home-body">
            <Section_1 />
            <Section_2 />
            <Section_3 />
            <Section_4 />
            <Section_5 />
            <Section_6 />
            <Footer />
            <Copyright />
        </div>);
}

function Section_1() {
    return <div className="section-1">
        <video src={Video} className="video" loop autoPlay muted>
        </video>
        <div className="titles">
            <div className="headline-1">Discover Timeless Elegance with Our Exquisite Watch Collection</div>
            <div className="headline-2">Explore a curated selection of luxury and modern timepieces that redefine style.</div>
            <Link to="/more">Shop Now</Link>
        </div>
    </div>;
}

function Section_2() {
    const [products, setProducts] = useState([]);
    async function launched() {
        try {
            let res = await fetch(Base_url+"/launched");
            res = await res.json();
            setProducts(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useEffect(() => {
        launched();
    }, [])
    return <div className="section-2">
        <div className="highlights-1"><div className="highl">Our Newly launched Watches</div><Link to="/launched"><div className="seemore">See more...</div></Link></div>
        <div className="launches-ctn">
            {
                products.map((product, index) => {
                    return <div key={index} className="card-new">
                        <div className="img-new-ctn"><img src={product.images[0].src} /></div>
                        <div className="watch-title">{product.name}</div>
                        <div className="watch-desc">{product.description}</div>
                        <Link to={"/product?id=" + product._id + "&category=" + product.categorie + "&brand=" + product.brand} ><button>Know more</button></Link>
                    </div>
                })
            }
        </div>
    </div>
}

function Section_3() {
    const [products, setProducts] = useState([]);
    const [i, setI] = useState(0);
    const outerwidth = document.querySelector("#outerctn");
    function previousSlide() {
        let slide = document.querySelector("#innerctn");
        slide.scrollLeft -= 300;
    }
    function nextSlide() {
        let slide = document.querySelector("#innerctn");
        slide.scrollLeft += 300;
    }
    async function getBest() {
        try {
            let res = await fetch(Base_url+"/getbest");
            res = await res.json();
            setProducts(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useEffect(() => {
        getBest();
    }, []);
    return <div className="section-3">
        <div className="highlight-2">Best Selling</div>
        <div className="best-ctn">
            <div className="best-img-ctn"><img className="hero-pic" src={products[i]?.images[0]?.src} /></div>
            <div className="best-desc">
                <div className="best-title">{products[i]?.name}</div>
                <div className="best-feauture">
                    {products[i]?.description}
                </div>
                <div className="best-price">Price <span className="rupee">₹</span>{products[i]?.discountedPrice?.toLocaleString()}</div>
                <div style={{ display: "flex", justifyContent: "center" }}><Link to={"/product?id=" + products[i]?._id + "&category=" + products[i]?.categorie + "&brand=" + products[i]?.brand} ><button className="best-buy">Buy Now</button></Link></div>
            </div>
        </div>
        <div className="best-list">
            <div id="outerctn" className="best-list-ctn-1">
                <div id="innerctn" className="best-list-ctn-2">
                    {
                        products.map((product, index) => {
                            return <div key={index} onClick={() => setI(index)} className="best-img-list"><img src={product.images[0].src} /></div>
                        })
                    }
                </div>
            </div>
            <button onClick={previousSlide} className="scroll-btn previous"><i className="fa-solid fa-arrow-left"></i></button>
            <button onClick={nextSlide} className="scroll-btn next"><i className="fa-solid fa-arrow-right"></i></button>
        </div>
    </div>;
}

function Section_4() {
    return <div className="section-4">
        <video className="video" src={cgi} loop autoPlay muted></video>
        <div className="mission-ctn">
            <div className="mission-headline">Our Mission</div>
            <div className="mission-desc">Our mission is to provide exceptional timepieces that combine quality, style, and precision, ensuring every moment is captured in elegance</div>
        </div>
    </div>;
}

function Section_5() {
    const [category, setCategory] = useState([]);
    async function categorie() {
        try {
            let result = await fetch(Base_url+"/category");
            result = await result.json();
            setCategory(result);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useState(() => {
        categorie();
    }, [])
    return <div className="section-5">
        <div className="highlights-1"><div className="highl">Types of watches</div><Link to="/categories"><div className="seemore">See more...</div></Link></div>
        <div className="categorie-ctn">
            {
                category.map((item, index) => {
                    return <div key={index} className="card-categ">
                        <div className="img-categ-ctn"><img src={item.src} /></div>
                        <div className="categ-type">{item.categorie}</div>
                        <Link to={"/filter?category="+item.categorie}><button>See all</button></Link>
                    </div>
                })
            }
        </div>
    </div>;
}

function Section_6() {
    const [products, setProducts] = useState([]);
    async function getOffers() {
        try {
            let res = await fetch(Base_url+"/getoffersuser");
            res = await res.json();
            setProducts(res);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useState(() => {
        getOffers();
    }, [])
    function resizeCtn() {
        let childHeight = document.querySelector('.offers-card').clientHeight;
        document.querySelector('.offer-ctn').style.height = 2 * childHeight + 40 + "px";
    }
    return <div onResize={resizeCtn} onLoad={resizeCtn} className="section-6">
        <div className="highlight-3">Today's offers</div>
        <div className="offer-ctn">
            {
                products.map((product, index) => {
                    return <div key={index} className="offers-card">
                        <Link to={"/product?id=" + product?._id + "&category=" + product?.categorie + "&brand=" + product?.brand} style={{color:"inherit"}}>
                            <div className="light-black-bg">
                                <img src={product.images[0].src} />
                                <div className="discount-tag">{product.discount}%<br />off</div>
                            </div>
                            <div>{product.brand}</div>
                            <div>{product.name}</div>
                            <div className="discounted-price"><span className="rupee">₹</span>{product.discountedPrice.toLocaleString()}</div>
                            <div className="real-price"><span className="rupee">₹</span>{product.price.toLocaleString()}</div>
                        </Link>
                    </div>
                })
            }
        </div>
        <div className="offers-see-more"><Link className="offers-link" to="/offers"><div className="seemore">See more...</div></Link></div>
    </div>
        ;
}

function Footer() {
    return <div className="footer">
        <div className="footer-left">
            <div className="big-logo-ctn"><img src={logo} /></div>
            <div className="social-title">Our social media links</div>
            <div className="social-links">
                <div className="link">
                    <i className="fa-brands fa-facebook"></i>
                </div>
                <div className="link">
                    <i className="fa-brands fa-x-twitter"></i>
                </div>
                <div className="link">
                    <i className="fa-brands fa-instagram"></i>
                </div>
                <div className="link">
                    <i className="fa-brands fa-youtube"></i>
                </div>
            </div>
        </div>
        <div className="footer-right">
            <div className="big-txt">Contact Us</div>
            <div>Email: support@timelessgems.com</div>
            <div>Phone: +91-800-123-4567<br />+91-800-234-9876</div>
            <div>Business Hours: Monday to Friday, 9 AM – 6 PM EST</div>
            <div className="big-txt">Legal</div>
            <div>Privacy Policy</div>
            <div><Link style={{ color: "white", textDecoration: "none" }} to="/terms">Terms of Service</Link></div>
        </div>
    </div>;
}

function Copyright() {
    return <div className="copyright">
        2024 TimelessGem. All rights reserved.
    </div>;
}
export default Home;