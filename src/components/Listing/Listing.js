import React from "react";
import { Component } from "react";
import './Listing.css';
import axios from "axios";
import ListingDisplay from "./ListingDisplay";
import CuisineFilter from "../Filters/Cuisine";
import CostFilter from "../Filters/Cost";
import Header from "../Header";


// const base_url = 'http://3.17.216.66:4000/';
// const { REACT_APP_BASE_URL, REACT_APP_RESTORAUNT_URL } = process.env;

class Listing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restorauntsList: '',
            mealId: this.props.match.params.mealId
        }
    }

    render() {

        return (
            <>
             <Header/>
                {/* <div className="row">
                    <div id="mainListing">
                        <div id="filter">
                            <CuisineFilter mealId={this.state.mealId} 
                            restPerCusine={(data)=>{this.setState({restorauntsList:data})}}/>

                            <CostFilter mealId={this.state.mealId}
                            restPerCost = {(data)=>{this.setState({restorauntsList:data})}}/>
                        </div>
                         <ListingDisplay listData={this.state.restorauntsList}/>
                    </div>
                </div> */}
                <div className="container-fluid mt-3">
                    <section className="row">
                        <nav className="col-2">
                            <div id="shade">
                                <div style={{marginLeft:"5px"}}>
                                    <label className="form-label" >Cuisine Filter</label>
                                    <div>
                                        <CuisineFilter mealId={this.state.mealId}
                                            restPerCusine={(data) => { this.setState({ restorauntsList: data }) }} />
                                    </div>
                                    <label className="form-label mt-4">Cost Filter</label>
                                    <div>
                                        <CostFilter mealId={this.state.mealId}
                                            restPerCost={(data) => { this.setState({ restorauntsList: data }) }} />
                                    </div>
                                </div>

                            </div>
                        </nav>
                        <main className="col-9">
                            <ListingDisplay listData={this.state.restorauntsList} />
                        </main>
                    </section>
                </div>
            </>
        )
    }

    componentDidMount() {
        let mealId = this.props.match.params.mealId;
        sessionStorage.setItem('mealId', mealId);
        axios.get(`http://3.17.216.66:4000/restaurant?mealtype_id=${mealId}`)
            .then(res => {

                this.setState({ restorauntsList: (res.data) })

            })

    }
}

export default Listing;