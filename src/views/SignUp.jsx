import React, { Component } from 'react';
import { 
  Link,
  withRouter,
 } from 'react-router-dom';
 import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap"
import "../components/styles/Signup.css"
import LoaderButton from '../components/LoaderButton'
import { Grid, Row, Col } from 'react-bootstrap'

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1 style={signUpHeader}>Sign Up</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  isLoading: false,
  username: '',
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

var signUpHeader = {
  margin: 'auto',
  width: '15%',
  paddingBottom: '10px',
  textAlign: 'center'
}

var test = {
  margin: 'auto',
  width: '15%',
}

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      name,
      email,
      passwordOne,
    } = this.state;

    const {
      history
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ isLoading: true })

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, name, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

        // Initialize an empty portfolio for the user
        db.doInitializePortfolio(authUser.uid, 'N/A', 'N/A', 0, 0, 0, 0, 0, 0, 'N/A')
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

        // Initialize statistics for the user
        db.doInitializeStats(authUser.uid, 0, 0, 0)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

          this.setState({ isLoading: false })
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.passwordOne.length > 0 &&
      this.state.passwordOne === this.state.passwordTwo
    );
  }

  render() {
    const {
      username,
      name,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    return (
      <Grid fluid style={test}>
        <Row>
          <Col>
            <form onSubmit={this.onSubmit}>
              <FormGroup controlId="username" bsSize="large">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  autoFocus
                  type="username"
                  value={username}
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                />
              </FormGroup>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="confirmPassword" bsSize="large">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  type="password"
                />
              </FormGroup>
              <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Sign Up"
                loadingText="Signing up…"
              />
              { error && <p>{error.message}</p> }
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};