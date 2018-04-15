import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'


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
          <Col className='text-center'>LOGIN</Col>
        </Grid>
      </div>
    )
  }
}

export default Login
