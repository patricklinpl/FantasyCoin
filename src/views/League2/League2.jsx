import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import leagueRoutes from 'routes/league.jsx'

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
                title='Pick your coins here'
                category='Please select up to 10 coins for your portfolio'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={
                  <Table>
                    <tbody>
                      <tr>
                        <td>BTC</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>ETH</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>LTC</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>ACT</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>XRP</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>XLM</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>BON</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>HGT</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>NIO</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>VIA</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td />
                        <td>
                          <Button round fill bsStyle='info'>Done</Button>
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
