import { Component, useEffect, useState } from "react";
import React from "react";
import './QuickSearch.css';
import QuickDisplay from "./QuickDisplay";
import axios from "axios";
// const {REACT_APP_BASE_URL} = process.env;
// const base_url = 'http://3.17.216.66:4000/';


const QuickSearch = () => {

    const[mealType,setMealType] = useState([]);

    useEffect(() => {
        fetch(`http://3.17.216.66:4000/quicksearch`,{method:"GET"})
        .then(data => data.json())
        .then(res => {
            console.log(res);
            setMealType(res);
            
        });
        
    },[])

    return(
        
        <>
                <div id="quickSearch">
                        <span id="quickSearchHeader">Quick Search</span>
                        <span  id="quickSearchSubHeader">Find Restaurant By MealType</span>
                     <div>
                         <QuickDisplay meal={mealType} />
                     </div>
                </div>
        </>
    )

}
export default QuickSearch;

// class QuickSearch extends Component {
//     constructor() {
//         console.log('QuickSearch---constructor()---');
//         super();
//         this.state = {
//             mealType: ''
//         }
//     }
//     render() {
//         console.log('QuickSearch---render()---');
//         return (

//             <>
//                 <div id="quickSearch">
//                     <span id="quickSearchHeader">Quick Search</span>
//                     <span  id="quickSearchSubHeader">Find Restaurant By MealType</span>
//                     <div>
//                         <QuickDisplay meal={this.state.mealType} />
//                     </div>


//                 </div>
//             </>
//         )
//     }

//     componentDidMount() {
//         console.log('QuickSearch---componentDidMount()---');
//         axios.get(`${REACT_APP_BASE_URL}quicksearch`)
          
//             .then(item => {
//                 this.setState({ mealType: item.data })
//             })
//     }
// }

// export default QuickSearch;