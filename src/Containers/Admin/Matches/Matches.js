import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import Modal from '../../../Components/UI/Modal/Modal'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout';
import { firebaseDB, firebaseMatches } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers'
import classes from './Matches.module.css'

class Matches extends Component {

    state = {
        matches: null,
        deleteMatch: null,
        deleteMatchSuccess: false,
        loading: true,
        modalLoading: false,
        showBackdrop: false
    }

    componentDidMount() {
        firebaseMatches
            .once('value')
            .then(snapshot => {
                const matches = getFirebaseDataHandler(snapshot.val());
                this.setState({
                    matches,
                    loading: false
                })
            })
    }

    toggleBackdropHandler = (value, matchId) => {
        this.setState({
            showBackdrop: value
        })
        this.state.matches.map(match => {
            if (match.id === matchId) {
                this.setState({ deleteMatch: match })
            }
        })
    }

    deleteMatchHandler = match => {
        firebaseDB
            .ref(`matches/${match.id}`)
            .remove()
            .then(() => {
                this.setState({
                    modalLoading: true,
                    deleteMatchSuccess: true
                })
            })
        setTimeout(() => this.setState({ modalLoading: false }), 1000);
        setTimeout(() => this.props.history.push('/admin_matches'), 2000);
    }

    render() {
        let matches = null;
        let modal = null;
        if (this.state.loading) {
            matches = (
                <Spinner
                    height="150px"
                    width="150px"
                    marginTop="100px" />
            )
        } else {
            matches = (
                <Paper style={{
                    margin: '25px'
                }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{
                                padding: '5px 0',
                                fontFamily: 'Poppins'

                            }}>
                                <TableCell style={{ fontSize: '1.5rem' }}>Date</TableCell>
                                <TableCell style={{ fontSize: '1.5rem' }}>Match</TableCell>
                                <TableCell style={{ fontSize: '1.5rem' }}>Result</TableCell>
                                <TableCell style={{ fontSize: '1.5rem' }}>Competition</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.matches.map(match => (
                                <TableRow
                                    style={{
                                        height: '60px',
                                        fontFamily: 'Poppins',
                                        letterSpacing: '0.5px'
                                    }}
                                    key={match.id}>
                                    <TableCell>{match.date}</TableCell>
                                    <TableCell>{match.home} <strong>-</strong> {match.away}</TableCell>
                                    <TableCell>{match.resultHome} <strong>-</strong> {match.resultAway}</TableCell>
                                    <TableCell>{match.fixture}</TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
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
                                            onClick={() => this.toggleBackdropHandler(true, match.id)}
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
        if (!this.state.deleteMatch) {
            modal = null
        } else {
            modal = (
                <Modal
                    show={this.state.showBackdrop}
                    click={value => this.toggleBackdropHandler(false)}
                    cancelModal={value => this.toggleBackdropHandler(false)}>
                    <div className={classes.Modal_Text}>
                        {
                            !this.state.deleteMatchSuccess ?
                                <div>
                                    <span>Are you sure you want to delete the match between <strong>{this.state.deleteMatch.home}</strong> and <strong>{this.state.deleteMatch.away}</strong>?</span>
                                    <div className={classes.Buttons}>
                                        <Button
                                            onClick={match => this.deleteMatchHandler(this.state.deleteMatch)}
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
            <DashboardLayout>
                {matches}
                {modal}
            </DashboardLayout>
        );
    }
}

export default Matches;