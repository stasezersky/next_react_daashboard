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
            <div className="row h-100 justify-content-center">
                <div className="col-12 ">
                    <h1 class="my-4">Extraction Performance Stats</h1>
                </div>
                <div className="col-lg-2 col-md-12 order-lg-2 mb-md-5 align-items-center">
                    <p>Latest update at: {this.context['dateOfUpdate']}</p>
                    <select className="custom-select" value={this.state.selectedDomain} onChange={this.handleChange}>
                        {Object.keys(this.context['m2Data']).sort().map((domainName, i) => (
                            <option key={i} value={domainName}>{domainName}</option>
                        ))
                        }
                    </select>
                </div>
                <div className="col-lg-6 col-md-12 order-lg-1 ">
                    <Chart selectedDomain={this.state.selectedDomain} />
                </div>


            </div>
        )
    }
}
Wrapper.contextType = ChartContext

export default Wrapper