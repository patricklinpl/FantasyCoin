import React, { Component } from 'react'
import { StatsCard } from '../../components/StatsCard.jsx'

import { firebase, db } from '../../firebase'

class Performance extends Component {
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
      <StatsCard
        bigIcon={<i className='pe-7s-graph2 text-primary' />}
        statsText='Performance'
        statsValue={!!users && <PortfolioPerformance users={users} currentUser={this.state.currentUser} />}
        statsIcon={<i className='fa fa-refresh' />}
        statsIconText='Past 24 Hours'
      />
    )
  }
}

/**
* Helper function to help calculate the overall performance of a user portfolio
*
* @param {JSON} portfolio
*
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

/**
* Higher level function that passes in a portfolio of a given user
* to calculatePerformance(..) and returns the performance with a % sign attached
*
* @param {JSON} portfolio
*
* @return {string} data - performance of given portfolio with '%' appended
*/
const PortfolioPerformance = ({ users, currentUser }) => {
  return calculatePerformance(users[currentUser.uid].portfolio) + '%'
}

export default Performance
