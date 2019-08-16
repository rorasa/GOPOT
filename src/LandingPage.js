import React, { Component } from 'react';

import NavigationBar from './Navbar';

class LandingPage extends Component{
    render(){
        return(
            <div>
                <NavigationBar/>
                <h2><strong>G</strong>lobally-indentified<br/>
                 <strong>O</strong>ptimal <strong>P</strong>olicies for <strong>O</strong>peration of <strong>T</strong>rades</h2>
                <a href="/login">Login</a><br/>
            </div>
        );
    }
}

export default LandingPage;