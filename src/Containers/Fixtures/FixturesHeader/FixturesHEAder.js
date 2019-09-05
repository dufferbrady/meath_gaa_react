import React, { Component } from 'react';

import classes from './FixturesHeader.module.css';
import Button from '../../../Components/UI/Button/Button';
import Aux from '../../../HOC/Auxillary/Auxillary';
import MatchesList from '../MatchesList/MatchesList';

import { firebaseMatches } from '../../../Firebase';
import { getFirebaseDataHandler, matchCompetitionSeperator, fixtureSeperator } from '../../../Components/misc/helpers'

class FixturesHeader extends Component {

    state = {
        leagueMatches: null,
        showMatches: null
    }

    componentDidMount() {
        firebaseMatches
            .once('value')
            .then(snapshot => {
                const matches = getFirebaseDataHandler(snapshot.val());
                const leagueMatches = matchCompetitionSeperator(matches, 'Allianz Football League')
                this.setState({
                    leagueMatches,
                    showMatches: leagueMatches
                })
            })
    }

    fixtureSeperatorHandler = (fixtures, seperator) => {
        const updatedFixtures = fixtureSeperator(fixtures, seperator);
        this.setState({
            showMatches: updatedFixtures
        })
    }

    render() {
        let leagueMatches = null
        if (this.state.showMatches && this.state.showMatches.length) {
            leagueMatches = (
                <MatchesList 
                matches={this.state.showMatches} 
                message={false}/>
            )
        } else {
            leagueMatches = (
                <MatchesList 
                matches={null} 
                message={true}/>
            )
        }
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Left_Grouping}>
                        <span>Show Fixtures</span>
                        <div className={classes.Buttons}>
                            <Button
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'all')}
                                add={{
                                    background: '#ffffff',
                                    padding: '5px 9px',
                                    borderRadius: '3px',
                                    fontSize: '13px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}>All</Button>
                            <Button
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'played')}
                                add={{
                                    background: '#ffffff',
                                    padding: '5px 9px',
                                    borderRadius: '3px',
                                    fontSize: '13px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}>Played</Button>
                            <Button
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'not played')}
                                add={{
                                    background: '#ffffff',
                                    padding: '5px 9px',
                                    borderRadius: '3px',
                                    fontSize: '13px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}>Not Played</Button>
                        </div>
                    </div>
                    <div className={classes.Right_Grouping}>
                        <span>Fixture Results</span>
                        <div className={classes.Buttons}>
                            <Button
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'all')}
                                add={{
                                    background: '#ffffff',
                                    padding: '5px 9px',
                                    borderRadius: '3px',
                                    fontSize: '13px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}>All</Button>
                            <Button 
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'w')}
                                add={{
                                background: '#ffffff',
                                padding: '5px 9px',
                                borderRadius: '3px',
                                fontSize: '13px',
                                marginRight: '5px',
                                cursor: 'pointer',
                                border: 'none',
                                outline: 'none'
                            }}>W</Button>
                            <Button 
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'l')}
                                add={{
                                background: '#ffffff',
                                padding: '5px 9px',
                                borderRadius: '3px',
                                fontSize: '13px',
                                marginRight: '5px',
                                cursor: 'pointer',
                                border: 'none',
                                outline: 'none'
                            }}>L</Button>
                            <Button 
                                click={() => this.fixtureSeperatorHandler(this.state.leagueMatches, 'd')}
                                add={{
                                background: '#ffffff',
                                padding: '5px 9px',
                                borderRadius: '3px',
                                fontSize: '13px',
                                marginRight: '5px',
                                cursor: 'pointer',
                                border: 'none',
                                outline: 'none'
                            }}>D</Button>
                        </div>
                    </div>
                </div>
                {leagueMatches}
            </Aux>
        );
    }
}

export default FixturesHeader;