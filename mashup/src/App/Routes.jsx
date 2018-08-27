import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Containers/Home';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import MoviesAdminPanel from './Containers/MoviesAdminPanel';
import Registration from './Containers/Registration';
import { connect } from '../store';
import Api from '../Api';

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

const AdminPanelComponent = withAlert(props => {
  if (props.isAuthenticated) {
    return (
      <Api.Consumer>
        {value => <MoviesAdminPanel filesApi={value.filesBaseURL} />}
      </Api.Consumer>
    );
  }
  props.alert.error('No tienes autorización para ingresar.');
  return <Redirect to="/" />;
});

const RenderMoviesAdminPanel = connect(({ isAuthenticated }) => ({
  isAuthenticated
}))(AdminPanelComponent);

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/admin-panel" render={RenderMoviesAdminPanel} />
    <Route path="/register" render={RenderRegistration} />
    <Route component={NoMatch} />
  </Switch>
);
