import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <section className="container-fluid  mt-3 mb-3" >
                    {this.props.children}
                    
                </section>
                <div className="push" ></div>
                <Footer />
            </div>
        )
    }
}

export default Layout;