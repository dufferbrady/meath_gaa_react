import React, { Component } from 'react';

import { firebaseDB } from '../../Firebase'
import Spinner from '../../Components/UI/Spinner/Spinner'

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
                <div key={ match.id }>
                    {match.referee}
                </div>
            ));
        }

        return (
            <div>
                { matches }
            </div>
        );
    }
}

export default MatchBlocks;