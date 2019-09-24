import React from 'react';

import classes from './FixturesCompSelection.module.css';
import League from '../../../Containers/Fixtures/League/LeagueContainer';
import Championship from '../../../Containers/Fixtures/Championship/ChampionshipContainer';

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const FixturesCompSelection = () => {
    const [value, setValue] = React.useState(0);

    const changeFixturesHandler = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Paper className={classes.Paper}>
            <span className={classes.Fixtures_Header}>
                Competition Selection
            </span>
            <div className={classes.Tab_Container}>
                <AppBar position="static" style={{zIndex: '99', backgroundColor: '#259C41', color: 'white', boxShadow: 'none' }}>
                    <Tabs variant="fullWidth" value={value} onChange={changeFixturesHandler}>
                        <Tab
                            style={{
                                fontSize: '15px',
                                letterSpacing: '1px',
                                color: 'white',
                                borderBottom: 'none',
                                flexGrow: '1'
                            }}
                            label="League"
                            value={0} />
                        <Tab
                            style={{
                                fontSize: '15px',
                                letterSpacing: '1px',
                                color: 'white',
                                borderBottom: 'none',
                                flexGrow: '1'
                            }}
                            label="Championship"
                            value={1} />
                    </Tabs>
                </AppBar>
            </div>
            {value === 0 && <League />}
            {value === 1 && <Championship />}
        </Paper>
    );
};

export default FixturesCompSelection;