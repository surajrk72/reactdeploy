import { Component, useEffect, useState } from "react";
import React from "react";
import './Search.css';
import axios from "axios";
// const {REACT_APP_BASE_URL,REACT_APP_RESTORAUNT_URL} = process.env;
const Cityurl = 'http://3.17.216.66:4000';
const RestoUrl = 'http://3.17.216.66:4000/restaurant?stateId=';

function Search(){

    const [location,setLocation] = useState([]);
    const [resto,setResto] = useState([]);


    const renderCities = (data) =>{
        if(data){
            return data.map(loc=>{
                return(
                    <option key={loc.state_id} value={loc.state_id}>
                        {loc.state}
                    </option>
                )
            })
        }
    }
    
    const onCityChange = (event) => {
        let stateId = event.target.value;
        axios.get(`http://3.17.216.66:4000/restaurant?stateId=${stateId}`)
        .then(res => {
            setResto(res.data);
            console.log(resto);
        });  
         
    }

    const renderReso = (data) => {
        return resto.map(res => {
            return(
                <option key={res.restaurant_id} value={res.restaurant_id} >
                   {res.restaurant_name} | {res.address}
                </option>
            )
        })
    }

    useEffect(() => {
        axios.get(`http://3.17.216.66:4000/location`)
        .then(res=>setLocation(res.data));
        //  console.log(location);
    },[]);

    return(
        <>
            <div id="search" className="container-fluid">
                    <div id="black">
                        <div id="logo">
                             <div id="bikeImage">
<                               span id="spn"><img
                                src="https://static.wixstatic.com/media/b08816_028a1254cf0e4e8282c6edcc4d98e916~mv2.gif"
                                height="170px" width="140px" /></span>
                            </div>
                        </div>
                        <div id="heading"> <p className="blinking">Search places near you</p></div>
                        <div id="dropdown" >
                            <select onChange={onCityChange}>
                                <option selected disabled>select city</option>
                                {renderCities(location)}
                            </select>
                            <select className="restSelect">
                                <option selected disabled>select Restaurant</option>
                               {renderReso(resto)}
                            </select>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Search;

// class Search extends Component {

//     constructor() {
//         console.log('--constructor() called--');
//         super();
//         this.state = {
//             location: '',
//             resto:''
//         }
//     }

//     renderCities= (data)=> {
//         console.log('---renderCities() called----');
//         if (data) {
//             return data.map(item => {
//                 return (
//                     <option key={item.state_id} value={item.state_id}>
//                         {item.state}
//                     </option>
//                 )

//             })
//         }
//     }

//     onCityChange = (data)=> {
//         console.log('---onCityChange() method called');
//         let stateId = data.target.value;
//             fetch(`${REACT_APP_RESTORAUNT_URL}stateId=${stateId}`, { method: 'GET' })
//             .then(data => data.json())
//             .then((items) => {
//                 console.log(items);
//                 this.setState({resto:items});
//                 //this.loadRestoraunts(data);
//             })
            
//     }

//     loadRestoraunts= (data)=>{
//         if(data){
//             return data.map(item=>{
//                 return(
//                     <option value={item.restaurant_name} key={item.restaurant_id}>
//                         {item.restaurant_name} | {item.address}
//                     </option>
//                 )
//             })
//         }
//     }

//     render() {
//         console.log('--render() called--');
//         return (
//             <>
//                 <div id="search">
//                     <div id="black">
//                         <div id="logo">
                          
//                             <div id="bikeImage">
//                             <span id="spn"><img
//                                 src="https://static.wixstatic.com/media/b08816_028a1254cf0e4e8282c6edcc4d98e916~mv2.gif"
//                                 height="170px" width="140px" /></span>
//                             </div>
//                         </div>
//                         <div id="heading"> <p className="blinking">Search places near you</p></div>
//                         <div id="dropdown" >
//                             <select onChange={this.onCityChange}>
//                                 <option selected disabled>select city</option>
//                                 {this.renderCities(this.state.location)}
//                             </select>
//                             <select className="restSelect">
//                                 <option selected disabled>select Restaurant</option>
//                                 {this.loadRestoraunts(this.state.resto)}
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }

//     componentDidMount() {
//         console.log('--componentDidCatch() called--');

//         fetch(`${REACT_APP_BASE_URL}location`, { method: 'GET' })
//             //1st it will give promises
//             .then(data => data.json())
//             .then(items => {
//                 console.log(items);
//                 this.setState({ location: items })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
// }

// export default Search;