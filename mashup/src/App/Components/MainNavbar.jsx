import React from 'react';
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

export default class MainNavbar extends React.Component {
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
      state: { isOpen },
      toggle
    } = this;
    return (
      <Navbar
        style={{
          background: 'rgba(0,0,0,0.7)',
          position: 'absolute',
          top: 0,
          zIndex: 999,
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
            <LoginForm />
            <NavItem>
              <NavLink tag={Link} to="/register">
                Registro
              </NavLink>
            </NavItem>
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
