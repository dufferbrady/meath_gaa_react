import React, { Component } from 'react';
import Flip from 'react-reveal/Flip'

import classes from './Matchblocks.module.css'
import { firebaseMatches } from '../../Firebase'
import Spinner from '../../Components/UI/Spinner/Spinner'
import Matchblock from '../../Components/Home/Matchblock/Matchblock'

class MatchBlocks extends Component {

    state = {
        matches: null,
        loading: true,
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
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
            matches = <Spinner height="150px" width="150px"/>
        } else {
            matches = this.state.matches.map((match, index) => (
                <div
                    key={match.id}
                >
                    <Flip top delay={200}>
                        <Matchblock
                            Date={match.date}
                            fixture={match.fixture}
                            homeTeam={match.home}
                            homeResult={match.resultHome}
                            awayTeam={match.away}
                            awayResult={match.resultAway} />
                    </Flip>
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