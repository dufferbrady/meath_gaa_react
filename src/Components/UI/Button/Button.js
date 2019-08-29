import React from 'react';

const Button = props => {
    return (
        <button 
        onClick={props.click}
        style={{...props.add}}>
            {props.children}
        </button>
    );
};

export default Button;