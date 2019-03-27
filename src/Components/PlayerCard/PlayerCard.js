import React from 'react';
import classes from './PlayerCard.module.css';

const PlayerCard = props => {
    return (
        <div className={classes.Player_Container}>
            <img src={props.image} alt={`${props.name}`} className={classes.Players_Image} />
            <div className={ classes.Player_Name }>
                {props.name}
            </div>
            <div>{props.position}</div>
        </div>
    );
};

export default PlayerCard;