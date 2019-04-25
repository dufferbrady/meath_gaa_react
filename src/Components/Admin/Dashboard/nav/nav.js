import React from 'react';
import { Link } from 'react-router-dom'

import { firebase } from '../../../../Firebase'
import ListItem from '@material-ui/core/ListItem'
import classes from './nav.module.css'

const nav = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/add-matches'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/add-players'
        },
    ]
    const navItems = links.map(link => (
        <Link key={link.title} to={link.linkTo}>
            <ListItem button>
                {link.title}
            </ListItem>
        </Link>
    ));

    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Logged out successfully.")
            })
            .catch(error => {
                console.log("Whoooops something went wrong, trya again.")
            })
    }

    return (
        <div className={classes.NavList}>
            {navItems}
            <ListItem button onClick={() => logoutHandler()}>
                Log out
            </ListItem>
        </div>
    );
};

export default nav;