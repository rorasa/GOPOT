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

import NavigationBar from './Navbar';
import RadarChart from './RadarChart';

class CommodityCard extends Component{
    render(){

        const characterData = [
          { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 , money:5},
          { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 , money:7},
          { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 , money:2}
        ];
        
        return(
            <Card onClick={()=>{window.location="/commodity/us/10000"}}>
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
        return(
            <div>
                <NavigationBar country_code={this.state.country_code}/>
                
                <Container>
                    <Row>
                        <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" ><CommodityCard/></Col>
                    </Row>
                    <Row className="GridRow">
                        <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell"><CommodityCard/></Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Dashboard;