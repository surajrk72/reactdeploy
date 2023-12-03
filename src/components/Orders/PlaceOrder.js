import React, { Component } from "react";
import { Link } from "react-router-dom";
import './PlaceOrder.css';
import Header from "../Header";

const url = 'http://3.17.216.66:4000/menuItem';
const purl = 'http://localhost:8000/orders';
//const countMap = {};
class PlaceOrder extends Component {
    

    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        //here keys of socialData amd userData are different so thats why we took data1 and data2 values to bind values to state values
        const data1 = JSON.parse(sessionStorage.getItem("userData"))? JSON.parse(sessionStorage.getItem("userData")):"" ;
        const data2 = JSON.parse(sessionStorage.getItem("socialData"))? JSON.parse(sessionStorage.getItem("socialData")):"" ;
        console.log("userData from PlaceOrder :",data1);
        console.log("userData from PlaceOrder :",data2);
        this.state = {
            id: (data1 === "")? (data2._id):(data1.id),
            hotel_name: (this.props.match.params.restoName)?this.props.match.params.restoName:"" ,
            name: (data1 === "")? (data2.displayName):(data1.name) ,
            email: (data1 === "")? (data2.emails[0].value):(data1.email),
            cost: 0.0,
            phone: (data1 === "")? "":(data1.phone),
            address: '',
            menuItem: '',
            countMap :{}
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    placeOrder = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu');
        console.log(obj);
        fetch(purl, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(this.props.history.push('/viewBooking'))
    }

    renderItem = (val) => {
        if (val) {
            return val.map(item => {
                return (
                    <div className="orderItem" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name} />
                        <h6 className="card-text">{item.menu_name}</h6>
                        <h6 className="card-text " style={{ color: "#9e312f" }}> Price Rs.{item.menu_price}</h6>
                        <h6 style={{ color: "rgb(63 100 95)" }}>Selected items : {this.state.countMap[item.menu_id]}</h6>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <>  
                <Header/>
                <div className="container" style={{ marginTop: '2%' }}>
                    <div className="card" >
                        <div className="card-header" style={{ backgroundColor: "#000000e8", color: "white", textAlign: "center",display:"flex",justifyContent:"flex-start" }}>
                            <Link to={`/details?restId=${sessionStorage.getItem("restoId")}`} onClick={() => window.scrollTo(0, 0)} className="btn btn-outline-primary">
                                Back
                            </Link>
                            <h2 className="ml-5">Your order for Restaurant {this.state.hotel_name}</h2>
                        </div>
                        <div className="card-body"  >
                            <div className="row" style={{ fontWeight: "bold" }}>
                                <input type="hidden" name="cost" value={this.state.cost} />
                                <input type="hidden" name="id" value={this.state.id} />
                                <input type="hidden" name="hotel_name" value={this.state.hotel_name} />
                                <div className="form-group col-md-6" >
                                    <label>Name</label>
                                    <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} style={{ backgroundColor: "#7a80002e" }} 
                                    placeholder="enter your name"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} style={{ backgroundColor: "#7a80002e" }} 
                                    placeholder="enter your email address"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phone</label>
                                    <input className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} style={{ backgroundColor: "#7a80002e" }} 
                                    placeholder="enter your phone number"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Address</label>
                                    <input className="form-control" name="address" value={this.state.address} onChange={this.handleChange} style={{ backgroundColor: "#7a80002e" }} 
                                    placeholder="enter your address"/>
                                </div>
                                {this.renderItem(this.state.menuItem)}

                            </div>
                        </div>

                        <div className="card-footer" style={{ textAlign: "center" }}>
                            <div className="col-md-12">
                                <h2>Total Price is Rs.{this.state.cost}</h2>
                            </div>
                            <button className="btn btn-success" onClick={this.placeOrder}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    //api calling
    componentDidMount() {
        let menuItems =  JSON.parse(sessionStorage.getItem('oderId')) ;
        let orderId = [];
        menuItems.map(item => {
            orderId.push(parseInt(item));
            return 'ok';
        })
        console.log("suraj order", (orderId));
        fetch(url, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderId)
        })
            .then(res => res.json())
            .then(data => {
               
                let totalPrice = 0;

                //this countMap and for each is to find out number of ocuurence of each items , 
                //i am declaring countMap as constant becoz i have to specify how many items selected in renderItems
                //const countMap = {}; this is declared in outside class
                orderId.forEach(element => {
                    this.state.countMap[element] = (this.state.countMap[element] || 0) + 1;
                })

              
                data.map((item) => {
                    let menuId = parseInt(item.menu_id);
                    totalPrice += parseFloat(item.menu_price * this.state.countMap[menuId]);
                    return 'ok'
                })
                this.setState({ cost: totalPrice, menuItem: data })
               
            })
    }

    
}

export default PlaceOrder;