import React, { Component } from 'react';
import {VictoryLine, 
    VictoryChart } from 'victory';

class LineChart extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: props.data
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

export default LineChart;