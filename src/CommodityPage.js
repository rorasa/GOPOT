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
import { VictoryPolarAxis, VictoryLine, VictoryChart, VictoryGroup, VictoryArea, VictoryLabel, VictoryTheme } from 'victory';
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

class DummyBarChart extends Component{
    constructor(props){
        super(props);
        
        const data = [
            { x: 0, y: 0 },
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 4 },
            { x: 4, y: 3 },
            { x: 5, y: 5 }
          ];

        this.state = {
            data: data
          };
    }

    render(){
        return(
            <VictoryChart polar={this.state.polar} height={390}>
                <VictoryLine
                    interpolation="linear" data={this.state.data}
                    style={{ data: { stroke: "#c43a31" } }}
                />
            </VictoryChart>
        )
    }
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
        return(
            <div>
                <NavigationBar country_code={this.state.country_code}/>
            
                <Container>
                    <Row>
                        <Col xs="12" md="9">
                            <div className="ChartAxis">
                                <h3>GOPOT Factor</h3>
                                <RadarChart/>   
                            </div>
                            <div className="ChartAxis">
                                <h3>GOPOT Score History</h3>
                                <DummyBarChart/>   
                            </div>
                        </Col>
                        <Col xs="12" md="3">
                            <div>
                                <h4>Other opportunities</h4>
                            </div>
                            Item 1<br/>
                            Item 2<br/>
                            Item 3<br/>
                            Item 4<br/>
                            Item 5<br/>
                            Item 6<br/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CommodityPage;