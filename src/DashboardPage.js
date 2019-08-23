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

        const data = [
          { Extenal: this.props.commodity.external, Internal: this.props.commodity.internal, Strength: this.props.commodity.strength, Barrier: this.props.commodity.barrier, Economy: this.props.commodity.economy},
          { Extenal: 100, Internal: 100, Strength: 100, Barrier: 100, Economy: 100}
        ];

        return(
            <Card onClick={()=>{window.location="/commodity/"+this.props.country_code+"/"+this.props.commodity.commodity_code}}>
                <CardBody>
                    <CardTitle className="CardTitle">{this.props.name}</CardTitle>
                    <div className={(this.props.commodity.score>50)?"CardScoreBoxGreen":"CardScoreBoxRed"}>
                        <div className="CardScoreBoxScore">
                            {this.props.commodity.score.toFixed(2)}
                        </div>
                    </div>
                </CardBody>
                <RadarChart data={data} isGood={(this.props.commodity.score>50)?true:false}/>
            </Card>
        )
    }
}

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            country_code: props.match.params.countrycode,
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

        if(typeof(this.props.cookies.get('auth_username'))=="undefined"){
            window.location="/login"
        }else{
            let country = country_list.filter((c)=>{
                return c.code.toLowerCase()==this.state.country_code
            })[0]

            let commodity_cards = null;
            if(this.state.isLoaded){
                const total_comm =  this.state.commodities.length;
                const num_of_rows = Math.ceil(total_comm / 4);
                
                let rows = []
                for(let i=0; i<num_of_rows;i++){
                    let row_comms = this.state.commodities.slice(i*4,(i*4)+4)
                    
                    let cols = []
                    cols.push(row_comms.map((comm, idx)=>{
                        return (<Col xs="12" sm="6" md="3" className="GridCell" key={idx}>
                                <CommodityCard country_code={this.state.country_code} name={comm.name} commodity={comm}/>
                            </Col>);
                    }));

                    rows.push(<Row className="GridRow">
                        {cols}
                    </Row>)
                }

                commodity_cards=(
                    <Container>
                        {rows}
                    </Container>
                )
            }else{
                commodity_cards=(
                    <Container>
                        <Row className="GridRow">
                            <Col xs="12">
                                Loading
                            </Col>
                        </Row>
                    </Container>
                )
            }

            return(
                <div>
                    <NavigationBar country_code={this.state.country_code}/>

                    <h2>{country.name}</h2>
                    
                    {commodity_cards}
    
                </div>
            )
        }
    }
}

export default withCookies(Dashboard);