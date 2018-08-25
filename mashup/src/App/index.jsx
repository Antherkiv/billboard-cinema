import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MainNavBar from './Components/MainNavbar';
import Routes from './Routes';

const App = ({ children }) => (
  <Fragment>
    <MainNavBar />
    <Routes />
    {children}
  </Fragment>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
