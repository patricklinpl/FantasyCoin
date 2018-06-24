import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Navigation from './Navigation'
import LandingPage from '../views/Landing'
import SignUpPage from '../views/SignUp'
import SignInPage from '../views/SignIn'
import PasswordForgetPage from '../views/PasswordForget'
import HomePage from '../views/Home'
import AccountPage from '../views/Account'
import Dashboard from '../views/Dashboard'
import NewLeague from '../views/NewLeague'

import * as routes from '../constants/routes'

import withAuthentication from './withAuthentication'

const App = () =>
  <Router>
    <div>
      <Navigation />

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.DASHBOARD} component={() => <Dashboard />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.NEWLEAGUE} component={() => <NewLeague />} />
    </div>
  </Router>

export default withAuthentication(App)
