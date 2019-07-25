import React from 'react';

import classes from './FixturesCompSelection.module.css';
import LeagueFixtures from '../../../Containers/Fixtures/LeagueFixtures/LeagueFixtures';
import ChampionshipFixtures from '../../../Containers/Fixtures/ChampionshipFixtures/ChampionshipFixtures';

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
                <AppBar position="static" style={{ backgroundColor: '#083412', color: 'white' }}>
                    <Tabs variant="fullWidth" value={value} onChange={changeFixturesHandler}>
                        <Tab
                            style={{
                                fontSize: '15px',
                                letterSpacing: '1px',
                            }}
                            label="League"
                            value={0} />
                        <Tab
                            style={{
                                fontSize: '15px',
                                letterSpacing: '1px',
                            }}
                            label="Championship"
                            value={1} />
                    </Tabs>
                </AppBar>
            </div>
            {value === 0 && <LeagueFixtures />}
            {value === 1 && <ChampionshipFixtures />}
        </Paper>
    );
};

export default FixturesCompSelection;