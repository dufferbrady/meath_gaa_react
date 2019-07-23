import React from 'react';

import classes from './FixturesCompSelection.module.css';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const FixturesCompSelection = () => {
    return (
        <Paper className={classes.Paper}>
            <span className={classes.Fixtures_Header}>
                Competition Selection
            </span>
            <div className={classes.Buttons_Container}>
                <Button 
                variant="contained"
                style={{
                    marginRight: '5%',
                    fontSize: '75%',
                    backgroundColor: '#259C41',
                    color: 'white'
                }}>
                    League
                </Button>
                <Button 
                variant="contained"
                style={{
                    marginLeft: '5%',
                    fontSize: '75%',
                    backgroundColor: '#259C41',
                    color: 'white'
                }}>
                    Championship
                </Button>
            </div>
        </Paper>
    );
};

export default FixturesCompSelection;