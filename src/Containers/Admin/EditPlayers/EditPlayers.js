import React, { Component } from 'react';

import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout'
import classes from './EditPlayers.module.css'
import Formfield from '../../../Components/UI/FormField/FormField'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Fileuploader from '../Fileuploader/Fileuploader'
import { validationHandler } from '../../../Components/misc/helpers'
import { firebase, firebaseDB, firebasePlayers } from '../../../Firebase'

class EditMatches extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        clubs: [],
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
            position: {
                element: 'input',
                value: '',
                config: {
                    name: 'position_input',
                    type: 'text',
                    label: 'Position',
                    required: true
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
                    options: [{ key: 'St. Peter’s, Dunboyne', value: 'St. Peter’s, Dunboyne' }]
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
            }
        }
    }

    updateFieldsHandler = (player, playerId, formType, defaultImg) => {
        const newFormdata = { ...this.state.formData }

        for (let key in newFormdata) {
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formData: newFormdata
        })
    }


    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState({
                formType: 'Add player'
            })
        } else {
            firebaseDB
                .ref(`players/${playerId}`)
                .once('value')
                .then(snapshot => {
                    const playerData = snapshot.val();
                    console.log(playerData)
                    firebase
                        .storage()
                        .ref('players')
                        .child(playerData.image)
                        .getDownloadURL()
                        .then(url => {
                            this.updateFieldsHandler(playerData, playerId, 'Edit player', url)
                        }).catch(e => {
                            this.updateFieldsHandler({
                                ...playerData,
                                image: ''
                            }, playerId, 'Edit player', '')
                        })
                })
        }

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
        console.log(validation[0], validation[1]);

        newFormData[input.id] = newFormElement;
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
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            if (this.state.formType === 'Edit player') {
                firebaseDB
                    .ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Update correctly');
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
                        this.setState({
                            formError: true
                        })
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
                            filename={(filename) => this.storeFilenameHandler(filename)} />

                        <Formfield
                            add={{
                                width: '75%',
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
                            id={'name'}
                            formData={this.state.formData.name}
                            change={input => this.updateFormHandler(input)} />

                        <Formfield
                            add={{
                                width: '75%',
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
                            id={'position'}
                            formData={this.state.formData.position}
                            change={input => this.updateFormHandler(input)} />

                        <Formfield
                            add={{
                                width: '75%',
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
                        <div>
                            {this.state.formSuccess}
                        </div>
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
                        </div>

                        <div className={classes.Error_Wrapper}>
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