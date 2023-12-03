import React from "react";
import { Link } from "react-router-dom";
import "./Listing.css";

const ListingDisplay = (props) => {

    const renderData = ({ listData }) => {
        if (listData) {
            if (listData.length > 0) {
                return listData.map(res =>
                    <div className="item" key={res.restaurant_id}>
                        <div className="row">
                            <div className="col-md-5">
                                <img src={res.restaurant_thumb} alt={res.restaurant_name} className="Image" />
                            </div>
                            <div className="col-md-7">
                                <div className="hotel_name">
                                    <Link to={`/details?restId=${res.restaurant_id}`}
                                    onClick={()=>window.scrollTo(0,0)}>
                                        {res.restaurant_name}
                                    </Link>
                                </div>
                                <div className="city_name">{res.address}</div>
                                <div className="city_name">{res.rating_text}</div>
                                <div className="city_name">Rs.{res.cost}</div>
                                <div className="labelDiv">
                                    {
                                        res.mealTypes.map(item=>
                                            <span key={item.mealtype_id} className="badge badge-success " style={{marginLeft:'3px'}}>{item.mealtype_name}</span>
                                            )
                                    }
                                </div>
                                <div className="labelDiv">
                                    {
                                        res.cuisines.map(item=>
                                            <span key={item.cuisine_id} className="badge badge-danger" style={{marginLeft:'3px'}}>{item.cuisine_name}</span>
                                            )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>No data found for filter</h1>
                    </div>
                )
            }

        } else {
            return (
                <div>
                    <div style={{ marginLeft: '30%' }}>
                        {/* &nbsp; <img src="https://assets-v2.lottiefiles.com/a/05359890-1164-11ee-9f09-d76ef2ed5f8e/RGv5qDO9hu.gif" style={{ width: '150px', height: '150px' }} /> */}
                        <img src="https://i.gifer.com/ZKZg.gif" style={{ width: '150px', height: '150px' }} />
                    </div>
                </div>)
        }
    }

    return (
        <div id="content">
            {renderData(props)}
        </div>
    )
}

export default ListingDisplay;