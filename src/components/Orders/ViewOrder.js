import axios from "axios";
import React,{Component} from "react";
import DisplayOrder from "./DisplayOrder";
import Header from "../Header";
const purl = 'http://localhost:8000/orders';

class ViewOrder extends Component{

    constructor(){
        super();
        window.scrollTo(0,0);
        this.state={
            orders:''
        }
    }

    render(){
        return(
            <>
                <Header/>
               <DisplayOrder orderData = {this.state.orders}/> 
            </>
        )
    }

    componentDidMount(){
        axios.get(purl).then(res=>this.setState({orders:res.data}));
    }
}

export default ViewOrder;