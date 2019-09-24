import React, { Component } from 'react';

import {  firebaseLeaguePostions } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers';
import PositionTable from '../PositionTable/PositionTable';
import classes from './LeagueContainer.module.css';
import LeagueHeader from './LeagueHeader/LeagueHeader';
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
                    <LeagueHeader />
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