import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import {Table} from 'react-bootstrap'

import { db, firebase } from '../../firebase'

class Leaderboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      currentUser: null,
      topUsers: null
    }
  }

  componentDidMount () {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })

    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )
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
        <tr key={'tr' + i.toString()}>
          <td key={'td1-' + i.toString()}>{playerNames[i]}</td>
          <td key={'td2-' + i.toString()}>{roi[i]}%</td>
          <td key={'td3-' + i.toString()}>#{i + 1}</td>
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
