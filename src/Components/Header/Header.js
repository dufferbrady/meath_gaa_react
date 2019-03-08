import React from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

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
                <div className={ classes.Icon }>Meath Icon</div>
                <Link className={ classes.Link } to="/Fixtures">
                    <Button color="inherit">Fixtures</Button>
                </Link>
                <Link className={ classes.Link } to="/The-Team">
                    <Button color="inherit">The Team</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;