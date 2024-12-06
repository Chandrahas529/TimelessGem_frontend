import { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { Base_url } from "./helper";
function Home(){
    return <div className="home">
        <Statusbar />
        <Recentorders />
    </div>
}

function Statusbar(){
    const [orders,setOrders] = useState();
    const [amount,setAmount] = useState();
    async function getTotalOrders(){
        try{
            let res = await fetch(Base_url+"/gettotalorders");
            res = await res.json();
            setOrders({total:res.totalorders,today:res.todayorders,month:res.monthorders,year:res.yearorders});
        }catch(err){
            console.log(err);
        }
    }
    async function getTotalAmount(){
        try{
            let res = await fetch(Base_url+"/gettotalamount");
            res = await res.json();
            setAmount({total:res.totalamount,today:res.todayamount,month:res.monthamount,year:res.yearamount});
        }catch(err){
            console.log("Error : "+err);
        }
    }
    useEffect(()=>{
        getTotalOrders();
        getTotalAmount();
    },[])
    return <div className="status-bar">
        <div className="order-boxes">
            <div className="total-title"><span>Total Orders</span><span>{orders?.total?.toLocaleString()}</span></div>
            <div className="time-list">
                <div className="time-box red"><span>Today</span><span>{orders?.today?.toLocaleString()}</span></div>
                <div className="time-box green"><span>This Month</span><span>{orders?.month?.toLocaleString()}</span></div>
                <div className="time-box blue"><span>This Year</span><span>{orders?.year?.toLocaleString()}</span></div>
            </div>
        </div>
        <div className="sell-boxes">
        <div className="total-title"><span>Total Sells</span><span><span className="rupee">₹</span>{amount?.total?.toLocaleString()}</span></div>
            <div className="time-list">
                <div className="time-box red"><span>Today</span><span><span className="rupee">₹</span>{amount?.today?.toLocaleString()}</span></div>
                <div className="time-box green"><span>This Month</span><span><span className="rupee">₹</span>{amount?.month?.toLocaleString()}</span></div>
                <div className="time-box blue"><span>This Year</span><span><span className="rupee">₹</span>{amount?.year?.toLocaleString()}</span></div>
            </div>
        </div>
    </div>;
}

function Recentorders(){
    const [orders,setOrders] = useState([]);
    async function newOrders(){
        try{
            let res = await fetch(Base_url+"/neworders");
            res = await res.json();
            const newdata = res.map((item)=>
                fetch(`${Base_url}/orderimages/${item.productId}`).then(result=>result.json())
            );
            const newData = await Promise.all(newdata);
            const realData = res.map((item,index)=>({
                ...item,
                model:newData[index][0].modelNumber
            }))
            setOrders(realData);
        }catch(err){
            console.log({error:err});
        }
    }
    useEffect(()=>{
        newOrders();
    },[]);
    async function addSeen(id){
        try{
            let res = await fetch(Base_url+"/orderseen/"+id,{method:"put"});
            res = await res.json();
            if(res.acknowledged){
                newOrders()
            }else{
                alert("Failed to seen");
            };
        }catch(err){
            console.log("Error : "+err);
        }
    }
    return <div className="recent-orders">
        <h2>New Orders</h2>
        <table>
            <tr className="table-head"><th>Order Id</th><th>Custmer name</th><th>Mobile no.</th><th>Model No</th><th>Paid</th><th>Mark as</th><th>Details</th></tr>
            {
                orders?.map((order,index)=>{
                    return <tr key={index}><td>{order._id}</td><td>{order.name}</td><td>{order.mobile}</td><td>{order.model}</td><td>{order.amount.toLocaleString()}</td><td><button onClick={()=>addSeen(order._id)} className="seen-btn">Seen</button></td><td className="view-btn"><Link to={"orderdetails?id="+order?._id}><button>View</button></Link></td></tr>
                })
            }
        </table>
    </div>
}

export default Home;