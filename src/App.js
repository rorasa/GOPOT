import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

import NavigationBar from './Navbar';
import Dashboard from './DashboardPage';
import CommodityPage from './CommodityPage';

let Home = ()=>{
  return (
    <div>
      <NavigationBar/>
      <h1>GOPOT</h1>
      <a href="/login">Login</a><br/>
      <a href="/dashboard/us">Dashboard</a>
    </div>
  )
}

let Login = ()=>{
  return <div>Login</div>
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
            <Route path="/login/" component={Login} />
            <Route path={"/dashboard/:countrycode"} component={Dashboard} />
            <Route path="/commodity/:countrycode/:commoditycode" component={CommodityPage} />
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
