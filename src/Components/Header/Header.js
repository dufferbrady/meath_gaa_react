import React from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import MeathIcon from '../UI/Icon/Icon'
import MeathLogo from '../../Resources/Icons/Meath-logo.png'

import classes from './Header.module.css'

const Header = () => {
    return (
        <AppBar 
        className={ classes.Header }
        style={{
            background: '#259C41',
            boxShadow: 'none',
        }}>
            <Toolbar>
                <div className={ classes.Icon }>
                    <MeathIcon
                    url={ `${MeathLogo}` }
                    link={ true }
                    LinkTo="/"
                    width="50px"
                    height="50px"/>
                </div>
                <Link to="/Fixtures">
                    <Button color="inherit">Fixtures</Button>
                </Link>
                <Link to="/The_Team">
                    <Button color="inherit">The Team</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;