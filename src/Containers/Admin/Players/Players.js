import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import Spinner from '../../../Components/UI/Spinner/Spinner'
import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout';
import { firebaseDB, firebasePlayers } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers'
import Modal from '../../../Components/UI/Modal/Modal'
import Aux from '../../../HOC/Auxillary/Auxillary'
import classes from './Players.module.css'

class Players extends Component {

    state = {
        players: null,
        deletePlayer: null,
        deletePlayerSuccess: false,
        loading: true,
        modalLoading: false,
        showBackdrop: false
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            const players = getFirebaseDataHandler(snapshot.val());
            this.setState({
                players,
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
                this.setState({ deletePlayer: player })
            }
        })
    }

    deletePlayerHandler = player => {
        firebaseDB
            .ref(`players/${player.id}`)
            .remove()
            .then(() => {
                this.setState({
                    modalLoading: true,
                    deletePlayerSuccess: true
                })
            })
        setTimeout(() => this.setState({modalLoading: false}), 1000);
        setTimeout(() => this.props.history.push('/admin_players'), 2000);
    }

    render() {
        let players = null;
        let modal = null;
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
                    margin: '25px'
                }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{
                                padding: '5px 0',
                                fontFamily: 'Poppins'

                            }}>
                                <TableCell style={{ fontSize: '1.5rem' }}>Name</TableCell>
                                <TableCell style={{ fontSize: '1.5rem' }}>Position</TableCell>
                                <TableCell style={{ fontSize: '1.5rem' }}>Club</TableCell>
                                <TableCell style={{ fontSize: '1.5rem' }}>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.players.map(player => (
                                <TableRow
                                    style={{
                                        height: '60px',
                                        fontFamily: 'Poppins',
                                        letterSpacing: '0.5px'
                                    }}
                                    key={player.id}>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell>{player.club}</TableCell>
                                    <TableCell>
                                        <img
                                            className={classes.PlayerImage}
                                            src={`${player.imageURL}`}
                                            alt={`${player.name}`} />
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    background: '#FFD306',
                                                    color: 'white',
                                                    marginRight: '10px'
                                                }}>
                                                Edit</Button>
                                        </Link>
                                        <Button
                                            onClick={() => this.toggleBackdropHandler(true, player.id)}
                                            variant="contained"
                                            style={{
                                                background: '#DF4554',
                                                color: 'white',
                                                marginLeft: '10px'
                                            }}>
                                            Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )
        }
        if (!this.state.deletePlayer) {
            modal = null
        } else {
            modal = (
                <Modal
                    show={this.state.showBackdrop}
                    click={value => this.toggleBackdropHandler(false)}
                    cancelModal={value => this.toggleBackdropHandler(false)}>
                    <div className={classes.Modal_Text}>
                        {
                            !this.state.deletePlayerSuccess ?
                                <div>
                                    <span>Are you sure you want to delete {this.state.deletePlayer.name}?</span>
                                    <div className={classes.Buttons}>
                                        <Button
                                            onClick={player => this.deletePlayerHandler(this.state.deletePlayer)}
                                            variant="contained"
                                            style={{
                                                background: '#DF4554',
                                                color: 'white',
                                                marginRight: '10px'
                                            }}>
                                            Delete</Button>
                                        <Button
                                            onClick={value => this.toggleBackdropHandler(false)}
                                            variant="contained"
                                            style={{
                                                background: '#259C41',
                                                color: 'white',
                                                marginLeft: '10px'
                                            }}>
                                            Cancel</Button>
                                    </div>
                                </div>
                                :
                                <span>Successfully Deleted.</span>
                        }
                    </div>
                </Modal>
            )
        }
        return (
            <Aux>
                <DashboardLayout>
                    {modal}
                    {players}
                </DashboardLayout>
            </Aux>
        );
    }
}

export default Players;