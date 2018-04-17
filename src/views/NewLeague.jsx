import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import Checkbox from '../elements/CustomCheckbox/CustomCheckbox.jsx'

import Card from '../components/Card'

class NewLeague extends Component {
  constructor (props) {
    super(props)

    this.state = {
      players: []
    }
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

export default NewLeague
