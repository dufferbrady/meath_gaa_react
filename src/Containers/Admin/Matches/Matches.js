import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
                    marginTop="100px"/>
            )
        } else {
            matches = (
                <Paper style={{ margin: '50px' }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ padding: '5px 0' }}>
                                <TableCell>Date</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Competition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.matches.map(match => (
                                <TableRow style={{ height: '60px' }} key={match.id}>
                                    <TableCell>{match.date}</TableCell>
                                    <TableCell>{match.home} <strong>-</strong> {match.away}</TableCell>
                                    <TableCell>{match.resultHome} <strong>-</strong> {match.resultAway}</TableCell>
                                    <TableCell>{match.fixture}</TableCell>
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