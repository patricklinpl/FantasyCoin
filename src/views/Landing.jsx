import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'elements/CustomButton/CustomButton.jsx'
import { Grid, Row, Col } from 'react-bootstrap'
import AuthUserContext from '../components/AuthUserContext'

const headerStyle = {
  color: '#4A708B',
  textAlign: 'center',
  marginLeft: '35%',
  marginRight: '35%'
}

const paragraphStyle = {
  color: '#4A708B',
  textAlign: 'center',
  marginLeft: '35%',
  marginRight: '35%'
}

const signUpStyle = {
  borderWidth: '2px',
  backgroundColor: 'transparent',
  fontWeight: '400',
  opacity: 0.8,
  borderColor: '#888888',
  color: '#888888',
  marginLeft: '50%',
  marginRight: '50%'
}

const LandingPage = () =>
  <Grid fluid>
    <Row>
      <Col lg={12} sm={25}>
        <h1 style={headerStyle}>
    Welcome to Fantasy Coin (Beta)
        </h1>
        <p style={paragraphStyle}>
      This is a fun app that lets you test your cryptocurrency trading abilities.
       Here you will be able to compete with others to see who has the best performing
       crypto currency portfolio.
        </p>
        <PlayButtonHandler />
      </Col>
    </Row>
  </Grid>

// Handles the Play button route
// 1. If user not signed in, take them to the signup page
// 2. If user is signed in, take them to their dashboard
const PlayButtonHandler = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <PlayAuth />
      : <PlayNonAuth />
    }
  </AuthUserContext.Consumer>

const PlayAuth = () =>
  <Button style={signUpStyle}>
    <Link to='/dashboard'>Play Now</Link>
  </Button>

const PlayNonAuth = () =>
  <Button style={signUpStyle}>
    <Link to='/signup'>Play Now</Link>
  </Button>

export default LandingPage
