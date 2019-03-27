import React from 'react';

import Featured from '../Featured/Featured'
import classes from './Home.module.css'
import Matches from '../Matches/Matches';
import Meetplayers from '../Meetplayers/Meetplayers'

const Home = () => {
    return (
        <div className={ classes.Home }>
            <Featured />
            <Matches />
            <Meetplayers />
        </div>
    );
};

export default Home;