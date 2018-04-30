
import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

import AuthUserContext from './AuthUserContext'
import SignOutButton from './SignOut'
import * as routes from '../constants/routes'

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationNonAuth = () =>
  <div>
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={routes.LANDING}>Fantasy Coin (Beta)</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to='/signup'>
            <NavItem>Signup</NavItem>
          </LinkContainer>
          <LinkContainer to={routes.SIGN_IN}>
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>

const NavigationAuth = () =>
  <div>
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={routes.LANDING}>Fantasy Coin (Beta)</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to={routes.DASHBOARD}>
            <NavItem>Dashboard</NavItem>
          </LinkContainer>
          <LinkContainer to={routes.ACCOUNT}>
            <NavItem>Account</NavItem>
          </LinkContainer>
          <LinkContainer to={routes.NEWLEAGUE}>
            <NavItem>Start New League</NavItem>
          </LinkContainer>
          <SignOutButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>

export default Navigation
