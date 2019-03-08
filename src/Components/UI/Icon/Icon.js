import React from 'react';
import { Link } from 'react-router-dom'

import MeathLogo from '../../../Resources/Icons/meath-gaa-logo.png'
import classes from './Icon.module.css';

const Icon = props => {

    const Link_template = <div
        className={classes.Icon_Cover}
        style={{
            background: `url(${MeathLogo}) no-repeat`,
            height: props.height,
            width: props.width,
        }}
    ></div>

    if(props.link) {
        return (
            <Link to={props.LinkTo} className={ classes.Link_Logo }>
                { Link_template }
            </Link>
        )
    } else {
        return Link_template
    }
};

export default Icon;