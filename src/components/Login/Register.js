import React, { Component } from "react";
const size = 'col-12 col-sm-6 col-md-4 col-lg-3';
class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: 's',
            phone: '',
            email: '@gmail.com',
            password: ''
        }
    }

    handleChange = (event) => {
        // this.setState({[event.target.name]:event.target.value});
        // console.log(this.state);
        const { name, value} =event.target;
        this.setState({[name]:value}, () =>{
            console.log(`state updated for : ${name} : ${value}`);
        })
    }

    register = () => {
        fetch('http://localhost:8001/registers',{
            method:"POST",
            headers:{
                "accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push("/login"))
        
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="panel panel-primary ">
                        <div className="panel-heading">
                            <h2>Register Form</h2>
                        </div>

                        <div className="panel-body ">
                            <div className="form-group ">
                                <label> Name</label>
                                <input className="form-control" type="text" name="name" value={this.state.name} placeholder="enter name" 
                                onChange={this.handleChange}/>

                            </div>
                            <div className="form-group ">
                                <label> Phone</label>
                                <input className="form-control" type="text" name="phone" value={this.state.phone} placeholder="enter email address" 
                                onChange={this.handleChange}/>
                            </div>
                            <div className="form-group ">
                                <label> Email</label>
                                <input className="form-control" type="email" name="email" value={this.state.email} placeholder="enter email address" 
                                onChange={this.handleChange}/>
                            </div>
                            
                            <div className="form-group ">
                                <label> Password</label>
                                <input className="form-control" type="password" name="password" value={this.state.password} placeholder="enter email address" 
                                onChange={this.handleChange}/>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-primary" onClick={this.register} >
                                    <span className="glyphicon glyphicon-user"  > Register</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register;