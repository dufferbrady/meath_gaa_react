import React, { Component } from 'react';

import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout'
import Formfield from '../../../Components/UI/FormField/FormField'
import { validationHandler, dateConvertor } from '../../../Components/misc/helpers'
import { firebaseDB, firebaseMatches, firebaseCountyTeams } from '../../../Firebase';
import Spinner from '../../../Components/UI/Spinner/Spinner'

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
                    label: 'Match Date',
                    required: true
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
                    label: 'Match Competition',
                    required: true
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
                    options: []
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
                    options: []
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
        },
        formIsLoading: false
    }

    componentDidMount() {
        const matchId = this.props.match.params.id;
        if (!matchId) {
            //ADD MATCH
            this.getCountyTeamsHandler(false, 'Add Match', null)
        } else {
            //EDIT MATCH
            firebaseDB.ref(`matches/${matchId}`).once('value').then(snapshot => {
                const match = snapshot.val();
                this.getCountyTeamsHandler(match, 'Edit Match', matchId)
            });
        }
    }

    getCountyTeamsHandler = (match, type, matchId) => {
        firebaseCountyTeams.once('value').then(snapshot => {
            const teams = snapshot.val();
            let teamOptions = [];
            snapshot.forEach(childsnapshot => {
                teamOptions.push({
                    key: childsnapshot.val().name,
                    value: childsnapshot.val().name
                })
            });
            this.updateFormElementsHandler(match, teams, teamOptions, type, matchId)
        });
    }

    updateFormElementsHandler = (match, teams, teamOptions, type, matchId) => {
        const newFormData = { ...this.state.formData };
        for (let key in newFormData) {
            if (match) {
                newFormData[key].value = match[key]
                newFormData[key].valid = true
            }
            if (key === 'home' || key === 'away') {
                newFormData[key].config.options = teamOptions
            }
        }
        this.setState({
            matchId,
            formType: type,
            formData: newFormData,
            teams
        })
    }

    inputChangeHandler = input => {
        this.setState({
            formError: false,
            formSuccess: ''
        })
        const newFormData = { ...this.state.formData };
        const newFormElement = { ...newFormData[input.id] };

        newFormElement.value = input.e.target.value;

        let validation = validationHandler(newFormElement);
        newFormElement.valid = validation[0];
        newFormElement.validationMessage = validation[1];
        console.log(validation[0], validation[1]);

        newFormData[input.id] = newFormElement;
        this.setState({
            formData: newFormData,
        })
        console.log(this.state.formData[input.id])
    }

    submitFormHandler(event) {
        event.preventDefault();
        this.setState({ formIsLoading: true })
        setTimeout(() => {
            const newFormData = { ...this.state.formData };
            const dateShow = dateConvertor(newFormData.date.value);

            let dataToSubmit = {};
            let formIsValid = true;
            dataToSubmit.dateShow = dateShow;
            for (let key in newFormData) {
                dataToSubmit[key] = newFormData[key].value
                formIsValid = newFormData[key].valid && formIsValid
            }
            if (formIsValid) {
                if (this.state.formType === 'Edit Match') {
                    firebaseDB.ref(`/matches/${this.state.matchId}`)
                        .update(dataToSubmit).then(() => {
                            this.setState({
                                formSuccess: "Match Updated Successfully",
                                formIsLoading: false
                            });
                            setTimeout(() => this.props.history.push('/admin_matches'), 1000);
                        }).catch(e => {
                            this.setState({
                                formError: true,
                                formIsLoading: false
                            })
                        })
                } else {
                    firebaseMatches.push(dataToSubmit).then(() => {
                        this.props.history.push('/admin_matches')
                    }).catch(e => {
                        this.setState({
                            formError: true,
                            formIsLoading: false
                        })
                    })
                }
            } else {
                this.setState({
                    formError: true,
                    formIsLoading: false
                })
            }
        }, 2000)
    }

    render() {
        return (
            <DashboardLayout>
                <div className={classes.Container}>
                    <form onSubmit={event => this.submitFormHandler(event)}>
                        <h2 className={classes.Header}>{this.state.formType}</h2>
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
                            formData={this.state.formData.date}
                            change={input => this.inputChangeHandler(input)} />
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
                            id={'fixture'}
                            formData={this.state.formData.fixture}
                            change={input => this.inputChangeHandler(input)} />
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
                                        formData={this.state.formData.home}
                                        change={input => this.inputChangeHandler(input)} />
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
                                        formData={this.state.formData.resultHome}
                                        change={input => this.inputChangeHandler(input)} />
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
                                        formData={this.state.formData.away}
                                        change={input => this.inputChangeHandler(input)} />
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
                                        formData={this.state.formData.resultAway}
                                        change={input => this.inputChangeHandler(input)} />
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
                            formData={this.state.formData.referee}
                            change={input => this.inputChangeHandler(input)} />
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
                            formData={this.state.formData.stadium}
                            change={input => this.inputChangeHandler(input)} />
                        <div style={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                        }}>
                            <div>
                                {this.state.formSuccess}
                            </div>
                            {!this.state.formIsLoading ?
                                <button
                                    onClick={event => this.submitFormHandler(event)}
                                    className={classes.Button}>
                                    {this.state.formType}
                                </button>
                                : <Spinner height={'75px'} width={'75px'} marginLeft={'15%'} />
                            }
                            <div className={classes.Error_Wrapper}>
                                {this.state.formError ?
                                    <span className={classes.Error}>
                                        Whoops Looks like something went wrong :(
                                    </span>
                                    : ''
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        );
    }
}

export default EditMatches;