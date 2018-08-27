import React, { Fragment, PureComponent } from 'react';
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

class UpdateBlocker extends PureComponent {
  render() {
    return this.props.children;
  }
}

class MainNavbar extends PureComponent {
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
      props: { isAuthenticated, myName },
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
        <UpdateBlocker>
          <NavbarBrand tag={Link} to="/">
            Cinema
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {(!isAuthenticated && (
                <Fragment>
                  <LoginForm />
                  <NavItem>
                    <NavLink tag={Link} to="/register">
                      Registro
                    </NavLink>
                  </NavItem>
                </Fragment>
              )) || (
                <Fragment>
                  <NavLink tag={'div'}>{myName}</NavLink>
                  <NavLink tag={Link} to="/admin-panel">
                    Admin Panel
                  </NavLink>
                </Fragment>
              )}
              <NavItem>
                <NavLink href="https://github.com/Antherkiv/billboard-cinema">
                  <img src={githubLogo} width="24" />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </UpdateBlocker>
      </Navbar>
    );
  }
}

MainNavbar.propTypes = {
  isAuthenticated: PropTypes.node,
  myName: PropTypes.string
};

export default connect(({ isAuthenticated, myName }) => ({
  isAuthenticated,
  myName
}))(MainNavbar);
