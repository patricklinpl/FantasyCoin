import React, { Component } from 'react'
import {StatsCard} from '../../components/StatsCard.jsx'
import { firebase, db } from '../../firebase'

class TopCoin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      currentUser: null
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

const calculateTopCoin = (portfolio) => {
  var topCoin = 'N/A'
  var prevTopCoinChange = -99999999999999999
  for (var coin in portfolio) {
    topCoin = (portfolio[coin].percent_change_24h > prevTopCoinChange) ? portfolio[coin] : topCoin
    prevTopCoinChange = (portfolio[coin].percent_change_24h > prevTopCoinChange) ? portfolio[coin].percent_change_24h : prevTopCoinChange
  }
  return topCoin
}

const CoinSymbol = ({ users, currentUser }) => {
  return calculateTopCoin(users[currentUser.uid].portfolio).symbol
}

const CoinPerformance = ({ users, currentUser }) => {
  return calculateTopCoin(users[currentUser.uid].portfolio).percent_change_24h + '%'
}

export default TopCoin
