import React from 'react';

import classes from './Featured.module.css'
import Stripes from '../../../Containers/Stripes/Stripes'
import Text from './Text/Text'

const Featured= () => {
    return (
        <div className={classes.Featured_Wrapper}>
            <Text />
            <Stripes />
        </div>
    );
};

export default Featured;