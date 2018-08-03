import React, { Component } from 'react'
import { Card } from '../../components/Card.jsx'
import { Table } from 'react-bootstrap'
import { MAX_TOP_USERS } from '../../variables/DashboardVariables.jsx'

import { firebase, db } from '../../firebase'

class Leaderboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      currentUser: null
    }
  }

  /**
   * Fetch firebase db snapshot of all users and authenticated user
   */
  componentDidMount () {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })
  }

  render () {
    const { users } = this.state
    return (
      <Card
        hCenter
        title='Leaderboard'
        category='Your Competetion'
        ctTableResponsive ctTableFullWidth ctTableLeague
        content={
          <Table>
            <thead>
              <tr>
                <th className='text-left'>USERNAME</th>
                <th className='text-center'>ROI (24hr)</th>
                <th className='text-center'>Rank</th>
              </tr></thead>
            <tbody>
              {!!users && <LeaderboardList users={users} />}
            </tbody>
          </Table>
        }
      />
    )
  }
}

/**
* Component which renders all the top performing users
*
* @param {JSON} users
*/
const LeaderboardList = ({ users }) => {
  var topUsers = calculateTopUsers(users)
  var team = []

  for (var i = 0; i < topUsers.length; i++) {
    if (i === MAX_TOP_USERS) break
    team.push(
      <tr key={'tr' + i.toString()}>
        <td key={'td1-' + i.toString()}>{users[topUsers[i].id].username}</td>
        <td key={'td2-' + i.toString()}>{topUsers[i].performance}%</td>
        <td key={'td3-' + i.toString()}>#{i + 1}</td>
      </tr>
    )
  }

  return team
}

/**
* Helper function for LeaderBoardList which calculates the top performing users
*
* @param {JSON} users
*
* @return {Array} list - of top performing users
*/
const calculateTopUsers = (users) => {
  var userPerformance = []

  for (var user in users) {
    userPerformance.push({
      id: user,
      performance: calculatePerformance(users[user].portfolio)
    })
  }

  userPerformance.sort(function (a, b) {
    return b.performance - a.performance
  })

  return userPerformance
}

/**
* Helper function for calculateTopUsers(..) which calculates the performance of a specific user
*
* @param {JSON} users

* @return {number} data - performance of given portfolio in percent
*/
const calculatePerformance = (portfolio) => {
  var totalGains = 0
  var portfolioSize = 0
  for (var coin in portfolio) {
    portfolioSize++
    totalGains += parseFloat(portfolio[coin].percent_change_24h, 10)
  }
  return Math.round((totalGains / portfolioSize) * 100) / 100
}

export default Leaderboard
