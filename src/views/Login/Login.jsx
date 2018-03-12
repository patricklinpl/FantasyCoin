import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'

import { GoogleLogin } from 'react-google-login'

const responseGoogle = (response) => {
  console.log(response)
}

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coin: [],
      competition: []
    }
  }

  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Col className='text-center'>
            <GoogleLogin
              clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
              buttonText='Login'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </Col>
        </Grid>
      </div>
    )
  }
}

export default Login
