import React from 'react';
import { Link } from 'react-router-dom'

const Tag = (props) => {

    const template = <div
    style={{
        background: props.background,
        color: props.color,
        fontSize: props.size,
        padding: '10px',
        display: 'inline-block',
        fontFamily: 'Poppins',
    }}>
        { props.children }
    </div>

    if(props.link) {
        return (
            <Link to={ props.linkTo }>
                { template }
            </Link>
        )
    } else {
        return template
    }

};

export default Tag;