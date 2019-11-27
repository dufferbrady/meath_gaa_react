import React from 'react';

import classes from './Meetplayers.module.css'
import Tag from '../../UI/Tag/Tag'
import PlayersCards from '../../../Containers/Home/PlayersCards/PlayersCards';

const Meetplayers = () => {
    return (
        <div className={classes.Meetplayers_bck}>
            <span className={classes.Players_Cover}></span>
            <div className={classes.Players_Body}>
                <Tag
                    background='#259C41'
                    color='white'
                    size='50px'
                >
                    Football Squad
            </Tag>
                <PlayersCards />
                <Tag
                    background='#259C41'
                    color='white'
                    size='20px'
                    link={true}
                    linkTo="/The_Team"
                >
                    View all Players
            </Tag>
            </div>
        </div>
    );
};

export default Meetplayers;