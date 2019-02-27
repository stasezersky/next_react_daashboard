import { Component } from 'react';
import ChartContext from '../lib/ctxs/chartContext';
import Chart from './Chart';



class Wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedDomain: 'amazon.com' };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState(Object.assign(this.state, { selectedDomain: event.target.value }));
    }

    render() {
        return (
            <div className="row h-100 ">
                <div className="col-12 ">
                    <h1 class="my-4">Extraction Performance Stats</h1>
                </div>
                <div className="col-8">
                    <Chart selectedDomain={this.state.selectedDomain} />
                </div>
                <div className="col-4">
                    <p>Latest update at: {this.context['dateOfUpdate']}</p>
                    <select className="custom-select" value={this.state.selectedDomain} onChange={this.handleChange}>
                        {Object.keys(this.context['m2Data']).sort().map((domainName, i) => (
                            <option key={i} value={domainName}>{domainName}</option>
                        ))
                        }
                    </select>
                </div>

            </div>
        )
    }
}
Wrapper.contextType = ChartContext

export default Wrapper