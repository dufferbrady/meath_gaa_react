import React from 'react';

import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={ classes.Header }>
            <div>Icon</div>
            <div>Menu items</div>
        </header>
    );
};

export default Header;