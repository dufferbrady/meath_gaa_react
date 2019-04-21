import React from 'react';

import classes from './FanZone.module.css';
import FanZoneNFO from './FanZoneNFO/FanZoneNFO'
import FanZoneForm from '../../../Containers/FanZoneForm/FanZoneForm'

const FanZone = () => {
    return (
        <div className={classes.Fanzone}>
            <span className={ classes.Fanzone_Cover }></span>
            <div className={ classes.Fanzone_Body }>
                <FanZoneNFO />
                <FanZoneForm />
            </div>
        </div>
    );
};

export default FanZone;