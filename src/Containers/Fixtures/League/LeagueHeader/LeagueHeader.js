import React, { Component } from 'react';

import classes from './LeagueHeader.module.css';
import Button from '../../../../Components/UI/Button/Button';
import Aux from '../../../../HOC/Auxillary/Auxillary';
import MatchesList from '../../MatchesList/MatchesList';

import { firebaseMatches } from '../../../../Firebase';
import { getFirebaseDataHandler, matchCompetitionSeperator, fixtureSeperator } from '../../../../Components/misc/helpers'

const styles = {
    InactiveButton: {
        background: '#ffffff',
        padding: '5px 9px',
        borderRadius: '3px',
        fontSize: '13px',
        marginRight: '5px',
        cursor: 'pointer',
        border: 'none',
        outline: 'none'
    },
    
    ActiveButton: {
        background: '#259C41',
        color: '#fff',
        padding: '5px 9px',
        borderRadius: '3px',
        fontSize: '13px',
        marginRight: '5px',
        cursor: 'pointer',
        border: 'none',
        outline: 'none'
    }
}
class LeagueHeader extends Component {

    state = {
        leagueMatches: null,
        showMatches: null,
        showPlayed: 'all',
        showResult: 'all'
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

    fixturePlayedSeperatorHandler = (fixtures, seperator) => {
        const updatedFixtures = fixtureSeperator(fixtures, seperator);
        this.setState({
            showMatches: updatedFixtures,
            showPlayed: seperator,
            showResult: 'all'
        })
    }

    fixtureResultSeperatorHandler = (fixtures, seperator) => {
        const updatedFixtures = fixtureSeperator(fixtures, seperator);
        this.setState({
            showMatches: updatedFixtures,
            showPlayed: 'all',
            showResult: seperator
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
                                click={() => this.fixturePlayedSeperatorHandler(this.state.leagueMatches, 'all')}
                                add={this.state.showPlayed === 'all' ? styles.ActiveButton : styles.InactiveButton}>All</Button>
                            <Button
                                click={() => this.fixturePlayedSeperatorHandler(this.state.leagueMatches, 'played')}
                                add={this.state.showPlayed === 'played' ? styles.ActiveButton : styles.InactiveButton}>Played</Button>
                            <Button
                                click={() => this.fixturePlayedSeperatorHandler(this.state.leagueMatches, 'not played')}
                                add={this.state.showPlayed === 'not played' ? styles.ActiveButton : styles.InactiveButton}>Not Played</Button>
                        </div>
                    </div>
                    <div className={classes.Right_Grouping}>
                        <span>Fixture Results</span>
                        <div className={classes.Buttons}>
                            <Button
                                click={() => this.fixtureResultSeperatorHandler(this.state.leagueMatches, 'all')}
                                add={this.state.showResult === 'all' ? styles.ActiveButton : styles.InactiveButton}>All</Button>
                            <Button 
                                click={() => this.fixtureResultSeperatorHandler(this.state.leagueMatches, 'w')}
                                add={this.state.showResult === 'w' ? styles.ActiveButton : styles.InactiveButton}>W</Button>
                            <Button 
                                click={() => this.fixtureResultSeperatorHandler(this.state.leagueMatches, 'l')}
                                add={this.state.showResult === 'l' ? styles.ActiveButton : styles.InactiveButton}>L</Button>
                            <Button 
                                click={() => this.fixtureResultSeperatorHandler(this.state.leagueMatches, 'd')}
                                add={this.state.showResult === 'd' ? styles.ActiveButton : styles.InactiveButton}>D</Button>
                        </div>
                    </div>
                </div>
                {leagueMatches}
            </Aux>
        );
    }
}

export default LeagueHeader;