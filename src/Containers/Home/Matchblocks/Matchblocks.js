import React, { Component } from 'react';
import Flip from 'react-reveal/Flip'

import classes from './Matchblocks.module.css'
import { firebaseMatches } from '../../../Firebase'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Matchblock from '../../../Components/Home/Matchblock/Matchblock'
import { getFirebaseDataHandler } from '../../../Components/misc/helpers'

class MatchBlocks extends Component {

    state = {
        matches: null,
        loading: true,
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
            const matches = getFirebaseDataHandler(snapshot.val());
            this.setState({
                matches,
                loading: false
            })
        });
    }

    render() {
        console.log(this.state.matches)
        let matches = null;
        if (this.state.loading) {
            matches = <Spinner height="150px" width="150px" />
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