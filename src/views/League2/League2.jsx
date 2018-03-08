import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import appRoutes from 'routes/app.jsx'

import Card from 'components/Card/Card'

import Button from 'elements/CustomButton/CustomButton'
import axios from 'axios'

class Icons extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coin: []
    }
  }

  componentDidMount () {
    axios.get(`http://api.coinmarketcap.com/v1/ticker`)
      .then(res => {
        var coin = []
        for (var i = 0; i < 30; i++) {
          coin.push(res.data[i].symbol)
        }
      })
  }

  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Card
                hCenter
                title='Pick your team here'
                category='Please select up to 5 people to compete against'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={
                  <Table>
                    <tbody>
                      <tr>
                        <td>Test1</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Test2</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Test3</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Test2</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Paul George</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td />
                        <td>
                          <Button round fill bsStyle='info'>Next Step</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Icons
