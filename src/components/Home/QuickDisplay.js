import React from "react";
import { Link } from "react-router-dom";

const QuickDisplay = (props) => {


  const  listMeal = (meal) => {
        if (meal) {
            return meal.map(item => {
                return (
                
                    <Link to={`/listing/${item.mealtype_id}`} onClick={()=>window.scrollTo(0,0)} key={item._id}>
                        <div className="tileContainer">
                            <div className="tileComponent1">
                                <img src={item.meal_image} alt="dinner" />
                            </div>
                            <div className="tileComponent2">
                                <div className="componentHeading1">
                                    <span>{item.mealtype}</span>
                                </div>
                                <div className="componentHeading2">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    }

    return (
       <>
        {listMeal(props.meal)}
       </>
    )
}

export default QuickDisplay;