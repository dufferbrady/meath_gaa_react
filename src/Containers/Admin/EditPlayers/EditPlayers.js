import React, { Component } from 'react';

import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout'
import classes from './EditPlayers.module.css'
import Formfield from '../../../Components/UI/FormField/FormField'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Fileuploader from '../Fileuploader/Fileuploader'
import { validationHandler } from '../../../Components/misc/helpers'
import { firebase, firebaseDB, firebasePlayers, firebaseClubTeams } from '../../../Firebase'

class EditMatches extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formIsLoading: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    label: 'Name',
                    required: true
                },
                showLabel: true,
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            },
            age: {
                element: 'input',
                value: '',
                config: {
                    name: 'age_input',
                    type: 'number',
                    label: 'Age',
                    required: true
                },
                showLabel: true,
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    name: 'position_input',
                    type: 'select',
                    label: 'Position',
                    options: [
                        { key: 'GK', value: 'Goalkeeper' },
                        { key: 'DF', value: 'Corner Back' },
                        { key: 'DF', value: 'Full Back' },
                        { key: 'DF', value: 'Wing Back' },
                        { key: 'DF', value: 'Center Back' },
                        { key: 'MD', value: 'Midfield' },
                        { key: 'FW', value: 'Wing Forward' },
                        { key: 'FW', value: 'Center Forward' },
                        { key: 'FW', value: 'Corner Forward' },
                        { key: 'FW', value: 'Full Forward' },
                    ]
                },
                showLabel: true,
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            },
            club: {
                element: 'select',
                value: '',
                config: {
                    name: 'club_input',
                    type: 'select',
                    label: 'Club',
                    options: []
                },
                showLabel: true,
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            },
            imageURL: {
                element: 'url',
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            }
        }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.getClubTeamsHandler(false, 'Add player', null)
        } else {
            firebaseDB
                .ref(`players/${playerId}`)
                .once('value')
                .then(snapshot => {
                    const player = snapshot.val();
                    firebase
                        .storage()
                        .ref('players')
                        .child(player.image)
                        .getDownloadURL()
                        .then(url => {
                            this.getClubTeamsHandler(player, 'Edit Player', playerId, url)
                        })
                })
        }
    }

    getClubTeamsHandler = (player, formType, playerId, url = '') => {
        firebaseClubTeams
            .once('value')
            .then(snapshot => {
                const teams = snapshot.val();
                let teamOptions = [];
                snapshot.forEach(childsnapshot => {
                    teamOptions.push({
                        key: childsnapshot.val().key,
                        value: childsnapshot.val().value
                    })
                });
                this.updateFieldsHandler(player, teams, teamOptions, formType, playerId, url)
                console.log(teamOptions)
            });
    }

    updateFieldsHandler = (player, teams, teamOptions, formType, playerId, defaultImg) => {
        const newFormdata = { ...this.state.formData }

        for (let key in newFormdata) {
            if (player) {
                newFormdata[key].value = player[key];
                newFormdata[key].valid = true
            }
            if (key === 'club') {
                newFormdata[key].config.options = teamOptions
            }
        }

        console.log(newFormdata)
        this.setState({
            teams,
            playerId,
            defaultImg,
            formType,
            formData: newFormdata
        })
    }


    updateFormHandler(input, content = '') {
        const newFormData = { ...this.state.formData };
        const newFormElement = { ...newFormData[input.id] };

        if (content === '') {
            newFormElement.value = input.e.target.value;
        } else {
            newFormElement.value = content
        }

        let validation = validationHandler(newFormElement);
        newFormElement.valid = validation[0];
        newFormElement.validationMessage = validation[1];

        newFormData[input.id] = newFormElement;
        console.log(this.state.formError)
        this.setState({
            formData: newFormData,
        })

    }


    successFormHandler = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)

    }

    submitFormHandler(event) {
        console.log(this.state.formError)
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            if (this.state.formType === 'Edit Player') {
                firebaseDB
                    .ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.setState({
                            formSuccess: "Player Updated Successfully",
                            // formIsLoading: false
                        });
                        setTimeout(() => this.props.history.push('/admin_players'), 2000);
                    })
                    .catch(e => {
                        this.setState({ formError: true })
                    })
            } else {
                firebasePlayers
                    .push(dataToSubmit)
                    .then(() => {
                        console.log(dataToSubmit)
                        this.props.history.push('/admin_players')
                    })
                    .catch(e => {
                        this.setState({ formError: true })
                    })
            }

        } else {
            this.setState({
                formError: true
            })
        }
    }

    resetImageHandler = () => {
        const newFormdata = { ...this.state.formData }
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;

        this.setState({
            defaultImg: '',
            formData: newFormdata
        })
    }

    storeFilenameHandler = (filename) => {
        this.updateFormHandler({ id: 'image' }, filename)
    }

    storeFileURLHandler = url => {
        this.updateFormHandler({ id: 'imageURL' }, url)
    }

    render() {
        return (
            <DashboardLayout>
                <div className={classes.Container}>
                    <form onSubmit={event => this.submitFormHandler(event)}>
                        <h2 className={classes.Header}>{this.state.formType}</h2>

                        <Fileuploader
                            dir="players"
                            tag={"Player image"}
                            defaultImg={this.state.defaultImg}
                            defaultImgName={this.state.formData.image.value}
                            resetImage={() => this.resetImageHandler()}
                            filename={(filename) => this.storeFilenameHandler(filename)}
                            fileURL={(url) => this.storeFileURLHandler(url)} />

                        <div className={classes.InfoBlock_1}>
                            <Formfield formStyle={{marginRight: '10%'}}
                                add={{
                                    flexGrow: '50%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginBottom: '5vh',
                                    boxSizing: 'border-box',
                                                             
                                }}
                                label={{
                                    background: '#259C41',
                                    color: '#FED206',
                                    fontSize: '1.5rem',
                                    padding: '5px 10px',
                                    marginBottom: '20px'
                                }}
                                id={'name'}
                                formData={this.state.formData.name}
                                change={input => this.updateFormHandler(input)} />
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
                                id={'age'}
                                formData={this.state.formData.age}
                                change={input => this.updateFormHandler(input)} />
                        </div>

                        <Formfield
                            add={{
                                width: '100%',
                                padding: '15px 10px',
                                borderRadius: '4px',
                                border: 'transparent',
                                marginBottom: '5vh',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }}
                            label={{
                                background: '#259C41',
                                color: '#FED206',
                                fontSize: '1.5rem',
                                padding: '5px 10px',
                                marginBottom: '20px',
                                width: 'fit-content'
                            }}
                            id={'position'}
                            formData={this.state.formData.position}
                            change={input => this.updateFormHandler(input)} />

                        <Formfield
                            add={{
                                width: '100%',
                                padding: '15px 10px',
                                borderRadius: '4px',
                                border: 'transparent',
                                marginBottom: '5vh',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }}
                            label={{
                                background: '#259C41',
                                color: '#FED206',
                                fontSize: '1.5rem',
                                padding: '5px 10px',
                                marginBottom: '20px',
                                width: 'fit-content'
                            }}
                            id={'club'}
                            formData={this.state.formData.club}
                            change={input => this.updateFormHandler(input)} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            {!this.state.formIsLoading ?
                                <button
                                    onClick={event => this.submitFormHandler(event)}
                                    className={classes.Button}>
                                    {this.state.formType}
                                </button>
                                : <Spinner height={'75px'} width={'75px'} marginLeft={'15%'} />
                            }
                        </div>;
                        <div className={classes.Message_Wrapper}>
                            <span className={classes.Success}>
                                {this.state.formSuccess}
                            </span>
                        </div>
                        <div className={classes.Message_Wrapper}>
                            {this.state.formError ?
                                <span className={classes.Error}>
                                    Whoops Looks like something went wrong :(
                                </span>
                                : ''
                            }
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        );
    }
}

export default EditMatches;