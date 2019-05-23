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
                element: 'input',
                value: '',
                config: {
                    name: 'club_input',
                    type: 'text',
                    label: 'Club',
                    required: true
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

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormdata = { ...this.state.formdata }

        for (let key in newFormdata) {
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormdata
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

                    firebase
                        .storage()
                        .ref('players')
                        .child(playerData.image)
                        .getDownloadURL()
                        .then(url => {
                            this.updateFields(playerData, playerId, 'Edit player', url)
                        }).catch(e => {
                            this.updateFields({
                                ...playerData,
                                image: ''
                            }, playerId, 'Edit player', '')
                        })
                })
        }

    }


    updateForm(element, content = '') {
        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }

        let validData = validationHandler(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }


    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)

    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
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

    resetImage = () => {
        const newFormdata = { ...this.state.formdata }
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;

        this.setState({
            defaultImg: '',
            formdata: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename)
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
                            resetImage={() => this.resetImage()}
                            filename={(filename) => this.storeFilename(filename)} />

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
                            id={'name'}
                            formData={this.state.formData.name}
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
                            id={'position'}
                            formData={this.state.formData.position}
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
                            id={'club'}
                            formData={this.state.formData.club}
                            change={input => this.inputChangeHandler(input)} />
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
                    </form>
                </div>
            </DashboardLayout>
        );
    }
}

export default EditMatches;