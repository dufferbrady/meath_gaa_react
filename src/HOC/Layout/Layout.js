import React from 'react';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const Layout = props => {
    return (
        <div>
            <Header />
            <div style={{
                height: '1000px'
            }}>
                { props.children }
            </div>
            <Footer />
        </div>
    );
};

export default Layout;