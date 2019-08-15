import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './Title';

const API = 'http://localhost:8000/api';
const TIMER_QUERY = '/timer'


class TimeSeriesChart extends Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <React.Fragment>
                <Title> Summary </Title>
                <ResponsiveContainer>
                    <LineChart
                        margin={{
                            top: 32,
                            right: 32,
                            bottom: 0,
                            left: 0,
                        }}
                        data={this.props.data}
                    >
                        <XAxis dataKey="day" />
                        <YAxis yAxisId="duration" domain={[0, 'dataMax']} />
                        <YAxis yAxisId="rating" domain={[0, 10]} orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" yAxisId="duration" dataKey="duration" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} connectNulls />
                        <Line type="monotone" yAxisId="rating" dataKey="rating" stroke="red" strokeWidth={3} activeDot={{ r: 8 }} connectNulls />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}

export default TimeSeriesChart;