import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';
import Dashboard from './DashboardPage';
import CommodityPage from './CommodityPage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import CountryPage from './CountryPage';

let Home = ()=>{
  return (
    <LandingPage/>
  )
}

let CommodityStats = ()=>{
  return <div>CommodityStats</div>
}

let About = ()=>{
  return <div>About</div>
}

let FourOhFour = ()=>{
  return <div>404</div>
}

let LogOut = (props)=>{
  props.cookies.remove('auth_username');
  return(
    <div>
      <NavigationBar/>
      Log out successfully.
    </div>
  )
}

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login/" component={LoginPage} />
            <Route path="/logout" component={withCookies(LogOut)}/>
            <Route path={"/dashboard/:countrycode"} component={Dashboard} />
            <Route path="/commodity/:countrycode/:commoditycode" component={CommodityPage} />
            <Route path="/country-list/" component={CountryPage}/>
            <Route path="/stats/" component={CommodityStats} />
            <Route path="/about/" component={About} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
