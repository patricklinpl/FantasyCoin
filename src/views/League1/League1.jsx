import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import leagueRoutes from 'routes/league.jsx'

import Card from 'components/Card/Card'

import Button from 'elements/CustomButton/CustomButton'
import axios from 'axios'

class Icons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: window.innerWidth
    }
  }

  activeRoute (routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
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
                        <td>Patrick Lin</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Max Leung</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Ze Chen</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Michael Sun</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td>Paul George</td>
                        <td><i className='fa fa-check text-success' /></td>
                      </tr>
                      <tr>
                        <td />
                        <td>
                          <div className='sidebar-wrapper'>
                            <ul className='nav'>
                              {
                                leagueRoutes.map((prop, key) => {
                                  if (!prop.redirect) {
                                    return (
                                      <li className={prop.league ? 'active active-pro' : this.activeRoute(prop.path)} key={key}>
                                        <NavLink to={prop.path} className='nav-link' activeClassName='active'>
                                          <i className={prop.icon} />
                                          <p>{prop.name}</p>
                                        </NavLink>
                                      </li>
                                    )
                                  }
                                  return null
                                })
                              }
                            </ul>
                          </div>
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
