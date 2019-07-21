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
import Modal from '../../../Components/UI/Modal/Modal';
import Tag from '../../../Components/UI/Tag/Tag';
import Aux from '../../../HOC/Auxillary/Auxillary';

import classes from './TheTeamPlayers.module.css';

class TheTeamPlayers extends Component {

    state = {
        players: null,
        goalkeepers: null,
        defender: null,
        midfielders: null,
        forwards: null,
        loading: true,
        selectPlayer: null,
        selectPlayerSuccess: false,
        modalLoading: false,
        showBackdrop: false,
        value: 0
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

    toggleBackdropHandler = (value, playerId) => {
        this.setState({
            showBackdrop: value
        })
        this.state.players.map(player => {
            if (player.id === playerId) {
                this.setState({ selectPlayer: player })
            }
        })
    }

    changePlayersHandler = (event, newPlayers) => {
        this.setState({
            value: newPlayers
        })
        console.log(newPlayers)
    }

    render() {
        let players = null;
        let goalkeepers = null;
        let defenders = null;
        let midfielders = null;
        let forwards = null;
        let modal = null;

        if (this.state.loading) {
            players = (
                <Spinner
                    height="150px"
                    width="150px"
                    marginTop="100px" />
            )
        } else {
            goalkeepers = (
                <Aux>
                    {
                        this.state.goalkeepers.map((player, i) => (
                            <Card
                                onClick={() => this.toggleBackdropHandler(true, player.id)}
                                className={classes.Card}
                                key={i}
                                style={{
                                    width: '20%',
                                    margin: '25px',
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
                        ))
                    }
                </Aux>
            )
            defenders = (
                <Aux>
                    {
                        this.state.defenders.map((player, i) => (
                            <Card
                                className={classes.Card}
                                onClick={() => this.toggleBackdropHandler(true, player.id)}
                                key={i}
                                style={{
                                    width: '20%',
                                    margin: '25px'
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
                        ))
                    }
                </Aux>
            )
            midfielders = (
                <Aux>
                    {
                        this.state.midfielders.map((player, i) => (
                            <Card
                                className={classes.Card}
                                onClick={() => this.toggleBackdropHandler(true, player.id)}
                                key={i}
                                style={{
                                    width: '20%',
                                    margin: '25px'
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
                        ))
                    }
                </Aux>
            )
            forwards = (
                <Aux>
                    {
                        this.state.forwards.map((player, i) => (
                            <Card
                                className={classes.Card}
                                onClick={() => this.toggleBackdropHandler(true, player.id)}
                                key={i}
                                style={{
                                    width: '20%',
                                    margin: '25px'
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
                        ))
                    }
                </Aux>
            )
            players = (
                <Aux>
                    <SectionBar
                        sectionName={'Goalkeepers'}
                        onClick={() => console.log('clicked')}
                        style={{
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            borderBottom: '2px solid #E8EAEC'
                        }} />
                    {goalkeepers}
                    <SectionBar
                        sectionName={'Defenders'}
                        style={{
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            border: '2px solid #E8EAEC'
                        }} />
                    {defenders}
                    <SectionBar
                        sectionName={'Midfielders'}
                        style={{
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            border: '2px solid #E8EAEC'
                        }} />
                    {midfielders}
                    <SectionBar
                        sectionName={'Forwards'}
                        style={{
                            width: '100%',
                            backgroundColor: '#F9FAFB',
                            padding: '15px 40px',
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            color: '#747D8D',
                            border: '2px solid #E8EAEC'
                        }} />
                    {forwards}
                </Aux>
            )
        }
        if (!this.state.selectPlayer) {
            modal = null
        } else {
            modal = (
                <Modal
                    show={this.state.showBackdrop}
                    click={value => this.toggleBackdropHandler(false)}
                    cancelModal={value => this.toggleBackdropHandler(false)}>
                    <div>
                        {
                            <div className={classes.Modal}>
                                <img
                                    className={classes.ModalImage}
                                    src={this.state.selectPlayer.imageURL} />
                                <div className={classes.Tags}>
                                    <Tag
                                        background='#259C41'
                                        color='white'
                                        size='15px'
                                        add={{ width: 'fit-content' }}
                                    >
                                        Player Profile</Tag>
                                    <Tag
                                        background='#083412'
                                        color='white'
                                        size='25px'
                                        add={{ width: 'fit-content' }}
                                    >
                                        {this.state.selectPlayer.name}</Tag>
                                    <div className={classes.Info}>
                                        <div className={classes.InfoBlock}>
                                            <span className={classes.InfoHeader}>Age</span>
                                            <span>25</span>
                                        </div>
                                        <div className={classes.InfoBlock}>
                                            <span className={classes.InfoHeader}>Club</span>
                                            <span>{this.state.selectPlayer.club}</span>
                                        </div>
                                        <div className={classes.InfoBlock}>
                                            <span className={classes.InfoHeader}>Position</span>
                                            <span>{this.state.selectPlayer.position}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </Modal>
            )
        }
        return (
            <div className={classes.Container}>
                <AppBar position="static" style={{ backgroundColor: '#083412', color: 'white' }}>
                    <Tabs
                        className={classes.Text}
                        indicatorColor="secondary"
                        variant="fullWidth"
                        value={this.state.value}
                        onChange={this.changePlayersHandler}
                    >
                        <Tab style={{ fontSize: '15px' }} label="Full Team" value={0} />
                        <Tab style={{ fontSize: '15px' }} label="Goalkeepers" value={1} />
                        <Tab style={{ fontSize: '15px' }} label="Defenders" value={2} />
                        <Tab style={{ fontSize: '15px' }} label="Midfielders" value={3} />
                        <Tab style={{ fontSize: '15px' }} label="Forwards" value={4} />
                    </Tabs>
                </AppBar>
                {modal}
                <Paper style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'flex-start',
                    //paddingBottom: '25px'
                }}>
                    {this.state.value === 0 && players}
                    {this.state.value === 1 && goalkeepers}
                    {this.state.value === 2 && defenders}
                    {this.state.value === 3 && midfielders}
                    {this.state.value === 4 && forwards}
                </Paper>
            </div>
        );
    }
}

export default TheTeamPlayers;