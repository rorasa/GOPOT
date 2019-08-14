import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from 'reactstrap';
import './App.css';

import NavigationBar from './Navbar';

let Home = ()=>{
  return (
    <div>
      <NavigationBar/>
    </div>
  )
}

let Login = ()=>{
  return <div>Login</div>
}

let Dashboard =  ({match})=>{
  let country_code = match.params.countrycode;
  return (
    <div>
      <NavigationBar country_code={country_code}/>
      Dashboard<br/>
      Country: {country_code}  
    </div>
  )
}

let Commodity = ()=>{
  return <div>Commodity</div>
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

  setCountryCode = (country_code)=>{
    this.setState({
      country_code: country_code
    });
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login/" component={Login} />
            <Route path={"/dashboard/:countrycode"} component={Dashboard} />
            <Route path="/commodity/" component={Commodity} />
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
