import React, { Component } from "react";

class DisplayOrder extends Component {



    

    renderData = ({orderData}) => {
        if(orderData){
            return orderData.map((item) => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.hotel_name}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>Rs.{item.cost}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <>
                <div className="container " style={{marginTop:"2%"}}>
                    <table className="table table-bordered" style={{backgroundColor:"white"}}>
                        <thead>
                            <tr>
                            <th>OrderId</th>
                        <th>Rname</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>BankName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData(this.props)}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default DisplayOrder;