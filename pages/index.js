import { Component } from "react";
import fetch from "isomorphic-unfetch";
import ChartContext from "../lib/ctxs/chartContext"
import Router from 'next/router'

import Layout from "../components/Layout";

import Hompage from "../components/Homepage";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: this.props.user }
    }
    static async getInitialProps(ctx) {

        if (ctx.req.session.user) {
            const res = await fetch('http://localhost:3000/api/getState')
            const json = await res.json()
            return { extractionData: json, user: ctx.req.session.user }
        } else {
            if (ctx && ctx.req) {
                ctx.res.writeHead(302, { Location: `/login` })
                ctx.res.end()
            } else {
                // console.log('client side')
                Router.push(`/login`)
            }
        }
    }

    render() {
        return (
            <Layout>
                <ChartContext.Provider value={this.props.extractionData}>
                    <Hompage />
                </ChartContext.Provider>
            </Layout>
        );
    }
}

export default MainPage;