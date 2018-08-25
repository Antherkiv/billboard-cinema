import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Registration from './Containers/Registration';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Registration} />
  </Switch>
);
