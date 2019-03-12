import { Component } from "react";


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = { password: '' };
        this.handleChange = this.handleChange.bind(this);
    }
    static async getInitialProps({ req, res }) {
        if (req.session.user === 'genericUser') {
            console.log("user: ", req.session.user);
        }
    }
    handleChange(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        return (

            <div>
                <div className="login-container" mode="undefined">

                    <img src="../static/mainlogin.svg" className="login-logo" />



                    <form id="login-view" className="form" action="/login" name="login-form" method="POST"  >
                        <div className="form-group">
                            <input className="w-100" id="password" value={this.state.password} onChange={this.handleChange} type="password" name="password" required="" placeholder="Password" />
                        </div>


                        <div className="form-group">

                            <input id="login-button" type="submit" className="btn btn-primary w-100" flavor="primary-rev" value="sign in" />
                        </div>
                    </form>


                </div>
                <style jsx>{`
                    .login-container {
                        background-color: #fff;
                        border: 1px solid #d8d8d8;
                        border-radius: 6px;
                        padding: 10px 40px 40px 40px;
                        overflow: auto;
                        width: 400px;
                        /* transform: translateY(-50%); */
                        transform: translate(-50%,-50%);
                        left: 50%;
                        top: 50%;
                        position: absolute;
                    }
                    .login-logo {
                        display: block;
                        margin: 10px auto;
                        padding-top: 10px;
                        /* width: 80px; */
                    }

                        `}</style>
            </div>
        );
    }
}

export default LoginPage;