import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Containers/Home';
import Registration from './Containers/Registration';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from '../store';

const NoMatch = () => <div> Upp!!! </div>;

const RegistrationComponent = withAlert(props => {
  if (!props.isAuthenticated) {
    return React.createElement(Registration, props);
  }
  props.alert.info('Ya te encuentras logueado.');
  return <Redirect to="/" />;
});

RegistrationComponent.propTypes = {
  isAuthenticated: PropTypes.bool
};

const RenderRegistration = connect(({ isAuthenticated }) => ({
  isAuthenticated
}))(RegistrationComponent);

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" render={RenderRegistration} />
    <Route component={NoMatch} />
  </Switch>
);
