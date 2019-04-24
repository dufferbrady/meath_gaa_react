import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoutes = ({
    user,
    component: Component,
    ...remainder
}) => {
    return <Route {...remainder} component={props => {
        console.log(user)
        return (
            user ?
                <Component {...props} user={user} />
                :
                <Redirect to="/sign-in" />
        )
    }} />
};

export default PrivateRoutes;