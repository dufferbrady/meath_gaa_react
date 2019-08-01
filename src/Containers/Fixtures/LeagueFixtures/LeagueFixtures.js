import React, { Component } from 'react';

import { firebaseMatches, firebaseLeaguePostions } from '../../../Firebase';
import { getFirebaseDataHandler, matchCompetitionSeperator } from '../../../Components/misc/helpers';
import Grid from '@material-ui/core/Grid';
import PositionTable from '../PositionTable/PositionTable';
import MatchesList from '../MatchesList/MatchesList';
import classes from './LeagueFixtures.module.css';
import FixturesHeader from '../FixturesHeader/FixturesHeader';
import TableHeader from '../TableHeader/TableHeader';

class LeagueFixtures extends Component {

    state = {
        leagueMatches: null,
        leaguePositions: null,
        loading: true,
    }

    componentDidMount() {
        firebaseMatches
            .once('value')
            .then(snapshot => {
                const matches = getFirebaseDataHandler(snapshot.val());
                const leagueMatches = matchCompetitionSeperator(matches, 'Allianz Football League')
                this.setState({
                    leagueMatches
                })
            })
        firebaseLeaguePostions
            .once('value')
            .then(snapshot => {
                const leaguePositions = getFirebaseDataHandler(snapshot.val());
                this.setState({
                    leaguePositions,
                    loading: false
                })
            })
    }


    render() {
        return (
            <Grid container spacing={2} className={classes.League_Fixtures_Container}>
                <Grid item xs={12} sm={6}>
                    <FixturesHeader />
                    <MatchesList matches={this.state.leagueMatches} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TableHeader TableName={'League Table'} />
                    <PositionTable teams={this.state.leaguePositions} />
                </Grid>
            </Grid>
            );
        }
    }
        
export default LeagueFixtures;