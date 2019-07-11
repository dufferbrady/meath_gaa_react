import React from 'react';

import Tag from '../UI/Tag/Tag';
import TheTeamPlayers from '../../Containers/TheTeam/TheTeamPlayers/TheTeamPlayers';

import classes from './TheTeam.module.css';

const TheTeam = () => {
    return (
        <div className={classes.TheTeam}>
            <div className={classes.TheTeam_Cover}></div>
            <div className={classes.TheTeam_Container}>
                <div className={classes.Tags}>
                    <Tag
                        background='#259C41'
                        color='white'
                        size='25px'
                        add={{ width: 'fit-content' }}
                    >
                        Meath Gaa</Tag>
                    <Tag
                        background='#083412'
                        color='white'
                        size='40px'
                        add={{ width: 'fit-content' }}
                    >
                        Senior Football Team</Tag>
                </div>
                <TheTeamPlayers />
            </div>
        </div>
    );
};

export default TheTeam;
