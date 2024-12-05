import { useEffect, useState } from "react";
import "./Orders.css";
import { Link } from "react-router-dom";
import { Base_url } from "./helper";
function Orders() {
    const [search, setSearch] = useState();
    const [cancel,setCancel] = useState(false);
    const [pending,setPending] = useState(false);
    return <div className="orders">
            <div className="orders-title">Orders</div>
            <Searchbox cancel={cancel} setCancel={setCancel} pending={pending} setPending={setPending} search={search} setSearch={setSearch} />
            <OrdersTable cancel={cancel} pending={pending} search={search}/>
    </div>;
}
function Searchbox({search,setSearch,cancel,setCancel,pending,setPending}){
    return <div className="admin-order-search-box">
        <div className="admin-order-search-ctn"><input value={search} onChange={(e)=>setSearch(e.target.value)} className="search-input" placeholder="Search here any name, brand, model no." type="text"/><i class="fa-solid fa-magnifying-glass admin-search"></i></div>
        <div className="check-boxes">
            <div className="check-ctn"><input type="checkbox" onChange={()=>(pending)?setPending(false):setPending(true)} id="pending"/><label for="pending">Pending Orders</label></div>
            <div className="check-ctn"><input type="checkbox" onChange={()=>(cancel)?setCancel(false):setCancel(true)} id="canceled"/><label for="canceled">Canceled Orders</label></div>
        </div>
    </div>
}

function OrdersTable({search,cancel,pending}){
    const [orders, setOrders] = useState([]);
    const [realOrders,setRealOrders] = useState([]);
    
    async function newOrders() {
        try {
            let res = await fetch(Base_url+"/orderlist");
            res = await res.json();
            const newdata = res.map((item) =>
                fetch(`http://localhost:7000/orderimages/${item.productId}`).then(result => result.json())
            );
            const newData = await Promise.all(newdata);
            const realData = res.map((item, index) => ({
                ...item,
                image: newData[index][0].images[0].src,
                model: newData[index][0].modelNumber
            }))
            setOrders(realData);
            setRealOrders(realData);
        } catch (err) {
            console.log({ error: err });
        }
    }
    useEffect(() => {
        newOrders();
    }, []);
    useEffect(()=>{
        if(pending){
            const filteredData = orders.filter(item=>{
                if(item.orderStatus==="Pending"){
                    return true;
                }
            })
            setOrders(filteredData);
        }else{
            setOrders(realOrders);
        }
    },[pending])
    useEffect(()=>{
        if(cancel){
            const filteredData = orders.filter(item=>{
                if(item.orderStatus==="Canceled"){
                    return true;
                }
            })
            setOrders(filteredData);
        }else{
            setOrders(realOrders);
        }
    },[cancel])
    useEffect(()=>{
        const filteredData = realOrders.filter(sea=>{
            search = search.toLowerCase()
            if(sea._id.toLowerCase().includes(search))
                return true;
            else if(sea.name.toLowerCase().includes(search))
                return true;
            else if(sea.city.toLowerCase().includes(search))
                return true;
            else if(sea.model.toLowerCase().includes(search))
                return true;
            else if(sea.state.toLowerCase().includes(search))
                return true;
            else if(sea.pincode.toString().toLowerCase().includes(search))
                return true;
            else if(sea.date.toLowerCase().includes(search))
                return true;
            else if(sea.amount.toString().toLowerCase().includes(search))
                return true;
            else if(sea.productId.toLowerCase().includes(search))
                return true;
            else if(sea.mobile.toString().toLowerCase().includes(search))
                return true;
            else if(sea.district.toLowerCase().includes(search))
                return true;
        })
        setOrders(filteredData);
    },[search])
    return <div>
        <table>
            <tr className="table-head-order-section"><th>Image</th><th>Order Id</th><th>Custmer name</th><th>Mobile no.</th><th>Model No</th><th>Paid amount</th><th>Order Status</th><th>Details</th></tr>
            {
                orders.map((order) => {
                    return <tr><td><div style={{ background: "white", display: "flex", justifyContent: "center" }}><img className="product-img" src={order?.image} /></div></td>
                        <td>{order._id}</td><td>{order.name}</td><td>{order.mobile}</td>
                        <td>{order.model}</td><td>{order.amount.toLocaleString()}</td><td>{order.orderStatus}</td><td className="view-btn"><Link to={"/dashboard/orderdetails?id="+order?._id}><button>View</button></Link></td></tr>
                })
            }
        </table>
    </div>
}


export default Orders;