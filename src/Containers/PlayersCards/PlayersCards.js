import React, { Component } from 'react';
import { firebasePlayers } from '../../Firebase'
import Fade from 'react-reveal/Fade';

import classes from './PlayersCards.module.css'
import Spinner from '../../Components/UI/Spinner/Spinner'
import PlayerCard from '../../Components/Home/PlayerCard/PlayerCard'

class PlayersCards extends Component {

    state = {
        players: null,
        loading: true,
        delay: [200, 400, 600, 800, 1000]
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            this.getPlayersHandler(snapshot.val());
        });
    }

    getPlayersHandler = players => {
        let data = [];
        Object.keys(players)
            .map(playerKey => (
                data.push({
                    ...players[playerKey],
                    id: playerKey
                })
            ));
        this.setState({
            players: data,
            loading: false
        })
    }

    render() {
        let players = null;
        if (this.state.loading) {
            players = <Spinner />
        } else {
            players = this.state.players.map((player, index) => (
                <Fade right delay={this.state.delay[index]}>
                    <div
                        key={player.id}
                    >
                        <PlayerCard
                            name={player.name}
                            image={player.image}
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