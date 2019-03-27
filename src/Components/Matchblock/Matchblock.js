import React from 'react';

import classes from './Matchblock.module.css'

const Matchblock = props => {
    return (
        <div className={ classes.Match_Container }>
            <h4 className={ classes.Match_Header }>{ props.Date }</h4>
            <div className={ classes.Match_Fixture }>{ props.fixture }</div>
            <div className={ classes.Match_Info_Container }>
                <div className={ classes.Match_Stat }>{ props.homeTeam }</div>
                <div className={ classes.Match_Stat }>{ props.homeResult }</div>
                <div className={ classes.Match_Stat }>{ props.awayTeam }</div>
                <div className={ classes.Match_Stat }>{ props.awayResult }</div>
            </div>
        </div>
    );
};

export default Matchblock;