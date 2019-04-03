import React from 'react';

import Featured from '../Featured/Featured'
import classes from './Home.module.css'
import Matches from '../Matches/Matches';
import Meetplayers from '../Meetplayers/Meetplayers'
import FollowUs from '../FollowUs/FollowUs'

const Home = () => {
    return (
        <div className={ classes.Home }>
            <Featured />
            <Matches />
            <Meetplayers />
            <FollowUs />
        </div>
    );
};

export default Home;