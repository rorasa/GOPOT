import React, { Component } from 'react';
import {
    Collapse,
    Navbar, 
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import { withCookies } from 'react-cookie';

class NavigationBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = ()=>{
        window.location='/logout';
    }

    login = ()=>{
        window.location='/login';
    }

    render(){
        let country_button = null;
        if(typeof(this.props.country_code)!="undefined"){
            country_button = <NavLink href="/country-list">Country: {this.props.country_code}</NavLink>
        }
        let username = this.props.cookies.get('auth_username');
        let logout_button = null;
        if(typeof(username)!="undefined"){
            logout_button = <NavLink href="#" onClick={this.logout}>Logout</NavLink>
        }else{
            logout_button = <NavLink href="#" onClick={this.login}>Login</NavLink>
        }

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">GOPOT</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    {country_button}
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/about">About GOPOT</NavLink>
                            </NavItem>
                            <NavItem>
                                {logout_button}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withCookies(NavigationBar);


