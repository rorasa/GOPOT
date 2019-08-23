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
import { withCookies } from 'react-cookie';

import NavigationBar from './Navbar';
import RadarChart from './RadarChart';
import LineChart from './LineChart';

const MainPane = (props)=> {
    return(
        <div className="Pane">
            <div className="Panel">
                <h3>Five Factors</h3>
                <div className="ChartAxis">
                    <RadarChart data={props.radar_data} isGood={props.radar_is_good}/>   
                </div>
            </div>
            <div className="Panel">
                <p><strong>Internal</strong>: {props.commodity.internal.toFixed(4)}</p>
                <p className="Tooltip">Internal competitive power of this commodity againts other commodities in the partner country</p>

                <p><strong>External</strong>: {props.commodity.external.toFixed(4)}</p>
                <p className="Tooltip">External competitive power of this country againts other partner countries</p>

                <p><strong>Strength</strong>: {props.commodity.strength.toFixed(4)}</p>
                <p className="Tooltip">Production strength of Thailand</p>

                <p><strong>Economy</strong>: {props.commodity.economy.toFixed(4)}</p>
                <p className="Tooltip">Economic strength of the partner country</p>

                <p><strong>Barrier</strong>: {props.commodity.barrier.toFixed(4)}</p>
                <p className="Tooltip">Barrier to entry for the given commodity</p>
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
        <div className={(props.commodity.score>50)?"HeaderScoreGreen":"HeaderScoreRed"}>
            <div className="HeaderScoreHead">
                GOPOT Score
            </div>
            <div className="HeaderScoreScore">
                {props.commodity.score.toFixed(2)}
            </div>
        </div>
    );
}

const Header = (props) =>{
    return(
        <div className="Header">
            <div className="HeaderTitle">
                {props.commodity.commodity_code}
            </div>
            <HeaderScore commodity={props.commodity}/>
        </div>
    );
}

class CommodityPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            country_code : props.match.params.countrycode,
            commodity_code: props.match.params.commoditycode,
            isLoaded: false,
            commodities: []
        };

        this.fetchData()
    }

    fetchData = ()=>{
        fetch('/api/getCommodity')
        .then((res)=>{
            res.json().then((response)=>{
                this.setState({
                    commodities: response.commodities,
                    isLoaded: true
                });
            })
        })
    }

    render(){

        const historic_data = [
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 3, y: 4 },
        { x: 4, y: 3 },
        { x: 5, y: 5 }
        ];

        if(typeof(this.props.cookies.get('auth_username'))=="undefined"){
            window.location="/login"
        }else{
            let mainPane;
            if(this.state.isLoaded){
                let commodity = this.state.commodities.filter((comm)=>{
                    return comm.commodity_code=this.state.commodity_code
                })[0]

                const data = [
                    { Extenal: commodity.external, Internal: commodity.internal, Strength: commodity.strength, Barrier: commodity.barrier, Economy: commodity.economy},
                    { Extenal: 100, Internal: 100, Strength: 100, Barrier: 100, Economy: 100}
                  ];

                mainPane = (
                    <Container>
                        <Row>
                            <Header commodity={commodity}/>
                        </Row>
                        <Row>
                            <Col xs="12" md="9">
                                <MainPane commodity={commodity} radar_data={data} radar_is_good={(commodity.score>50)?true:false} line_data={historic_data}/>
                            </Col>
                            <Col xs="12" md="3">
                                <SidePane/>
                            </Col>
                        </Row>
                    </Container>
                );
            }else{
                mainPane = (
                    <Container>
                        <Row>
                            <Col xs="12">
                                Loading
                            </Col>
                        </Row>
                    </Container>
                );
            }

            return(
                <div>
                    <NavigationBar country_code={this.state.country_code}/>
                
                    {mainPane}
                </div>
            );
        }
    }
}

export default withCookies(CommodityPage);