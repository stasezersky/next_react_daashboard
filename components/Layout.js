import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
    render() {
        return (
            <div className="app">
                <Header />

                    {this.props.children}



                <Footer />
            </div>
        )
    }
}

export default Layout;