import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import appRoutes from 'routes/app.jsx'

import Card from 'components/Card/Card'
import { NavLink } from 'react-router-dom'
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx'

import axios from 'axios'

class Icons extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coinData: [],
      portfolio: []
    }
  }

  componentDidMount () {
    var data = []
    axios.get('https://api.coinmarketcap.com/v1/ticker')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          data.push(res.data[i].symbol)
        }
        this.setState({ coinData: data })
      })
      .catch(err => {
        data.push('Unable to load coin data')
        console.log(err)
      })
  }

  componentWillMount () {
    const currentPortfolio = this.state.portfolio
  }

  render () {
    console.log(this.state.coinData[0])
    var allCoins = []
    for (var i = 0; i < this.state.coinData.length; i++) {
      allCoins.push(this.state.coinData[i])
    }

    var coins = []
    var number
    for (var j = 0; j < allCoins.length; j++) {
      number = 'checkbox' + j
      coins.push(
        <tr key={j}>
          <td>{allCoins[j]}</td>
          <td>
            <Checkbox
              number={number}
              isChecked={!!(j === 1 || j === 2)}
            />
          </td>
        </tr>
      )
    }
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
                      {coins.length === 0 ? 'Unable to load data' : coins}
                      <td />
                      {
                        appRoutes.map((prop, key) => {
                          if (prop.done) {
                            return (
                              <div className={prop.done ? 'active active-pro' : this.activeRoute(prop.path)} key={key}>
                                <NavLink to={prop.path} className='nav-link' activeClassName='active'>
                                  <p>{prop.name}</p>
                                </NavLink>
                              </div>
                            )
                          }
                          return null
                        })
                      }
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
