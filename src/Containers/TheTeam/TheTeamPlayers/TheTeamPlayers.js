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
import { getFirebaseDataHandler, playerSeperator } from '../../../Components/misc/helpers';

import classes from './TheTeamPlayers.module.css';

class TheTeamPlayers extends Component {

    state = {
        players: null,
        goalkeepers: null,
        defender: null,
        midfielders: null,
        forwards: null,
        loading: true
    }

    componentDidMount() {
        firebasePlayers
            .once('value')
            .then(snapshot => {
                console.log(snapshot.val())
                const players = getFirebaseDataHandler(snapshot.val());
                const goalkeepers = playerSeperator(players, 'GK')
                const defenders = playerSeperator(players, 'DF')
                const midfielders = playerSeperator(players, 'MD')
                const forwards = playerSeperator(players, 'FD')
                this.setState({
                    players,
                    goalkeepers,
                    defenders,
                    midfielders,
                    forwards,
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
                    paddingBottom: '25px'
                }}>
                    <SectionBar
                        sectionName={'Goalkeepers'}
                        style={{
                            margin: '0 0 15px 0',
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            borderBottom: '2px solid #E8EAEC'
                        }} />
                    {this.state.goalkeepers.map((player, i) => (
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
                                <Avatar src={player.imageURL} style={{ width: '75px', height: '75px', marginRight: '10px' }} />
                                <Typography variant="h6" gutterBottom>
                                    {player.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <SectionBar
                        sectionName={'Defenders'}
                        style={{
                            margin: '15px 0',
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            border: '2px solid #E8EAEC'
                        }} />
                    {this.state.defenders.map((player, i) => (
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
                                <Avatar src={player.imageURL} style={{ width: '75px', height: '75px', marginRight: '10px' }} />
                                <Typography variant="h6" gutterBottom>
                                    {player.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <SectionBar
                        sectionName={'Midfielders'}
                        style={{
                            margin: '15px 0',
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            border: '2px solid #E8EAEC'
                        }} />
                    {this.state.midfielders.map((player, i) => (
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
                                <Avatar src={player.imageURL} style={{ width: '75px', height: '75px', marginRight: '10px' }} />
                                <Typography variant="h6" gutterBottom>
                                    {player.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <SectionBar
                        sectionName={'Forwards'}
                        style={{
                            margin: '15px 0',
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            border: '2px solid #E8EAEC'
                        }} />
                    {this.state.forwards.map((player, i) => (
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
                                <Avatar src={player.imageURL} style={{ width: '75px', height: '75px', marginRight: '10px' }} />
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
                {players}
            </div>
        );
    }
}

export default TheTeamPlayers;