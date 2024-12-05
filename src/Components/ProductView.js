import { useEffect, useState } from 'react';
import './ProductView.css';
import { Link } from 'react-router-dom';
import { Base_url } from "./helper";
function ProductView() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get('id');
  let category = urlParams.get('category');
  let brandname = urlParams.get('brand');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])

  return <div className="product-body">
    <ProductDetails id={id} />
    <RelatedProducts category={category} brandname={brandname} />
  </div>;
}

function ProductDetails({ id }) {
  const [product, setProduct] = useState({});
  async function getData() {
    try {
      let res = await fetch(Base_url+"/getproductdata/" + id);
      res = await res.json();
      setProduct(res);
    } catch (err) {
      console.log({ error: err });
    }
  }
  useEffect(() => {
    getData(id);
  }, []);
  useEffect(() => {
    getData(id);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [id])
  return <div className='product-main'>
    <Product_left product={product[0]} />
    <Product_right product={product[0]} id={id} />
  </div>
}

function Product_left({ product }) {
  const [image, setImage] = useState(product?.images[0]?.src);
  useEffect(() => {
    if (product?.images) {
      setImage(product.images[0].src);
    }
  }, [product]);
  function showThis(src) {
    setImage(src)
  }
  return <div className="product-left">
    <div className='product-for-scroll'>
      <div className="product-left-images">
        {product?.images?.map((item, index) => {
          return <div key={index} className="p-img"><img onClick={(e) => { showThis(e.target.src) }} src={item?.src} /></div>;
        })}
      </div>
    </div>
    <div className="product-left-image">
      <img src={image} />
    </div>
  </div>
}

function Product_right({ product, id }) {
  return <div className='product-right'>
    <div className='product-right-2'>
      <div className='brand'>{product?.brand}</div>
      <div className='description'>{product?.description}</div>
      <div className='product-price-ctn'>
        <span className='price'><span className="rupee">₹</span> {product?.discountedPrice?.toLocaleString()}</span><span className='actual-price'><span className="rupee">₹</span> {product?.price?.toLocaleString()}</span><span className='discount'>{product?.discount}% off</span>
      </div>
      <div className='stock-avail'>Availability Status - {product?.availabilityStatus}</div>
      <div className='model'>Model Number - {product?.modelNumber}</div>
      <div className='details'><span className='product-detail-title'>Product Details</span>
        <table>
          {
            product?.specifications?.map((item) => {
              return <tr><td className='data-type'>{item[0].speciality}</td><td className='data'>{item[0].value}</td></tr>
            })
          }
        </table>
      </div>
      <div className='delivery'>Free Delivery all over India</div>
      <div>Product will be delivery within week.</div>
      <div className='return-policy'>Return Policy: 30-day return policy.</div>
      <div className='buy-ctn'><Link to={"/bill?id=" + id}><button className='buy'>Buy Now</button></Link></div>
    </div>
  </div>;
}

function RelatedProducts({ category, brandname }) {
  const [products, setProducts] = useState();
  async function relatedWatches() {
    try {
      let res = await fetch(Base_url+"/relatedproducts?categorie=" + category + "&brand=" + brandname);
      res = await res.json();
      setProducts(res);
    } catch (err) {
      console.log({ error: err });
    }
  }
  useEffect(() => {
    relatedWatches()
  }, [])
  return (<div className="relateds-body">
    <div className="related-title">Related Products</div>
    <div className="launch-list">
      {
        products?.map((product, index) => {
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
                    (product?.discount === 0) ? '' : <div><div className="launch-real-price"> <span className="rupee">₹</span> {product?.price}</div><div className="launch-discounted-percent">{product?.discount}% off</div></div>
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

export default ProductView;