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
import radarchart from './assets/radarchart_placeholder.png'

import NavigationBar from './Navbar';

class CommodityCard extends Component{
    render(){
        return(
            <Card>
                <CardBody>
                    <CardTitle className="CardTitle">Commodity</CardTitle>
                    <div className="CardScoreBox">
                        <div className="Score">
                            100
                        </div>
                    </div>
                </CardBody>
                <CardImg top width="90%" src={radarchart}></CardImg>  
            </Card>
        )
    }
}

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
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                    </Row>
                    <Row className="GridRow">
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                        <Col xs="12" sm="6" md="3" className="GridCell" onClick={()=>{console.log("Go")}}><CommodityCard/></Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Dashboard;