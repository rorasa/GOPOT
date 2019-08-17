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
          { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 , money:5},
          { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 , money:7},
          { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 , money:2}
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