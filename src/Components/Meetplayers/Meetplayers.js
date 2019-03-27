import React from 'react';

import classes from './Meetplayers.module.css'
import Tag from '../UI/Tag/Tag'
import PlayersCards from '../../Containers/PlayersCards/PlayersCards';

const Meetplayers = () => {
    return (
        <div className={classes.Meetplayers_bck}>
            <Tag
                background='#259C41' 
                color='white'
                size='50px'
            >
                Football Squad
            </Tag>
            <PlayersCards />
        </div>
    );
};

export default Meetplayers;