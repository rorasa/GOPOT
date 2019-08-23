import React, { Component } from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';


class LandingPage extends Component{
    render(){
        if(typeof(this.props.cookies.get('auth_username'))=="undefined"){
            return(
                <div>
                    <NavigationBar/>
                    <div className="LandingBanner">
                        <div className="LandingTitle">
                            <h1><strong>G</strong>lobally-identified<br/>
                            <strong>O</strong>ptimal <strong>P</strong>olicies for <strong>O</strong>peration of <strong>T</strong>rades</h1>
                            <p></p><p></p>
                            <a href="/login" className="LandingLogin">Login</a><br/>
                        </div>
                    </div>
                </div>
            );
        }else{
            window.location="/dashboard/us"
        }
        
    }
}

export default withCookies(LandingPage);