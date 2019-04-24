import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PublicRoutes = ({
    user,
    component: Component,
    ...remainder
}) => {
    return <Route {...remainder} component={props => (
        remainder.restricted ?
            (user ?
                <Redirect to="/dashboard" />
                :
                <Component {...props} user={user} />
            )
            :
            <Component {...props} user={user} />
    )} />
};

export default PublicRoutes;