import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Layout from '../src/HOC/Layout/Layout'
import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import TheTeam from './Components/TheTeam/TheTeam'
import Fixtures from './Components/Fixtures/Fixtures'

import Dashboard from './Components/Admin/Dashboard/Dashboard'
import AdminMatches from './Containers/Admin/Matches/Matches'
import EditMatches from './Containers/Admin/EditMatches/EditMatches'
import AdminPlayers from './Containers/Admin/Players/Players'
import EditPlayers from './Containers/Admin/EditPlayers/EditPlayers'

import PrivateRoute from './Components/AuthRoutes/PrivateRoutes/PrivateRoutes'
import PublicRoute from './Components/AuthRoutes/PublicRoutes/PublicRoutes'
import './Routes.module.css'

library.add(faCheck)

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact component={EditMatches} path='/admin_matches/edit_match/' />
        <PrivateRoute {...props} exact component={EditMatches} path='/admin_matches/edit_match/:id' />
        <PrivateRoute {...props} exact component={AdminMatches} path='/admin_matches' />
        <PrivateRoute {...props} exact component={EditPlayers} path='/admin_players/edit_player/' />
        <PrivateRoute {...props} exact component={EditPlayers} path='/admin_players/edit_player/:id' />
        <PrivateRoute {...props} exact component={AdminPlayers} path='/admin_players' />
        <PrivateRoute {...props} exact component={Dashboard} path='/dashboard' />
        <PublicRoute  {...props} restricted={false} exact component={Home} path='/' />
        <PublicRoute  {...props} restricted={true} exact component={SignIn} path='/sign-in' />
        <PublicRoute  {...props} restricted={false} exact component={TheTeam} path='/The_Team' />
        <PublicRoute  {...props} restricted={false} exact component={Fixtures} path='/Fixtures' />
      </Switch>
    </Layout>
  );
}

export default Routes;
