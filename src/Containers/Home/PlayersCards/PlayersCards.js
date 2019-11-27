import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import { firebasePlayers } from '../../../Firebase'
import classes from './PlayersCards.module.css'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import PlayerCard from '../../../Components/Home/PlayerCard/PlayerCard'
import { getFirebaseDataHandler, getSelection } from '../../../Components/misc/helpers'

class PlayersCards extends Component {

    state = {
        players: null,
        loading: true,
        delay: [200, 400, 600, 800, 1000]
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            const totalPlayers = getFirebaseDataHandler(snapshot.val());
            const players = getSelection(totalPlayers, 5);
            console.log(players)
            this.setState({
                players,
                loading: false
            })
        });
    }

    render() {
        let players = null;
        if (this.state.loading) {
            players = <Spinner height="150px" width="150px" />
        } else {
            players = this.state.players.map((player, index) => (
                    <Fade key={player.id} right delay={this.state.delay[index]}>
                        <div>
                            <PlayerCard
                                name={player.name}
                                image={player.imageURL}
                                club={player.club}
                                position={player.position}
                            />
                        </div>
                    </Fade>
            ));
        }
        return (
            <div className={classes.Meetplayers_container}>
                {players}
            </div>
        );
    }
}

export default PlayersCards;