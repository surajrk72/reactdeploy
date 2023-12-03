import React, { Component } from "react";
import "./MenuDetails.css"

class MenuDetails extends Component {

    oderId = sessionStorage.getItem("oderId")? JSON.parse(sessionStorage.getItem("oderId")):[];
    oderNames = sessionStorage.getItem("oderNames")? JSON.parse(sessionStorage.getItem("oderNames")):[];
    
    

    placeOrder = (data) => {
        console.log("place Order data",data.menu_id)
        this.oderId.push(data.menu_id);
        this.oderNames.push(data.menu_name);
        this.props.finalOrder(this.oderId);

        sessionStorage.setItem("oderNames",JSON.stringify(this.oderNames));
        sessionStorage.setItem("oderId",JSON.stringify(this.oderId));

    }

    removeOrder = (data) => {
        if (this.oderId.indexOf(data.menu_id) > -1) {
            this.oderId.splice(this.oderId.indexOf(data.menu_id), 1);
            this.props.finalOrder(this.oderId);
            sessionStorage.setItem("oderId",JSON.stringify(this.oderId));
        }

        if (this.oderNames.indexOf(data.menu_name) > -1) {
            this.oderNames.splice(this.oderNames.indexOf(data.menu_name), 1);
            sessionStorage.setItem("oderNames",JSON.stringify(this.oderNames));
        }
    }



    renderMenu = ({ menudata }) => {
        if (menudata) {
            return menudata.sort((item1, item2) => {
                return item1.menu_id - item2.menu_id;
            }).map((item,index) => {
                return (
                    <div key={item.menu_id}>
                        <div className="row table table-sm" style={{ backgroundColor:"#34330f40" }}>
                            <div className="col-md-9" style={{display:"flex"}}>
                                <b>{`${item.menu_id})`}</b> &nbsp;
                                {/* <>{`${index+1}.`}</> &nbsp; */}
                                <img src={item.menu_image} width='80px' height='80px'  />
                                {/* &nbsp;
                                {item.menu_name} &nbsp;
                                Rs.{item.menu_price} */}
                                <div id="spanId">
                                    <span > {item.menu_name} </span>
                                    <span  style={{color:"red"}} >  Rs.{item.menu_price} </span>
                                </div>

                            </div>
                            <div className="col-md-3 p-4 btn-group">
                                <button  className="btn btn-outline-success"
                                    onClick={() => { this.placeOrder(item) }}>
                                    <span >add</span>
                                </button>
                                <button  className="btn btn-outline-danger"
                                    onClick={() => { this.removeOrder(item) }}>
                                    <span>remove</span>
                                </button>
                            </div>

                        </div>
                    </div>
                )
            })
        }
    }




    render() {
        // console.log('menudetails',this.state.menuDetails);

        return (
            <>
                {/* <div className="col-md-12 ">
                    <h2>Item Added</h2>
                    <h3>Item number{this.renderCart(this.oderId)} added</h3>
                </div> */}
               
                    <div className="row">
                        <div id="rocky" className="col-md-9 ">
                            {this.renderMenu(this.props)}
                        </div>
                        <div className="col-md-3 " style={{ backgroundColor: "#315eb817" }}>
                            <center><h2>Your Items</h2></center>
                            {/* <h3>Item number{this.renderCart(this.oderId)} added</h3> */}

                            <ul className="list-group">
                                
                                   {
                                    
                                       this.oderNames.map((item, index) => {
                                           
                                            return (
                                                <li class="list-group-item d-flex justify-content-between align-items-center"
                                                style={{color:"#23484fd9"}}>
                                                    <h6>{`${index+1}) ${item}`}</h6>
                                                </li>
                                            )
                                        })
                                    }
                                   
                                

                            </ul>


                        </div>
                    </div>
               

            </>
        )
    }


}

export default MenuDetails;