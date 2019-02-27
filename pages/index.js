import { Component } from "react";
import fetch from "isomorphic-unfetch";
import ChartContext from "../lib/ctxs/chartContext"

import Layout from "../components/Layout";
// import Meta from "../components/Meta";
import Hompage from "../components/Homepage";
// import backend from "../backend/backend.conf";
class MainPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         descs: props.descs
    //     }
    // }
    static async getInitialProps(ctx) {
        // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        // return { userAgent }
        // console.log(ctx.query.data)
        const res = await fetch('http://localhost:3000/api/getState')
        const json = await res.json()
        // console.log(json)
        return { extractionData: json }
    }

    render() {
        return (
            <Layout>
                {/* <Meta
                    title={`Remote Job Lists`}
                    description={`Some sample description`}
                /> */}
                <ChartContext.Provider value={this.props.extractionData}>
                    <Hompage />
                </ChartContext.Provider>
            </Layout>
        );
    }
}

export default MainPage;