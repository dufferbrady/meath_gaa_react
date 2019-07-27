import React, { Component } from 'react';

import { firebaseMatches } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers';


class LeagueFixtures extends Component {

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
            console.log(matches)
        });
    }

    render() {
        return (
            <div>
                <div>League Table</div>
                <div>League Fixtures</div>
            </div>
        );
    }
}

export default LeagueFixtures;