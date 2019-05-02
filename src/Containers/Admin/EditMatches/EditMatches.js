import React, { Component } from 'react';

import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout'
import Formfield from '../../../Components/UI/FormField/FormField'

import classes from './EditMatches.module.css'

class EditMatches extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    name: 'date_input',
                    type: 'date',
                    label: 'Match Date'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            fixture: {
                element: 'input',
                value: '',
                config: {
                    name: 'fixture_input',
                    type: 'text',
                    label: 'Match Competition'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            home: {
                element: 'select',
                value: '',
                config: {
                    name: 'home_input',
                    type: 'select',
                    label: 'Home Team',
                    options: [
                        { key: 'Please Select a Club', value: '' }
                    ]
                },
                showLabel: false,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            resultHome: {
                element: 'input',
                value: '',
                config: {
                    name: 'home_result_input',
                    type: 'text',
                    label: 'Home Score'
                },
                showLabel: false,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    name: 'away_input',
                    type: 'select',
                    label: 'Away Team',
                    options: [
                        { key: 'Please Select a Club', value: '' }
                    ]
                },
                showLabel: false,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    name: 'away_result_input',
                    type: 'text',
                    label: 'Away Score'
                },
                showLabel: false,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    name: 'referee_input',
                    type: 'text',
                    label: 'Referee'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    name: 'stadium_input',
                    type: 'text',
                    label: 'Stadium'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
        }
    }

    submitFormHandler(event) {
        event.preventDefault()
    }

    render() {
        return (
            <DashboardLayout>
                <div className={classes.Container}>
                    <form onSubmit={event => this.submitFormHandler(event)}>
                        <Formfield
                            add={{
                                width: '50%',
                                padding: '15px 10px',
                                borderRadius: '4px',
                                border: 'transparent',
                                marginBottom: '5vh',
                                boxSizing: 'border-box'
                            }}
                            label={{
                                background: '#259C41',
                                color: '#FED206',
                                fontSize: '1.5rem',
                                padding: '5px 10px',
                                marginBottom: '20px'
                            }}
                            id={'date'}
                            formData={this.state.formData.date} />
                        <Formfield
                            add={{
                                width: '100%',
                                padding: '15px 10px',
                                borderRadius: '4px',
                                border: 'transparent',
                                marginBottom: '5vh',
                                boxSizing: 'border-box'
                            }}
                            label={{
                                background: '#259C41',
                                color: '#FED206',
                                fontSize: '1.5rem',
                                padding: '5px 10px',
                                marginBottom: '20px'
                            }}
                            id={'event'}
                            formData={this.state.formData.fixture} />
                        <div className={classes.Home_container}>
                            <div className={classes.Home_label}>Home Team</div>
                            <div className={classes.Home_wrapper}>
                                <div className={classes.Left}>
                                    <Formfield
                                        add={{
                                            width: '100%',
                                            padding: '15px 10px',
                                            borderRadius: '4px',
                                            border: 'transparent',
                                            marginBottom: '5vh',
                                            boxSizing: 'border-box'
                                        }}
                                        id={'home'}
                                        formData={this.state.formData.home} />
                                </div>
                                <div>
                                    <Formfield
                                        add={{
                                            width: '80px',
                                            padding: '15px 10px',
                                            borderRadius: '4px',
                                            border: 'transparent',
                                            marginBottom: '2.5vh',
                                            boxSizing: 'border-box'
                                        }}
                                        id={'resultHome'}
                                        formData={this.state.formData.resultHome} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.Away_container}>
                            <div className={classes.Away_label}>Away Team</div>
                            <div className={classes.Away_wrapper}>
                                <div className={classes.Left}>
                                    <Formfield
                                        add={{
                                            width: '100%',
                                            padding: '15px 10px',
                                            borderRadius: '4px',
                                            border: 'transparent',
                                            marginBottom: '5vh',
                                            boxSizing: 'border-box'
                                        }}
                                        id={'away'}
                                        formData={this.state.formData.away} />
                                </div>
                                <div>
                                    <Formfield
                                        add={{
                                            width: '80px',
                                            padding: '15px 10px',
                                            borderRadius: '4px',
                                            border: 'transparent',
                                            marginBottom: '2.5vh',
                                            boxSizing: 'border-box'
                                        }}
                                        id={'resultAway'}
                                        formData={this.state.formData.resultAway} />
                                </div>
                            </div>
                        </div>
                        <Formfield
                            add={{
                                width: '50%',
                                padding: '15px 10px',
                                borderRadius: '4px',
                                border: 'transparent',
                                marginBottom: '5vh',
                                boxSizing: 'border-box'
                            }}
                            label={{
                                background: '#259C41',
                                color: '#FED206',
                                fontSize: '1.5rem',
                                padding: '5px 10px',
                                marginBottom: '20px'
                            }}
                            id={'referee'}
                            formData={this.state.formData.referee} />
                        <Formfield
                            add={{
                                width: '50%',
                                padding: '15px 10px',
                                borderRadius: '4px',
                                border: 'transparent',
                                marginBottom: '5vh',
                                boxSizing: 'border-box'
                            }}
                            label={{
                                background: '#259C41',
                                color: '#FED206',
                                fontSize: '1.5rem',
                                padding: '5px 10px',
                                marginBottom: '20px'
                            }}
                            id={'stadium'}
                            formData={this.state.formData.stadium} />
                    </form>
                </div>
            </DashboardLayout>
        );
    }
}

export default EditMatches;