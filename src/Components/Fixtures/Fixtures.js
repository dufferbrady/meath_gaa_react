import React from 'react';

import Tag from '../UI/Tag/Tag';
import FixturesCompSelection from './FixturesCompSelection/FixturesCompSelection'

import classes from './Fixtures.module.css';

const Fixtures = () => {
    return (
        <div className={classes.Fixtures}>
            <div className={classes.Fixtures_Cover}></div>
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
                    Competitions</Tag>
            </div>
            <div className={classes.Fixtures_Container}>
                <FixturesCompSelection />
            </div>
        </div>
    );
};

export default Fixtures;