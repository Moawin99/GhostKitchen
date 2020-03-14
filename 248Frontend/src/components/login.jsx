import React, { Component } from 'react';
import axios from 'axios';
import '../styleSheets/loginStyle.css';

class CreateLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: ""
        }
        this.createUser = this.createUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

     createUser () {        
      axios.post('/user', {
        firstName: this.state.firstName,
        lastName: this.state.lastName
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error); 
    });
    }

    getUser () {
        axios.post('/user/login', {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }).then(function (response) {
            console.log(response);
        }).catch(function (error){
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
                <button onClick={this.getUser} id="login">Login</button>
                <button id="search">Search</button>
                <button onClick={this.createUser} id="create">Create</button>
            </div>
            {/* <pre>{JSON.stringify(this.state)}</pre> */}
         </div>
    );
}
}

export default CreateLogin;