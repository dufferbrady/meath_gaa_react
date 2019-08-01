import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import PositionTable from '../PositionTable/PositionTable';
import MatchesList from '../MatchesList/MatchesList';
import classes from './ChampionshipFixtures.module.css';
import FixturesHeader from '../FixturesHeader/FixturesHeader';
import TableHeader from '../TableHeader/TableHeader';

class ChampionshipFixtures extends Component {

    state = {
        ChampionshipMatches: null,
        ChampionshipPositions: null,
        loading: true,
    }

    render() {
        return (
            <Grid container spacing={2} className={classes.League_Fixtures_Container}>
                <Grid item xs={12} sm={6}>
                    <FixturesHeader />
                    <MatchesList matches={this.state.ChampionshipMatches} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TableHeader TableName={'Championship Table'} />
                    <PositionTable teams={this.state.ChampionshipPositions} />
                </Grid>
            </Grid>
            );
    }
}

export default ChampionshipFixtures;