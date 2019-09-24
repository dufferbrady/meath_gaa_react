import React, { Component } from 'react';

import {  firebaseLeaguePostions } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers';
import PositionTable from '../PositionTable/PositionTable';
import classes from './ChampionshipContainer.module.css';
import ChampionshipHeader from './ChampionshipHeader/ChampionshipHeader';
import TableHeader from '../TableHeader/TableHeader';

class ChampionshipContainer extends Component {

    state = {
        ChampionshipPositions: null,
        loading: true,
    }

    // componentDidMount() {
    //     firebaseLeaguePostions
    //         .once('value')
    //         .then(snapshot => {
    //             const ChampionshipPositions = getFirebaseDataHandler(snapshot.val());
    //             this.setState({
    //                 ChampionshipPositions,
    //                 loading: false
    //             })
    //         })
    // }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.League_Fixtures}>
                    <ChampionshipHeader />
                </div>
                <div style={{width: "350px"}}>
                    <TableHeader TableName={"Super 8's"} />
                    <PositionTable teams={this.state.ChampionshipPositions} />
                </div>
            </div>
            );
        }
}

export default ChampionshipContainer;