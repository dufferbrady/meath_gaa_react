import React from 'react';

import classes from './TableHeader.module.css';

const FixturesHeader = props => {
    return (
        <div className={classes.Container}>
            <div>{props.TableName}</div>
        </div>
    );
};

export default FixturesHeader;