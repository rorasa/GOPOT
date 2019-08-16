import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';

class LoginPage extends Component{
    constructor(props){
        super(props);
    }
    
    login = ()=>{
        this.props.cookies.set('auth_username', 'rorasa');
        window.location="/dashboard/us"
    }

    render(){
        return(
            <div>
                <NavigationBar/>

                <h1>Login</h1>

                <Button color="primary" onClick={this.login}>Login</Button>
                
            </div>
        )
    }
}

export default withCookies(LoginPage);