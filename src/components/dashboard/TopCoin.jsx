import React, { Component } from 'react'
import { StatsCard } from '../../components/StatsCard.jsx'
import { DEFAULT_NEGATIVE_PERCENT } from '../../variables/DashboardVariables.jsx'

import { firebase, db } from '../../firebase'

class TopCoin extends Component {
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
    try {
      db.onceGetUsers().then(snapshot =>
        this.setState(() => ({ users: snapshot.val() }))
      )
    } catch (error) {
      console.log('there was an error')
    }
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
        bigIcon={<i className='pe-7s-wallet text-success' />}
        statsText={!!users && <CoinSymbol users={users} currentUser={this.state.currentUser} />}
        statsValue={!!users && <CoinPerformance users={users} currentUser={this.state.currentUser} />}
        statsIcon={<i className='fa fa-calendar-o' />}
        statsIconText='Top Coin'
      />
    )
  }
}

/**
* Calculate the top performing coin in your portfolio, not biased by dollar amount
*
* @param {JSON} portfolio

* @return {number} data - performance of given portfolio in percent
*/
const calculateTopCoin = (portfolio) => {
  var topCoin = 'N/A' // Default value in case no coin can be calculated
  var prevTopCoinChange = DEFAULT_NEGATIVE_PERCENT // Compare first coin against lowest negative value
  for (var coin in portfolio) {
    topCoin = (parseFloat(portfolio[coin].percent_change_24h) > parseFloat(prevTopCoinChange)) ? portfolio[coin] : topCoin
    prevTopCoinChange = (parseFloat(portfolio[coin].percent_change_24h) > parseFloat(prevTopCoinChange)) ? parseFloat(portfolio[coin].percent_change_24h) : parseFloat(prevTopCoinChange)
  }
  return topCoin
}

/**
* Returns the symbol of the top coin in your portfolio
*
* @param {JSON} users
* @param {JSON} currentUser
*
* @return {number} data - ticker symbol of top coin
*/
const CoinSymbol = ({ users, currentUser }) => {
  return calculateTopCoin(users[currentUser.uid].portfolio).symbol
}

/**
* Returns the 24hr percent change of the top coin in your portfolio
*
* @param {JSON} users
* @param {JSON} currentUser
*
* @return {String} data - performance of top coin in percent
*/
const CoinPerformance = ({ users, currentUser }) => {
  return calculateTopCoin(users[currentUser.uid].portfolio).percent_change_24h + '%'
}

export default TopCoin
