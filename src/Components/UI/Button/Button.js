import React from 'react';

const Button = props => {
    return (
        <button style={{...props.add}}>
            {props.children}
        </button>
    );
};

export default Button;