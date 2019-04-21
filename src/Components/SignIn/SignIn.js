import React from 'react';

import classes from './SignIn.module.css'
import SignInForm from '../../Containers/SignInForm/SignInForm'

const SignIn = () => {
    return (
        <div className={classes.SignIn}>
            <div className={classes.SignIn_Cover}></div>
            <div className={classes.SignIn_Body}>
                <SignInForm />
            </div>
        </div>
    );
};

export default SignIn;