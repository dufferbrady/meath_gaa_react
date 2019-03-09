import React from 'react';

import classes from './Home.module.css'
import Stripes from '../../Containers/Stripes/Stripes'

const Home = () => {
    return (
        <div className={ classes.Home_Wrapper }>
            <Stripes />
        </div>
    );
};

export default Home;