import React, { Component } from 'react';
import { Switch, Route }  from 'react-router-dom';

import Layout from '../src/HOC/Layout/Layout'
import Home from './Components/Home/Home'
import './Routes.module.css'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact component={ Home } path='/'/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
