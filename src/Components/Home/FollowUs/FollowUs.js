import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { FacebookProvider, Page } from 'react-facebook';

import classes from './FollowUs.module.css'

const FollowUs = () => {
    return (
        <div className={classes.FollowUs_bck}>
            <div className={ classes.Twitter }>
                <h3>Follow us on twitter</h3>
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="MeathGaa"
                    options={{ height: 400 }}
                />
            </div>
            <div className={ classes.Facebook }>
                <h3>like us on facebook</h3>
                <FacebookProvider appId="360829397974813">
                    <Page
                        className={ classes.Facebook_Page }
                        href="https://www.facebook.com/MeathGAAOfficial/?eid=ARCU2s3x5aOt0smwQLi9f8eX_P-w-TTe7FMpQXAOyCxQ-dMtBTrMZjDoYS8Bty3lCpUpHb1j-fkVy_hr"
                        tabs="timeline" />
                </FacebookProvider>
            </div>
        </div>
    );
};

export default FollowUs;

// style = {{
//     position: static;
//     visibility: visible;
//     display: inline - block;
//     width: 520px;
//     height: 600px;
//     padding: 0px;
//     border: none;
//     max - width: 100 %;
//     min - width: 180px;
//     margin - top: 0px;
//     margin - bottom: 0px;
//     min - height: 200px;
// }} 