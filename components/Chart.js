import { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ChartContext from '../lib/ctxs/chartContext';


class renderLineChart extends Component {

    static contextType = ChartContext

    render() {
        const dataKeys = {
            m2Counts : 'M2 Daily Avg over week',
            smCounts : 'SM Daily Avg over week',
            sr : 'M2 Daily Avg Success Rate'
        }
        let value = this.context
        const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
        const withCommas= x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const tooltipFprmater = (value, name) => {
            if(name === dataKeys.m2Counts || name === dataKeys.smCounts){
                return [ `${withCommas(value)}`, name]
            } else {
                return [ `${toPercent(value)}`, name]
            }
        } 
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart  data={value.m2Data[this.props.selectedDomain]} >


                    <Line yAxisId="left" connectNulls type="monotone" dataKey="pcsAvg" stroke="#8884d8" name={dataKeys.m2Counts} activeDot={{ r: 8 }} />
                    <Line yAxisId="left" connectNulls type="monotone" dataKey="smAvg" name={dataKeys.smCounts} activeDot={{ r: 8 }} />
                    <Line yAxisId="right" connectNulls type="monotone" dataKey="esSuccessRate" name={dataKeys.sr} stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Legend verticalAlign="top" layout="vertical" height={100} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="lastDayOfWeek" />
                    <YAxis width={100} yAxisId="left" tickFormatter={withCommas}/>
                    <YAxis yAxisId="right" orientation="right" tickFormatter={toPercent}/>
                    <Tooltip formatter={tooltipFprmater}/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default renderLineChart