import React, { Component } from 'react';
import {
    Collapse,
    Navbar, 
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

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
        return (
            <div>Navbar</div>
        )
    }
}

export default NavigationBar;


