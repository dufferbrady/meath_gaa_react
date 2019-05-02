import React from 'react';

import classes from './Featured.module.css'
import Stripes from '../../../Containers/Home/Stripes/Stripes'
import Text from './Text/Text'

const Featured = () => {
    return (
        <div className={classes.Featured_Wrapper}>
            <span className={classes.Featured_Cover}></span>
            <Text />
            <Stripes />
        </div>
    );
};

export default Featured;