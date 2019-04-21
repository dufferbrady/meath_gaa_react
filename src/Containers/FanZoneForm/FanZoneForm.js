import React, { Component } from 'react';

import classes from './FanZoneForm.module.css'
import FormField from '../../Components/UI/FormField/FormField'
import { firebaseFanzone } from '../../Firebase'
import Spinner from '../../Components/UI/Spinner/Spinner'
import {validationHandler} from '../../Components/misc/helpers'

class FanZoneForm extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formIsLoading: false,
        formData: {
            firstName: {
                element: 'input',
                value: '',
                config: {
                    name: 'firstName_input',
                    type: 'input',
                    placeholder: 'Enter your name here',
                    label: 'First Name *'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastName_input',
                    type: 'input',
                    placeholder: 'Enter your name here',
                    label: 'Last Name *'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email here',
                    label: 'Email *'
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            club: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a Club *',
                    name: 'select_club',
                    type: 'select',
                    options: [
                        { key: 'Please Select a Club', value: '' },
                        { key: 'No Meath Club Affiliation', value: 'No Meath Club Affiliation' },
                        { key: 'Ballinabrackey', value: 'Ballinabrackey' },
                        { key: 'Ballinlough', value: 'Ballinlough' },
                        { key: 'Ballivor', value: 'Ballivor' },
                        { key: 'Bective', value: 'Bective' },
                        { key: 'Blackhall Gaels', value: 'Blackhall Gaels' },
                        { key: 'Boardsmill', value: 'Boardsmill' },
                        { key: 'Carnaross', value: 'Carnaross' },
                        { key: 'Castletown', value: 'Castletown' },
                        { key: 'Clann na nGael', value: 'Clann na nGael' },
                        { key: 'Clonard', value: 'Clonard' },
                        { key: 'Cortown', value: 'Cortown' },
                        { key: 'Curraha', value: 'Curraha' },
                        { key: 'Donaghmore/Ashbourne', value: 'Donaghmore/Ashbourne' },
                        { key: 'Drumbaragh Emmett’s', value: 'Drumbaragh Emmett’s' },
                        { key: 'Drumconrath', value: 'Drumconrath' },
                        { key: 'Drumree', value: 'Drumree' },
                        { key: 'Duleek/Bellewstown', value: 'Duleek/Bellewstown' },
                        { key: 'Dunderry', value: 'Dunderry' },
                        { key: 'Dunsany', value: 'Dunsany' },
                        { key: 'Dunshaughlin', value: 'Dunshaughlin' },
                        { key: 'Gaeil Colmcille', value: 'Gaeil Colmcille' },
                        { key: 'Kilbride', value: 'Kilbride' },
                        { key: 'Kildalkey', value: 'Kildalkey' },
                        { key: 'Killyon', value: 'Killyon' },
                        { key: 'Kilmainham', value: 'Kilmainham' },
                        { key: 'Kilmainhamwood', value: 'Kilmainhamwood' },
                        { key: 'Kilmessan', value: 'Kilmessan' },
                        { key: 'Kilskyre', value: 'Kilskyre' },
                        { key: 'Kiltale', value: 'Kiltale' },
                        { key: 'Longwood', value: 'Longwood' },
                        { key: 'Meath Hill', value: 'Meath Hill' },
                        { key: 'Moylagh', value: 'Moylagh' },
                        { key: 'Moynalty', value: 'Moynalty' },
                        { key: 'Moynalvey', value: 'Moynalvey' },
                        { key: 'Na Fianna', value: 'Na Fianna' },
                        { key: 'Nobber', value: 'Nobber' },
                        { key: 'Oldcastle', value: 'Oldcastle' },
                        { key: 'O’Mahony’s', value: 'O’Mahony’s' },
                        { key: 'Rathkenny', value: 'Rathkenny' },
                        { key: 'Rathmolyon', value: 'Rathmolyon' },
                        { key: 'Ratoath', value: 'Ratoath' },
                        { key: 'Round Towers', value: 'Round Towers' },
                        { key: 'Seneschalstown', value: 'Seneschalstown' },
                        { key: 'Simonstown Gaels', value: 'Simonstown Gaels' },
                        { key: 'Skryne', value: 'Skryne' },
                        { key: 'Slane', value: 'Slane' },
                        { key: 'St. Brigid’s', value: 'St. Brigid’s' },
                        { key: 'St. Colmcille’s', value: 'St. Colmcille’s' },
                        { key: 'St. Mary’s', value: 'St. Mary’s' },
                        { key: 'St. Michael’s', value: 'St. Michael’s' },
                        { key: 'St. Patrick’s', value: 'St. Patrick’s' },
                        { key: 'St. Paul’s', value: 'St. Paul’s' },
                        { key: 'St. Peter’s, Dunboyne', value: 'St. Peter’s, Dunboyne' },
                        { key: 'St. Ultan’s', value: 'St. Ultan’s' },
                        { key: 'St. Vincent’s', value: 'St. Vincent’s' },
                        { key: 'Summerhill', value: 'Summerhill' },
                        { key: 'Syddan', value: 'Syddan' },
                        { key: 'Trim', value: 'Trim' },
                        { key: 'Walterstown', value: 'Walterstown' },
                        { key: 'Wolfe Tones', value: 'Wolfe Tones' }
                    ]
                },
                showLabel: true,
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    inputChangeHandler = input => {
        this.setState({
            formError: false,
            formSuccess: ''
        })
        const newFormData = { ...this.state.formData };
        const newFormElement = { ...newFormData[input.id] };
        // console.log(this.state.formData[input.id])
        // console.log(newFormElement)
        // console.log(input.e.target.value)

        newFormElement.value = input.e.target.value;

        let validation = validationHandler(newFormElement);
        newFormElement.valid = validation[0];
        newFormElement.validationMessage = validation[1];
        console.log(validation[0], validation[1]);

        newFormData[input.id] = newFormElement;
        // console.log(newFormData)
        this.setState({
            formData: newFormData,
        })
        console.log(this.state.formData[input.id])
    }

    submitFormHandler = event => {
        event.preventDefault();
        this.setState({ formIsLoading: true })
        let submittedData = {};
        let formIsValid = true;
        for (let key in this.state.formData) {
            submittedData[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            console.log(submittedData, submittedData.email)
            firebaseFanzone.orderByChild('email').equalTo(submittedData.email).once('value')
                .then(snapshot => {
                    if (snapshot.val() === null) {
                        firebaseFanzone.push(submittedData);
                        this.resetFormHandler(true)
                    } else {
                        this.resetFormHandler(false)
                    }
                })
        } else {
            this.setState({ formError: true })
        }
        console.log(this.state.formSuccess)
    }

    formLoadingHandler = (data, type) => {
        setTimeout(() => {
            this.setState({
                formData: data,
                formError: false,
                formSuccess: type ? "Congratulations, you are now part of our news letter." : "Sorry, it looks like that e-mail has already been registered.",
                formIsLoading: false
            })
        }, 500)
    }

    resetFormHandler = type => {
        let newFormData = { ...this.state.formData }
        for (let key in newFormData) {
            // newFormData[key].value = ''
            // newFormData[key].valid = false
            // newFormData[key].validationMessage = ''
            if (newFormData[key].element !== 'select') {
                newFormData[key].value = '';
                newFormData[key].valid = false;
                newFormData[key].validationMessage = '';
            }
            console.log(newFormData.club)
        }

        this.formLoadingHandler(newFormData, type);
    }

    render() {
        return (
            <div className={classes.Form_Container}>
                <form onSubmit={(event) => this.submitFormHandler(event)} className={classes.Form} autocomplete="off">
                    <div className={classes.Form_Name}>
                        <div>
                            {/* {!this.state.formData.firstName.valid ? <div className={classes.Error}>* Please fill in all required fields</div> : null} */}
                            <FormField
                                add={{
                                    width: '95%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px',
                                    boxSizing: 'border-box'
                                }}
                                id={'firstName'}
                                formData={this.state.formData.firstName}
                                change={input => this.inputChangeHandler(input)} />
                        </div>
                        <div>
                            {/* {!this.state.formData.lastName.valid ? <div className={classes.Error}>* Please fill in all required fields</div> : null} */}
                            <FormField
                                label={{
                                    marginLeft: '5%'
                                }}
                                add={{
                                    width: '95%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px',
                                    marginLeft: '5%',
                                    boxSizing: 'border-box'
                                }}
                                id={'lastName'}
                                formData={this.state.formData.lastName}
                                change={input => this.inputChangeHandler(input)} />
                        </div>
                    </div>
                    <div className={classes.Form_Info}>
                        <div>
                            {/* {!this.state.formData.email.valid ? <div className={classes.Error}>* Please fill in all required fields</div> : null} */}
                            <FormField
                                add={{
                                    width: '100%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px',
                                    boxSizing: 'border-box'
                                }}
                                id={'email'}
                                formData={this.state.formData.email}
                                change={input => this.inputChangeHandler(input)} />
                        </div>
                        <div className={classes.Club}>
                            <FormField
                                add={{
                                    width: '100%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px'
                                }}
                                id={'club'}
                                formData={this.state.formData.club}
                                change={e => this.inputChangeHandler(e)} />
                        </div>
                    </div>
                    <div className={classes.Privacy_Policy}>
                        By registering for FanZone, you agree to receive periodic communications about news and offers from Dublin GAA, which you can unsubscribe from at any time, and have read and understood our <span>Privacy Policy.</span>
                    </div>
                    {this.state.formError ? <div className={classes.Error}>* Please fill in all required fields</div> : null}
                    {this.state.formIsLoading ? <Spinner height="75px" width="75px" /> :
                        <div>
                            <div className={classes.formSuccess}>{this.state.formSuccess}</div>
                            <button onSubmit={(event) => this.submitFormHandler(event)} className={classes.SignUp}>Sign Me Up</button>
                        </div>
                    }
                </form>
            </div>
                );
            }
        }
        
export {validationHandler}

export default FanZoneForm;