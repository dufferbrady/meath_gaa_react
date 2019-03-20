import React from 'react';

import MatchBlocks from '../../Containers/MatchBlocks/MatchBlocks'
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

            <MatchBlocks />

            <Tag
            background='#083512'
            color='white'
            size='30px'
            link={true}
            linkTo='/fixtures'>
                See More Matches!
            </Tag>
        </div>
    );
};

export default Matches;