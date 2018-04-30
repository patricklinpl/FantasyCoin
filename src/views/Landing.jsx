import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'elements/CustomButton/CustomButton.jsx'
import AuthUserContext from '../components/AuthUserContext'

const headerStyle = {
  color: '#4A708B',
  textAlign: 'center'
}

const paragraphStyle = {
  color: '#4A708B',
  paddingLeft: '400px',
  paddingRight: '400px',
  textAlign: 'center'
}

const signUpStyle = {
  borderWidth: '2px',
  backgroundColor: 'transparent',
  fontWeight: '400',
  opacity: 0.8,
  padding: '8px 16px',
  marginLeft: '42em',
  marginRight: '42em',
  borderColor: '#888888',
  color: '#888888'
}

const LandingPage = () =>
  <div>
    <h1 style={headerStyle}>
    Welcome to Fantasy Coin (Beta)
    </h1>
    <p style={paragraphStyle}>
      This is a fun app that lets you test your cryptocurrency trading abilities.
       Here you will be able to compete with others to see who has the best performing
       crypto currency portfolio.
    </p>
    <PlayButtonHandler />
  </div>

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
