import React from 'react';

import Matchblocks from '../../Containers/Matchblocks/Matchblocks'
import Tag from '../UI/Tag/Tag'
import classes from './Matches.module.css'

const Matches = () => {
    return (
        <div className={ classes.Matches_bck }>
            <Tag
            background='#083512'
            color='white'
            size='50px'
            >
                Matches
            </Tag>

            <Matchblocks />

            <Tag
            background='#083512'
            color='white'
            size='30px'
            link={true}
            linkTo='/fixtures'
            add={{
                marginTop: '30px'
            }}>
                See More Matches!
            </Tag>
        </div>
    );
};

export default Matches;