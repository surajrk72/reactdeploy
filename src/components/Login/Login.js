import React, { Component } from "react";
import "./Login.css"
class Login extends Component {

    constructor() {
        super();
        this.state = {

            email: "",
            password: "",
            message: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //console.log(this.state);
        // const { name, value} =event.target;
        // this.setState({[name]:value}, () =>{
        //     console.log(`state updated for : ${name} : ${value}`);
        // })
    }

    login = () => {
        fetch('http://3.17.216.66:5000/api/auth/login', {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.auth === false) {
                    this.setState({ message: data.token });
                } else {
                    sessionStorage.setItem("ltk", JSON.stringify(data.token) );
                    this.props.history.push("/");
                }
            })

    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h2>Login Form</h2>
                        </div>

                        <div className="panel-body">

                            <div className="input-group ">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input className="form-control" type="email" name="email" value={this.state.email} placeholder="enter email address"
                                    onChange={this.handleChange} />
                            </div>
                            <br />
                            <div className="input-group ">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input className="form-control" type="password" name="password" value={this.state.password} placeholder="enter email address"
                                    onChange={this.handleChange} />
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <h4 style={{ color: "#a52020d4", animation: "blinking 1s infinite" }}>
                                    {this.state.message}
                                </h4>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-success" onClick={this.login} >
                                    Log in
                                </button>
                            </div>

                        </div>
                    </div>


                </div>
            </>
        )
    }
}

export default Login;