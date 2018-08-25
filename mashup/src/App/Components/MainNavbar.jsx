import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import LoginForm from './Login';

import githubLogo from '../../img/GitHub-Mark-Light-32px.png';
import { connect } from '../../store';

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    const {
      state: { isOpen }
    } = this;
    this.setState({
      isOpen: !isOpen
    });
  }
  render() {
    const {
      props: { isAuthenticated },
      state: { isOpen },
      toggle
    } = this;
    return (
      <Navbar
        style={{
          background: 'rgba(0,0,0,0.7)',
          position: 'absolute',
          top: 0,
          zIndex: 10,
          width: '100%'
        }}
        dark
        expand="md"
      >
        <NavbarBrand tag={Link} to="/">
          Cinema
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuthenticated && (
              <Fragment>
                <LoginForm />
                <NavItem>
                  <NavLink tag={Link} to="/register">
                    Registro
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
            <NavItem>
              <NavLink href="https://github.com/Antherkiv/billboard-cinema">
                <img src={githubLogo} width="24" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

MainNavbar.propTypes = {
  isAuthenticated: PropTypes.node
};

export default connect(({ isAuthenticated }) => ({
  isAuthenticated
}))(MainNavbar);
