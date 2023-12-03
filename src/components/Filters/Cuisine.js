import axios from "axios";
import React, { Component } from "react";
const { REACT_APP_FILTER_URL } = process.env;
class CuisineFilter extends Component {


    cusineFilter = (event) => {
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let cusineUrl = '';
        if (cuisineId == '') {
            cusineUrl = `${REACT_APP_FILTER_URL}${mealId}`;

        } else {
            cusineUrl = `${REACT_APP_FILTER_URL}${mealId}?cuisine=${cuisineId}`;

        }
        axios.get(cusineUrl)
            .then(res => this.props.restPerCusine(res.data))
    }

    render() {
        return (

            <div onChange={this.cusineFilter}>
               
                <div className="form-check ">
                    <label className="form-check-label">
                        <input defaultChecked type="radio" name="cuisine" value='' className="form-check-input" />All
                    </label>
                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" name="cuisine" value="1" className="form-check-input" />North Indian
                    </label>

                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" name="cuisine" value="2" className="form-check-input" />South Indian
                    </label>

                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" name="cuisine" value="3" className="form-check-input" />Chinese
                    </label>
                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" name="cuisine" value="4" className="form-check-input" />Fast Food
                    </label>
                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input type="radio" name="cuisine" value="5" className="form-check-input" />Street Food
                    </label>
                </div>
                
                

            </div>
        )
    }
}
export default CuisineFilter;