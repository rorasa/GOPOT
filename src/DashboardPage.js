import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    CardImg,
    CardBody
} from 'reactstrap';
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';
import RadarChart from './RadarChart';
import country_list from './country_list';

class CommodityCard extends Component{
    render(){

        const characterData = [
          { Extenal: 70.2, Internal: 67.1, Strength: 41.9, Barrier: 50.2, Economy: 67.8},
          { Extenal: 100, Internal: 100, Strength: 100, Barrier: 100, Economy: 100}
        ];
        
        return(
            <Card onClick={()=>{window.location="/commodity/"+this.props.country_code+"/10000"}}>
                <CardBody>
                    <CardTitle className="CardTitle">Commodity</CardTitle>
                    <div className="CardScoreBox">
                        <div className="Score">
                            100
                        </div>
                    </div>
                </CardBody>
                <RadarChart data={characterData}/>
            </Card>
        )
    }
}
{/* <CardImg top width="90%" src={radarchart}></CardImg>   */}

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            country_code: props.match.params.countrycode
        };
    }

    render(){

        if(typeof(this.props.cookies.get('auth_username'))=="undefined"){
            window.location="/login"
        }else{
            let country = country_list.filter((c)=>{
                return c.code.toLowerCase()==this.state.country_code
            })[0]

            return(
                <div>
                    <NavigationBar country_code={this.state.country_code}/>

                    <h2>{country.name}</h2>
                    
                    <Container>
                        <Row>
                            <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard country_code={this.state.country_code}/></Col>
                            <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard country_code={this.state.country_code}/></Col>
                            <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard country_code={this.state.country_code}/></Col>
                            <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard country_code={this.state.country_code}/></Col>
                        </Row>
                        <Row className="GridRow">
                            <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard country_code={this.state.country_code}/></Col>
                            <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard country_code={this.state.country_code}/></Col>
                            <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard country_code={this.state.country_code}/></Col>
                            <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard country_code={this.state.country_code}/></Col>
                        </Row>
                    </Container>
    
                </div>
            )
        }
    }
}

export default withCookies(Dashboard);