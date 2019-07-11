import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Spinner from '../../../Components/UI/Spinner/Spinner'
import SectionBar from '../../../Components/UI/SectionBar/SectionBar';

import { firebasePlayers } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers';

import classes from './TheTeamPlayers.module.css';

class TheTeamPlayers extends Component {

    state = {
        players: null,
        loading: true
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            const players = getFirebaseDataHandler(snapshot.val());
            console.log(players.position)
            this.setState({
                players,
                loading: false
            })
        })
    }

    render() {
        let players = null;
        if (this.state.loading) {
            players = (
                <Spinner
                    height="150px"
                    width="150px"
                    marginTop="100px" />
            )
        } else {
            players = (
                <Paper style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'flex-start',
                    padding: '25px',
                }}>
                    {this.state.players.map((player, i) => (
                        <Card
                        key={i}
                        style={{
                            width: '20%',
                            margin: '5px 25px',
                        }}>
                            <CardContent style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Avatar src={player.imageURL} style={{width: '75px', height: '75px', marginRight: '10px'}} />
                                <Typography variant="h6" gutterBottom>
                                    {player.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Paper>
            )
        }
        return (
            <div className={classes.Container}>
                <AppBar position="static" style={{ backgroundColor: '#083412', color: 'white' }}>
                    <Tabs
                        className={classes.Text}
                        indicatorColor="secondary"
                        variant="fullWidth"
                    >
                        <Tab style={{ fontSize: '15px' }} label="Full Team" />
                        <Tab style={{ fontSize: '15px' }} label="Goalkeepers" />
                        <Tab style={{ fontSize: '15px' }} label="Defenders" />
                        <Tab style={{ fontSize: '15px' }} label="Midfielders" />
                        <Tab style={{ fontSize: '15px' }} label="Forwards" />
                    </Tabs>
                </AppBar>
                <SectionBar 
                sectionName={'Goalkeepers'} 
                style={{
                    backgroundColor: '#F9FAFB',
                    padding: '15px 40px',
                    fontSize: '15px',
                    textTransform: 'uppercase',
                    color: '#747D8D'    
                }}/>
                {players}
            </div>
        );
    }
}

export default TheTeamPlayers;