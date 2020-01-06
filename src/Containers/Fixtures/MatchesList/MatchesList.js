import React, { Component } from 'react';

import Modal from '../../../Components/UI/Modal/Modal';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

import { firebaseMatches } from '../../../Firebase';
import { getFirebaseDataHandler, matchCompetitionSeperator } from '../../../Components/misc/helpers'

const styles = {
    TableCell: {
        borderBottom: 'none',
        fontSize: '15px',
        textAlign: 'center'
    },
    MiddleCell: {
        padding: '4px 0px',
        borderBottom: 'none',
        fontSize: '14px',
        textAlign: 'center'
    },
    RowContainer: {
        color: '#666666',
        height: '70px',
        backgroundColor: '#F6F9FB',
        borderTop: '1px solid #E8EAEC',
        borderBottom: '1px solid #E8EAEC',
        '&:hover': {
            backgroundColor: 'rgba(255, 211, 6, 0.3)'
        },
    },
    TeamCell: {
        fontWeight: '600',
        borderBottom: 'none',
        fontSize: '15px',
        textAlign: 'center'
    },
    ModalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    MatchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    MatchHeader: {
        color: '#083512',
        letterSpacing: '1px'
    },
    Left: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '49%'
    },
    Center: {
        width: '2%',
        textAlign: 'center'
    },
    Right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '49%'
    },
    InfoItem: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '14px'
    },
    TeamItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 10px'
    },
    TeamInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    InfoBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 10px'
    },
    Block: {
        display: 'block',
        height: '50%'
    },
    Header: {
        textTransform: 'uppercase',
        fontSize: '17px',
        color: '#083512',
        fontWeight: '600',
        letterSpacing: '1px'
    },
    TeamHeader: {
        textTransform: 'uppercase',
        fontSize: '17px',
        color: '#083512',
        fontWeight: '600'
    },
    TeamName: {
        marginRight: '5px',
        fontSize: '14px',
        fontWeight: '500'
    },
    TeamResult: {
        marginLeft: '5px',
        fontSize: '14px',
        fontWeight: '500'
    },
    NoFixtureMessage: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '10px 0',
        marginTop: '25px',
        fontSize: '20px'
    }
};

class MatchesList extends Component {

    state = {
        matches: this.props.matches,
        moreMatchInfo: null,
        showMessage: this.props.message,
        showBackdrop: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.matches !== prevState.matches) {
            this.setState({
                matches: this.props.matches,
                showMessage: this.props.message
            })
        }
    }

    toggleBackdropHandler = (value, matchId) => {
        this.setState({
            showBackdrop: value
        })
        this.state.matches.map(match => {
            if (match.id === matchId) {
                this.setState({ moreMatchInfo: match })
            }
        })
    }

    render() {
        let modal = null;
        let fixtures = null;
        if (this.state.matches) {
            fixtures = (
                this.state.matches.map((fixture, i) => (
                    <TableRow style={styles.RowContainer} key={i}>
                        <TableCell style={styles.TableCell}>{fixture.dateShow}</TableCell>
                        <TableCell style={styles.TeamCell}>{fixture.home}</TableCell>
                        <TableCell style={styles.MiddleCell}>-</TableCell>
                        <TableCell style={styles.TeamCell}>{fixture.away}</TableCell>
                        <TableCell style={styles.TableCell}>
                            <Button
                                onClick={() => this.toggleBackdropHandler(true, fixture.id)}
                                add={{
                                    background: '#ffffff',
                                    padding: '5px 9px',
                                    borderRadius: '3px',
                                    fontSize: '16px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}>More</Button>
                        </TableCell>
                    </TableRow>
                ))
            )
        }

        if (this.state.moreMatchInfo) {
            const match = this.state.moreMatchInfo
            modal = (
                <Modal
                    add={{ top: '50%' }}
                    show={this.state.showBackdrop}
                    click={value => this.toggleBackdropHandler(false)}
                    cancelModal={value => this.toggleBackdropHandler(false)}>
                    <div style={styles.ModalContainer}>
                        <h3 style={styles.MatchHeader}>{match.fixture} - {match.stage}</h3>
                        <div style={styles.MatchContainer}>
                            <div style={styles.Left}>
                                <div style={styles.InfoItem}>
                                    <div style={styles.InfoBlock}>
                                        <span style={styles.Header}>Date</span>
                                        <span>{match.dateShow}</span>
                                    </div>
                                    <div style={styles.InfoBlock}>
                                        <span style={styles.Header}>Venue</span>
                                        <span>{match.stadium}</span>
                                    </div>
                                </div>
                                <div style={styles.TeamItem}>
                                    <span style={styles.TeamHeader}>Home</span>
                                    <div style={styles.TeamInfo}>
                                        <span style={styles.TeamName}>{match.home}</span>
                                        <span style={styles.TeamResult}>{match.resultHome}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={styles.Center}>
                                <span style={styles.Block}></span>
                                <span>-</span>
                            </div>
                            <div style={styles.Right}>
                                <div style={styles.TeamItem}>
                                    <span style={styles.TeamHeader}>Away</span>
                                    <div style={styles.TeamInfo}>
                                        <span style={styles.TeamName}>{match.away}</span>
                                        <span style={styles.TeamResult}>{match.resultAway}</span>
                                    </div>
                                </div>
                                <div style={styles.InfoItem}>
                                    <div style={styles.InfoBlock}>
                                        <span style={styles.Header}>Referee</span>
                                        <span>{match.referee}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
        }
        return (
            <div>
                {modal}
                <div>
                    {this.state.showMessage ? <div style={styles.NoFixtureMessage}>Sorry, there are no fixtures to show!</div> : null}
                </div>
                <Table>
                    <TableBody>
                        {fixtures}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

// MatchesList.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(MatchesList)
