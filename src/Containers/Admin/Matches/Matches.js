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
import { firebaseMatches } from '../../../Firebase';
import { getFirebaseDataHandler } from '../../../Components/misc/helpers'

class Matches extends Component {

    state = {
        matches: null,
        loading: true
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
            const matches = getFirebaseDataHandler(snapshot.val());
            this.setState({
                matches,
                loading: false
            })
            console.log(this.state.matches)
        })
    }

    render() {
        let matches = null;
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
                {matches}
            </DashboardLayout>
        );
    }
}

export default Matches;