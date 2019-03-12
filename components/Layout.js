import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
    render() {
        return (
            <div>
                <div className="app" >
                    <Header />

                    {this.props.children}



                    <Footer />
                </div>
                <style jsx>{`
                    .app {
                        background-image: url('/static/loginbg.png')
                    }
                        `}</style>
            </div>

        )
    }
}

export default Layout;