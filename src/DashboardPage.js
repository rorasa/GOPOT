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
// import * as Victory from 'victory';
import { VictoryPolarAxis, VictoryChart, VictoryGroup, VictoryArea, VictoryLabel, VictoryTheme } from 'victory';
import radarchart from './assets/radarchart_placeholder.png'

import NavigationBar from './Navbar';

class RadarChart extends Component{
    constructor(props){
        super(props);

        const characterData = [
            { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 , money:5},
            { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 , money:7},
            { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 , money:2}
          ];

        this.state = {
            data: this.processData(characterData),
            maxima: this.getMaxima(characterData)
          };
    }

    getMaxima(data) {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
          memo[key] = data.map((d) => d[key]);
          return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
          memo[key] = Math.max(...groupedData[key]);
          return memo;
        }, {});
      }

    processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
        return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
        });
    };
    return data.map((datum) => makeDataArray(datum));
    }

    render() {
        return (
          <VictoryChart polar
            theme={VictoryTheme.material}
            domain={{ y: [ 0, 1 ] }}
          >
            <VictoryGroup colorScale={["gold", "orange", "tomato"]}
              style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
            >
              {this.state.data.map((data, i) => {
                return <VictoryArea key={i} data={data}/>;
              })}
            </VictoryGroup>
          {
            Object.keys(this.state.maxima).map((key, i) => {
              return (
                <VictoryPolarAxis key={i} dependentAxis
                  style={{
                    axisLabel: { padding: 10 },
                    axis: { stroke: "none" },
                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                  }}
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical"/>
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1} label={key}
                  tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                  tickValues={[0.25, 0.5, 0.75]}
                />
              );
            })
          }
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ""}
              style={{
                axis: { stroke: "none" },
                grid: { stroke: "grey", opacity: 0.5 }
              }}
            />
    
          </VictoryChart>
        );
      }
    
}

class CommodityCard extends Component{
    render(){
        
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
                <RadarChart/>
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