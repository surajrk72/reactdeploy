import axios from "axios";
import React, { Component } from "react";

const url = ' http://3.17.216.66:4000/filter/';
class CostFilter extends Component {

    costFilter = (event) => {
        let mealId = this.props.mealId;
        let cost = (event.target.value).split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl = "";
        if (event.target.value === "") {
            costUrl = `${url}${mealId}`;
        } else {
            costUrl = `${url}${mealId}/?hcost=${hcost}&lcost=${lcost}`;
        }
        axios.get(costUrl)
            .then(res => { this.props.restPerCost(res.data) })
    }

    render() {
        return (
            <div onChange={this.costFilter}>
                <div className="form-check">
                    <label className="radio">
                        <input defaultChecked type="radio" name="cuisine" value="" className="form-check-input"/>All
                    </label>
                </div>

                <div className="form-check">
                    <label className="radio">
                        <input type="radio" name="cuisine" value="0-300" className="form-check-input" />0-300
                    </label>
                </div>

                <div className="form-check">
                    <label className="radio">
                        <input type="radio" name="cuisine" value="301-600" className="form-check-input"/>301-600
                    </label>
                </div>

                <div className="form-check">
                    <label className="radio">
                        <input type="radio" name="cuisine" value="601-900" className="form-check-input"/>601-900
                    </label>
                </div>

                <div className="form-check">
                    <label className="radio">
                        <input type="radio" name="cuisine" value="901-5000" className="form-check-input"/>901-5000
                    </label>
                </div>
            </div>
        )
    }
}

export default CostFilter;