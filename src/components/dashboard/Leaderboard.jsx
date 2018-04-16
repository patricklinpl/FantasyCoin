import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import {Table} from 'react-bootstrap'

class Leaderboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

    var roi = [
      '20',
      '43',
      '15',
      '23',
      '89',
      '110'
    ]

    var team = []
    for (var i = 0; i < 6; i++) {
      team.push(
        <tr>
          <td>{playerNames[i]}</td>
          <td>{roi[i]}%</td>
          <td>#{i + 1}</td>
        </tr>
      )
    }
    return (
      <Card
        hCenter
        title='Leaderboard'
        category='Your Competetion'
        ctTableResponsive ctTableFullWidth ctTableLeague
        content={
          <Table>
            <thead>
              <tr><th />
                <th className='text-center'>ROI</th>
                <th className='text-center'>Rank</th>
              </tr></thead>
            <tbody>
              {team}
            </tbody>
          </Table>
        }
      />
    )
  }
}

export default Leaderboard
