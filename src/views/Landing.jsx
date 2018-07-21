import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../elements/CustomButton/CustomButton.jsx'
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

const buttonStyle = {
  borderWidth: '2px',
  backgroundColor: 'transparent',
  fontWeight: '400',
  opacity: 0.8,
  borderColor: '#888888',
  color: '#888888'
}

const signUpStyle = {
  margin: 'auto',
  width: '50%',
  textAlign: 'center'
}

const LandingPage = () =>
  <Grid fluid>
    <Row>
      <Col lg={12} sm={22}>
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
  <Grid fluid>
    <Row style={signUpStyle}>
      <Col lg={12} sm={22}>
        <Button style={buttonStyle}>
          <Link to='/dashboard'>Play Now</Link>
        </Button>
      </Col>
    </Row>
  </Grid>

const PlayNonAuth = () =>
  <Grid fluid>
    <Row style={signUpStyle}>
      <Col lg={12} sm={22}>
        <Button style={buttonStyle}>
          <Link to='/signup'>Play Now</Link>
        </Button>
      </Col>
    </Row>
  </Grid>

export default LandingPage
