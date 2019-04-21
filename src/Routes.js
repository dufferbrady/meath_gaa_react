import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Layout from '../src/HOC/Layout/Layout'
import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import './Routes.module.css'

library.add(faCheck)

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact component={Home} path='/' />
          <Route exact component={SignIn} path='/Sign-in' />
        </Switch>
      </Layout>
    );
  }
}

export default App;
