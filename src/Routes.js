import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Layout from '../src/HOC/Layout/Layout'
import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import Dashboard from './Components/Admin/Dashboard/Dashboard'
import PrivateRoute from './Components/AuthRoutes/PrivateRoutes/PrivateRoutes'
import PublicRoute from './Components/AuthRoutes/PublicRoutes/PublicRoutes'
import './Routes.module.css'

library.add(faCheck)

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact component={Dashboard} path='/dashboard' />
        <PublicRoute {...props} restricted={false} exact component={Home} path='/' />
        <PublicRoute {...props} restricted={true} exact component={SignIn} path='/sign-in' />
      </Switch>
    </Layout>
  );
}

export default Routes;
