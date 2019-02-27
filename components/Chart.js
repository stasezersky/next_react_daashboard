import { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ChartContext from '../lib/ctxs/chartContext';


class renderLineChart extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { width: 1000, height: 800 };
    // }
    static contextType = ChartContext
    // componentDidMount() {
    //     if (window) {
    //         let width = window.innerWidth * 0.6
    //         let height = window.innerHeight * 0.82
    //         this.setState(Object.assign(this.state, { width, height }))
    //     }
    // }
    render() {

        let value = this.context
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart  data={value.m2Data[this.props.selectedDomain]} >
                {/* <LineChart width={this.state.width} height={this.state.height} data={value.m2Data[this.props.selectedDomain]}> */}

                    <Line yAxisId="left" connectNulls type="monotone" dataKey="pcsAvg" stroke="#8884d8" name="M2 Avg Weekly Extracted Products" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" connectNulls type="monotone" dataKey="smAvg" name="SM Avg Weekly Extracted Products" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" connectNulls type="monotone" dataKey="esSuccessRate" name="M2 Avg Success Rate" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Legend verticalAlign="top" layout="vertical"  />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="lastDayOfWeek" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default renderLineChart