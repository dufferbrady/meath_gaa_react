import React from 'react';

import MeathIcon from '../UI/Icon/Icon'
import MeathLogo from '../../Resources/Icons/Meath-logo.png'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer>
            <div className={ classes.Footer_Logo}>
                <MeathIcon 
                url={ `${MeathLogo}` }
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