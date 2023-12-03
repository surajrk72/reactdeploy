import React, { Component } from "react";
import './Details.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuDetails from './MenuDetails';
import Header from "../Header";
// const { REACT_APP_BASE_URL } = process.env;


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: '',
            mealId: sessionStorage.getItem('mealId') ? sessionStorage.getItem('mealId') : 1,
            menuDetails: '',
            userItem: sessionStorage.getItem('oderId') ? JSON.parse(sessionStorage.getItem('oderId')) : [],
            messageError : ""
        }
    }


    proceed = () => {
        // console.log("after pressing proceed 1",this.state.userItem);
        // let newtemp = this.state.userItem;
        // let oldtemp = JSON.parse(sessionStorage.getItem('menu'));
        // this.setState({userItem: newtemp+ oldtemp});
        // console.log("after pressing proceed 2",this.state.userItem);
        // let temp = JSON.stringify(this.state.userItem);
        // sessionStorage.setItem('menu', temp);

        let temp1 = JSON.parse(sessionStorage.getItem("userData"));
        let temp2 = JSON.parse(sessionStorage.getItem("oderId"));
        let temp3 = JSON.parse(sessionStorage.getItem("socialData"));
        // (() !== " ")?`):this.setState({messageError:"Please add items First"}));
        if(temp2.length !== 0){
            if(temp1 || temp3){
               return(
                this.props.history.push(`/placeOrder/${this.state.details.restaurant_name}`)
               ) 
            }else{
                this.setState({messageError: "Please Log in "});
            }
        }else{
            this.setState({messageError: "First add items"});
        }
    }

    addToCart = (e) => {
        // alert("addToCart1");
        // this.setState((value)=>({
        //     userItem : [...value.userItem,e],
        // }));
        this.setState({userItem : e})
        
    }

    addToCart2 = (e) => {
        // alert("addToCart2");
        // let {userItem} = this.state;
        // const index = this.state.userItem.indexOf(e);
        // if( index !== -1){
        //     const newArray = [...userItem.slice(0,index), ...userItem.slice(index+1)];
        //     this.setState({userItem: newArray});
        // }
      
    }

    render() {
        console.log("userItems ->",this.state.userItem);
        let { details } = this.state;
        return (
            <>  
            < Header/>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-6 tileImage">
                            <div className='imageClass'>
                                <img src={details.restaurant_thumb} alt="" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12" style={{ height: "450px" }}>
                                    <h2>{details.restaurant_name}</h2>
                                    <span id="cfeedback">231 Customers Rating Average</span>
                                    <h5>Old Price <del>Rs. 450</del></h5>
                                    <h5>Offer Price Rs. {details.cost}</h5>
                                    <h5>Best Taste of Fresh Chai with Samosa At your Door or DineIn</h5>
                                    <div style={{ marginBottom: "5px" }}>
                                        <div className="icons">
                                            <img src="https://i.ibb.co/wJvrhYg/veg.png" alt="" />
                                        </div>
                                        <div className="icons">
                                            <img src="https://i.ibb.co/mD3jpgc/sentizied.png" alt="" />
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#about">about</a>
                                        </li>
                                        <li>
                                            <a className="nav-link" data-toggle="tab" href="#contact">contact</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="about" className="tab-pane container active" style={{ overflow: "scroll", height: "190px" }}>
                                            <h3>{details.restaurant_name}</h3>
                                            <p >{details.restaurant_name}  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                            </p>
                                        </div>
                                        <div id="contact" className="tab-pane container">
                                            <h3>{details.address}</h3>
                                            <h3>Contact: {details.contact_number}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <Link to={`/listing/${this.state.mealId}`} onClick={() => window.scrollTo(0, 0)} className="btn btn-outline-primary">
                                        Back
                                    </Link> &nbsp;
                                    <button className='btn btn-outline-success' onClick={this.proceed}>
                                        Proceed
                                    </button>
                                    <h6 style={{color:"red"}}>{this.state.messageError}</h6>
                                </div>

                            </div>



                            {/* <Tabs>
                                    <TabList>
                                        <Tab>About</Tab>
                                        <Tab>Contact</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <h2>{details.restaurant_name}</h2>
                                        <p>{details.restaurant_name}  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>{details.address}</h2>
                                        <h3>Contact: {details.contact_number}</h3>
                                    </TabPanel>
                                </Tabs> */}








                        </div>
                    </div>


                    <div className="col-md-12 mt-2" style={{ backgroundColor: "#101312b3" }}>
                        <div style={{ color: "white", textAlign: "center" }}>
                            <h2>Menu</h2>
                        </div>

                    </div>
                    <div className='col-md-12'>

                        {/* we are sending menudetails to print and taking selected menu items  */}
                        <MenuDetails menudata={this.state.menuDetails}
                            finalOrder={(value) => this.addToCart(value)}
                             />
                    </div>


                </div>
            </>
        )


    }

    // componentDidMount(){
    //     let id = this.props.location.search.split('=')[1];
    //     console.log(id);
    //     axios.get(`${REACT_APP_BASE_URL}details/${id}`)
    //     .then(res=> {
    //         this.setState({details:res.data});
    //     })
    // }

    async componentDidMount() {

        let id = this.props.location.search.split('=')[1];
        sessionStorage.setItem("restoId", id);
        let fetch = await axios.get(`http://3.17.216.66:4000/details/${id}`);
        let menu = await axios.get(`http://3.17.216.66:4000/menu/${id}`);
        this.setState({ details:fetch.data[0] });
     
        this.setState({ menuDetails: menu.data });



    }
}
export default Details;