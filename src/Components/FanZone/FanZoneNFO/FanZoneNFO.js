import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './FanZoneNFO.module.css'
import Tag from '../../UI/Tag/Tag'

const FanZoneNFO = () => {
    return (
        <div className={classes.FanZoneNFO_Container}>
            <div className={classes.Header}>
                <Tag
                    background='#259C41'
                    color='white'
                    size='15px'
                    add={{
                        width: 'fit-content',
                    }}>
                    FREE SIGN UP
                </Tag>
                <Tag
                    background='#083512'
                    color='white'
                    size='35px'
                    add={{
                        width: 'fit-content',
                    }}>
                    REGISTER FOR FANZONE
                </Tag>
            </div>
            <div className={classes.Body_Container}>
                <div className={classes.Body_Header}>
                    Members will be granted exclusive access to:
                </div>
                <div className={classes.Body}>
                    <div className={classes.Body_Content}>
                        <FontAwesomeIcon
                            icon="check"
                            style={{
                                marginRight: '10px',
                                fontSize: '20px'
                            }}
                        /><span>A regular FanZone newsletter with exclusive news, interviews and videos</span>
                    </div>
                    <div className={classes.Body_Content}>
                        <FontAwesomeIcon
                            icon="check"
                            style={{
                                marginRight: '10px',
                                fontSize: '20px'
                            }}
                        /><span>Behind-the-scenes insights like never before</span>
                    </div>
                    <div className={classes.Body_Content}>
                        <FontAwesomeIcon
                            icon="check"
                            style={{
                                marginRight: '10px',
                                fontSize: '20px'
                            }}
                        /><span>Behind-the-scenes insights like never before</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FanZoneNFO;