import React, { Component } from 'react';

import { firebaseMatches, firebaseLeaguePostions } from '../../../Firebase';
import { getFirebaseDataHandler, matchCompetitionSeperator } from '../../../Components/misc/helpers';
import PositionTable from '../PositionTable/PositionTable';
import MatchesList from '../MatchesList/MatchesList';
import classes from './LeagueFixtures.module.css';
import FixturesHeader from '../FixturesHeader/FixturesHeader';
import TableHeader from '../TableHeader/TableHeader';

class LeagueFixtures extends Component {

    state = {
        leaguePositions: null,
        loading: true,
    }

    componentDidMount() {
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
            <div className={classes.Container}>
                <div className={classes.League_Fixtures}>
                    <FixturesHeader />
                </div>
                <div style={{width: "350px"}}>
                    <TableHeader TableName={'League Table'} />
                    <PositionTable teams={this.state.leaguePositions} />
                </div>
            </div>
            );
        }
    }
        
export default LeagueFixtures;