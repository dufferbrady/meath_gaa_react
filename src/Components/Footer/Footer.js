import React from 'react';

import Meath_Icon from '../UI/Icon/Icon'
import Meath_Logo from '../../Resources/Icons/meath-gaa-logo.png'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer>
            <div className={ classes.Footer_Logo}>
                <Meath_Icon 
                url={ `${Meath_Logo}` }
                link={ false }
                width="50px"
                height="50px"/>
            </div>
            <div>
                Meath GAA 2019. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;