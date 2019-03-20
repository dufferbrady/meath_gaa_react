import React from 'react';

import Featured from '../Featured/Featured'
import classes from './Home.module.css'
import Matches from '../Matches/Matches';

const Home = () => {
    return (
        <div className={ classes.Home }>
            <Featured />
            <Matches />
        </div>
    );
};

export default Home;