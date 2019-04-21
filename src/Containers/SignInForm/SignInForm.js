import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import FormField from '../../Components/UI/FormField/FormField'
import classes from './SignInForm.module.css';
import { validationHandler } from '../../Components/misc/helpers'
import {firebase} from '../../Firebase'

class SignInForm extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formIsLoading: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email here',
                    label: null
                },
                showLabel: false,
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password here',
                    label: null
                },
                showLabel: false,
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

    submitFormHandler = event => {
        event.preventDefault();
        let submittedData = {};
        let formIsValid = true;
        for (let key in this.state.formData) {
            submittedData[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            console.log(submittedData)
            firebase.auth()
            .signInWithEmailAndPassword(
                submittedData.email,
                submittedData.password
            ).then(() => {
                console.log("logged in")
                console.log(this.props.history)
                this.props.history.push('/dashboard')
            }).catch(error => {
                console.log("error")
                this.setState({
                    formError: true
                })
            })
        } else {
            this.setState({ formError: true })
        }
    }

    render() {
        return (
            <div className={classes.FormBody}>
                <h3 className={classes.Form_Header}>Please Login</h3>
                <form onSubmit={(event) => this.submitFormHandler(event)}>
                    <FormField
                        add={{
                            width: '100%',
                            padding: '15px 10px',
                            borderRadius: '4px',
                            border: 'transparent',
                            marginBottom: '2.5vh',
                            boxSizing: 'border-box'
                        }}
                        id={'email'}
                        formData={this.state.formData.email}
                        change={input => this.inputChangeHandler(input)} />
                    <FormField
                        add={{
                            width: '100%',
                            padding: '15px 10px',
                            borderRadius: '4px',
                            border: 'transparent',
                            boxSizing: 'border-box'
                        }}
                        id={'password'}
                        formData={this.state.formData.password}
                        change={input => this.inputChangeHandler(input)} />
                        {this.state.formError ? <div className={classes.Error}>* Please fill in all required fields</div> : null}
                        <div>
                            <div className={classes.FormSuccess}>{this.state.formSuccess}</div>
                            <button onSubmit={(event) => this.submitFormHandler(event)} className={classes.Button}>Login</button>
                        </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignInForm);