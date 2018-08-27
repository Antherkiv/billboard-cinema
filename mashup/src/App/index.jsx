import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import MainNavBar from './Components/MainNavbar';
import Routes from './Routes';
import { getUserName } from '../tools';

class App extends Component {
  componentDidMount() {
    getUserName();
  }
  render() {
    const {
      props: { children }
    } = this;
    return (
      <Fragment>
        <MainNavBar />
        <Routes />
        {children}
      </Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
