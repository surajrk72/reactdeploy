import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';
import Listing from './Listing/Listing';
import Details from './Details/Details';
import PlaceOrder from './Orders/PlaceOrder';
import ViewOrder from './Orders/ViewOrder';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';


const Routing = () => {
    return (
        <BrowserRouter>

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
         
            <Route exact path="/" component={Home} />

            <Route path="/listing/:mealId" component={Listing} />
            <Route path='/details' component={Details} />
            <Route path='/placeOrder/:restoName' component={PlaceOrder} />
            <Route path='/viewBooking' component={ViewOrder} />
            <Footer />
        </BrowserRouter>
    )
}

export default Routing;