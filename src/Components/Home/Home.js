import React from 'react';

import classes from './Home.module.css'
import Stripes from '../../Containers/Stripes/Stripes'
import Text from '../Text/Text'

const Home = () => {
    return (
        <div className={classes.Home_Wrapper}>
            <Text />
            <Stripes />
        </div>
    );
};

export default Home;