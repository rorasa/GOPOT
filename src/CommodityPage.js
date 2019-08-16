import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    CardText,
    CardImg
} from 'reactstrap';
import NavigationBar from './Navbar';
import RadarChart from './RadarChart';
import LineChart from './LineChart';

const MainPane = (props)=> {
    return(
        <div className="Pane">
            <div className="Panel">
                <h3>GOPOT Factor</h3>
                <div className="ChartAxis">
                    <RadarChart data={props.radar_data}/>   
                </div>
            </div>
            <div className="Panel">
                <h3>GOPOT Score History</h3>
                <div className="ChartAxis">
                    <LineChart data={props.line_data}/>
                </div>
            </div>
            <div className="Panel"> 
                <h3>Available Trade Agreements</h3>
                <ul>
                    <li>Agreement 1</li>
                    <li>Agreement 2</li>
                    <li>Agreement 3</li>
                    <li>Agreement 4</li>
                </ul>
            </div>
        </div>
    );
}

const SidePane = (props) =>{
    return( 
        <div className="Panel">
            <h4>Other opportunities</h4>
            Item 1<br/>
            Item 2<br/>
            Item 3<br/>
            Item 4<br/>
            Item 5<br/>
            Item 6<br/>
        </div>
    );
}

const HeaderScore = (props)=>{
    return(
        <div className="HeaderScore">
            <div className="HeaderScoreHead">
                GOPOT Score
            </div>
            <div className="HeaderScoreScore">
                100
            </div>
        </div>
    );
}

const Header = (props) =>{
    return(
        <div className="Header">
            <div className="HeaderTitle">
                Commodity Name
            </div>
            <HeaderScore/>
        </div>
    );
}

class CommodityPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            country_code : props.match.params.countrycode,
            commodity_code: props.match.params.commoditycode
        };
    }

    render(){
        const characterData = [
            { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 , money:5},
            { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 , money:7},
            { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 , money:2}
          ];

        const historic_data = [
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 3, y: 4 },
        { x: 4, y: 3 },
        { x: 5, y: 5 }
        ];

        return(
            <div>
                <NavigationBar country_code={this.state.country_code}/>
            
                <Container>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <Col xs="12" md="9">
                            <MainPane radar_data={characterData} line_data={historic_data}/>
                        </Col>
                        <Col xs="12" md="3">
                            <SidePane/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CommodityPage;