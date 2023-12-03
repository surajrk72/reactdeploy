import React, { Component } from "react";
import './Header.css';
import { Link, withRouter } from "react-router-dom";

const url = "http://3.17.216.66:5000/api/auth/userinfo";
class Header extends Component {
    // (sessionStorage.getItem("userData"))? JSON.parse(sessionStorage.getItem("userData")):
    
    constructor(props) {
        console.log("header constructor called");
        super(props)
        this.state = {
            userData: "",
            socialData: ""
        }
        console.log("--userData",this.state.userData);
        console.log("--socialData",this.state.socialData);
    }

    handleLogout = () => {
        //for normal login
        console.log(" header handleLogout method called");
        sessionStorage.removeItem("ltk");
        sessionStorage.setItem("loginStatus", "loggedOut");
        sessionStorage.removeItem("userData");
        this.setState({ userData: '' });

        //for google login
        sessionStorage.setItem("socialLogin","false");
        sessionStorage.removeItem("socialData");
        sessionStorage.removeItem("googleId");
        this.setState({ socialData : ''})
        this.props.history.push("/");

    }

    conditionalHeader = () => {
        console.log(" header conditionalHeader method called");
        if (this.state.userData.name || this.state.socialData.id) {
            console.log(" header conditionalHeader method --1");
            if (JSON.parse(sessionStorage.getItem("socialLogin")) === "true") {
                console.log(" header conditionalHeader method --2");
                console.log("social login is true");
                let data = this.state.socialData;
                let img = data.photos[0].value
                console.log("photos: ",img)
                return (
                    <>
                        <Link to='/' className="btn btn-outline-light text-dark" >
                            <img src={data.photos[0].value} style={{ height: 33, width: 33,borderRadius:"50%" }} />&nbsp;
                            <span ><b>hi {(data.name.givenName).toUpperCase()}</b></span>
                        </Link>&nbsp;
                        <button onClick={this.handleLogout} className="btn btn-danger">
                            Log out
                        </button>
                    </>
                )
            } else{
                console.log(" header conditionalHeader method --3");
                console.log("normal login is true");
                let data = this.state.userData;
                sessionStorage.setItem("userData", JSON.stringify(data));
                sessionStorage.setItem("loginStatus", "loggedIn");
                return (
                    <>
                        <Link to='/' className="btn btn-success">
                            Hi! {data.name}
                        </Link> &nbsp;
    
                        <button onClick={this.handleLogout} className="btn btn-danger">
                            Log out
                        </button>
                    </>
    
                )          
            }
            
        }else{
            console.log(" header conditionalHeader method --4");
            return (
                <>
                    <a href='http://localhost:9800/auth/google' className="btn btn-light text-dark">
                        <i className="fab fa-google"></i>
                    </a> &nbsp;

                    <Link to='/login' className="btn btn-success ">
                        <i class="fas fa-sign-in-alt"> Log In</i>
                    </Link> &nbsp;

                    <Link to='/register' className="btn btn-danger">
                        <i class="fas fa-sign-out-alt"> Sign Up</i>
                    </Link>

                </>
            )  
           
        }

        
    }

    render() {
        console.log("header render method called");
        return (
            <>
                <header>
                    <div id="brand">
                        DEVELOPER FUNNEL &nbsp; <Link to='/' className="btn btn-default" onClick={() => window.scrollTo(0, 0)}>Home</Link> &nbsp;
                        <Link to='/placeOrder/Welcome' className="btn btn-outline-light" onClick={() => window.scrollTo(0, 0)}>
                        <i class="fas fa-cart-plus text-dark"></i>
                        </Link>

                      
                       
                    </div>
                    <div id="social">
                        {this.conditionalHeader()}
                    </div>
                </header>
            </>
        )
    }

    componentDidMount() {
        console.log("header componentDidMount called");
        if (this.props.location.search || JSON.parse(sessionStorage.getItem("googleId"))) {
            console.log(" header componentDidMount method --1");
            let id;
            let siteName;
            try {
                
                if (this.props.location.search.split("=")[0] === "?site") {
                    console.log(" header componentDidMount method --2");
                     siteName = this.props.location.search.split("&")[0].split('=')[1];

                }
                if (siteName === 'google') {
                    sessionStorage.setItem('socialLogin', JSON.stringify('true'));
                     id = this.props.location.search.split("&")[1].split("=")[1];
                    sessionStorage.setItem('googleId',JSON.stringify(id))
                }  
                    console.log("--id value:",id);
                if(JSON.parse(sessionStorage.getItem("googleId"))||id){
                    
                    fetch(`http://localhost:8002/users/${id?id:JSON.parse(sessionStorage.getItem("googleId"))}`, {
                        method: "GET",
                    })
                        .then(res => res.json())
                        .then(data =>{
                           
                            sessionStorage.setItem("socialData",JSON.stringify(data));
                            this.setState({ socialData: data })
                            console.log("--socialData:",this.state.socialData);} )     
                }

            } catch (error) {
                console.log("Error while getting information", error);
            }

        } else {
            console.log(" header componentDidMount method --1");
            try {
                console.log("--access token",JSON.parse( sessionStorage.getItem('ltk')))
                fetch(url, {
                    method: "GET",
                    headers: {
                        'x-access-token': JSON.parse( sessionStorage.getItem('ltk'))
                    }
                })
                .then(res => res.json())
                    .then(data => {
                        
                        this.setState({ userData: data })
                        console.log("--userData:",this.state.userData);
                    })
                    
            } catch (error) {
                console.log("Error while getting information", error);
            }
        }




    }

}

export default withRouter(Header);