import React from 'react';
import './App.css';
import TestContainer from './containers/Test/TestContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () =>
  <Router>
    <Switch>
      <Route exact path="/" component={TestContainer} />
    </Switch>
  </Router>;

export default App;
