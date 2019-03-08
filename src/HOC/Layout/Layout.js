import React from 'react';

import Header from '../../Components/Header/Header'

const Layout = props => {
    return (
        <div>
            <Header />
            { props.children }
            footer
        </div>
    );
};

export default Layout;