import React, { Component } from 'react';

import classes from './FanZoneForm.module.css'
import FormField from '../../Components/UI/FormField/FormField'

class FanZoneForm extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            firstName: {
                element: 'input',
                value: '',
                config: {
                    name: 'firstName_input',
                    type: 'input',
                    placeholder: 'Enter your name here',
                    label: 'First Name*'
                },
                showLabel: true,
                validation: {
                    required: true,
                    name: true
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
                    label: 'Last Name*'
                },
                showLabel: true,
                validation: {
                    required: true,
                    name: true
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
                    label: 'Email*'
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
                    label: 'Select a Club*',
                    name: 'select_club',
                    type: 'select',
                    options: [
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
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }
    render() {
        return (
            <div className={classes.Form_Container}>
                <div className={classes.Form}>
                    <div className={classes.Form_Name}>
                        <div>
                            <FormField
                                add={{
                                    width: '90%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px',
                                    boxSizing: 'border-box'
                                }}
                                id={'firstName'}
                                formData={this.state.formData.firstName} />
                        </div>
                        <div>
                            <FormField
                                label={{
                                    marginLeft: '10%'
                                }}
                                add={{
                                    width: '90%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px',
                                    marginLeft: '10%',
                                    boxSizing: 'border-box'
                                }}
                                id={'lastName'}
                                formData={this.state.formData.lastName} />
                        </div>
                    </div>
                    <div className={classes.Form_Info}>
                        <div>
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
                                formData={this.state.formData.email} />
                        </div>
                        <div className={ classes.Club }>
                            <FormField
                                add={{
                                    width: '100%',
                                    padding: '15px 10px',
                                    borderRadius: '4px',
                                    border: 'transparent',
                                    marginTop: '5px'
                                }}
                                id={'club'}
                                formData={this.state.formData.club} />
                        </div>
                    </div>
                    <div className={classes.Privacy_Policy}>
                        By registering for DubZone, you agree to receive periodic communications about news and offers from Dublin GAA, which you can unsubscribe from at any time, and have read and understood our <span>Privacy Policy.</span>
                    </div>
                    <button className={classes.SignUp}>Sign Me Up</button>
                </div>
            </div>
        );
    }
}

export default FanZoneForm;