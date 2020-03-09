import React, { Component } from 'react';
import axios from 'axios';
import '../src/styles.css';

class CreateLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: ""
        }
        this.createUser = this.createUser.bind(this);
    }

     createUser () {      
    
    axios.post('/users', {
        firstName: this.state.firstName,
        lastName: this.state.lastName
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error); 
    });
    }
    render(){
    return (
        <div className="name-fields">
            <label>First Name:</label>
            <input onChange={(e) => {
                this.setState({firstName: e.target.value});
            }} id="firstName"></input>
            <label>Last Name:</label>
            <input onChange={(e) => {
                this.setState({lastName: e.target.value});
            }} id="lastName"></input>
       
            <div className="button-wrapper">
                <button id="login">Login</button>
                <button id="search">Search</button>
                <button onClick={this.createUser} id="create">Create</button>
            </div>
        <pre>{JSON.stringify(this.state)}</pre>
        <p>{this.props.msg}</p>
         </div>
    );
}
}

export default CreateLogin;