import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import appRoutes from 'routes/app.jsx'
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx'

import Card from 'components/Card/Card'

import axios from 'axios'

class Icons extends Component {
  constructor (props) {
    super(props)

    this.state = {
      players: []
    }
  }

  activeRoute (routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }

  render () {
    var playerNames = [
      'Jason',
      'Patrick',
      'Michael',
      'Ze',
      'Max',
      'Paul'
    ]

    var team = []
    var number
    for (var i = 0; i < 6; i++) {
      number = 'checkbox' + i
      team.push(
        <tr>
          <td>{playerNames[i]}</td>
          <td>
            <Checkbox
              number={number}
              isChecked={!!(i === 1 || i === 2)}
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
                title='Pick your team here'
                category='Please select up to 5 people to compete against'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={
                  <Table>
                    <tbody>
                      {team}
                      <tr>
                        <td />
                        <td>
                          {
                            appRoutes.map((prop, key) => {
                              if (prop.league2) {
                                return (
                                  <div className={prop.league ? 'active active-pro' : this.activeRoute(prop.path)} key={key}>
                                    <NavLink to={prop.path} className='nav-link' activeClassName='active'>
                                      <i className={prop.icon} />
                                      <p>{prop.name}</p>
                                    </NavLink>
                                  </div>
                                )
                              }
                              return null
                            })
                          }
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
