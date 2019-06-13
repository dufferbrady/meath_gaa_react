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
import { firebasePlayers } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers'
import classes from './Players.module.css'

class Players extends Component {

    state = {
        players: null,
        loading: true
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
                                        alt={`${player.name}`}/>
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

        return (
            <DashboardLayout>
                {players}
            </DashboardLayout>
        );
    }
}

export default Players;