import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Header />
                <section className="row mt-3 mb-3" >
                    {this.props.children}
                </section>
                <Footer />
            </div>
        )
    }
}

export default Layout;