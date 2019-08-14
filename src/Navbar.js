import React, { Component } from 'react';
import {
    Collapse,
    Navbar, 
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

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

    render(){
        let country_button;
        if(typeof(this.props.country_code)!="undefined"){
            country_button = <NavLink href="/country-list">Country: {this.props.country_code}</NavLink>
        }else{
            country_button = null
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
                                <NavLink href="/logout">Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;


