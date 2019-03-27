import React, { Component } from 'react';

import classes from './Matchblocks.module.css'
import { firebaseDB } from '../../Firebase'
import Spinner from '../../Components/UI/Spinner/Spinner'
import Matchblock from '../../Components/Matchblock/Matchblock'

class MatchBlocks extends Component {

    state = {
        matches: null,
        loading: true
    }

    componentDidMount() {
        firebaseDB.ref('matches').once('value').then(snapshot => {
            this.getMatchesHandler(snapshot.val());
        });
    }

    getMatchesHandler = matches => {
        let data = [];
        Object.keys(matches)
            .map(matchKey => (
                data.push({
                    ...matches[matchKey],
                    id: matchKey
                })
            ));
        this.setState({
            matches: data,
            loading: false
        })
    }

    render() {
        console.log(this.state.matches)
        let matches = null;
        if (this.state.loading) {
            matches = <Spinner />
        } else {
            matches = this.state.matches.map(match => (
                <div
                    key={match.id}
                >
                    <Matchblock 
                    Date={ match.date }
                    fixture={ match.fixture }
                    homeTeam={ match.home }
                    homeResult={ match.resultHome }
                    awayTeam={ match.away }
                    awayResult={ match.resultAway }/>
                </div>
            ));
        }

        return (
            <div className={classes.Matchblock_container}>
                {matches}
            </div>
        );
    }
}

export default MatchBlocks;