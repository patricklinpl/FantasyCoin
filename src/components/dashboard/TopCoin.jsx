import React, { Component } from 'react'
import {StatsCard} from '../../components/StatsCard.jsx'
import { db } from '../../firebase'

class TopCoin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null
    }
  }

  componentDidMount () {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )
  }

  render () {
    const { users } = this.state

    return (
      <StatsCard
        bigIcon={<i className='pe-7s-wallet text-success' />}
        statsText={!!users && <CoinSymbol users={users} />}
        statsValue={!!users && <CoinPerformance users={users} />}
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
    console.log(portfolio[coin].percent_change_24h)
    topCoin = (portfolio[coin].percent_change_24h > prevTopCoinChange) ? portfolio[coin] : topCoin
    prevTopCoinChange = (portfolio[coin].percent_change_24h > prevTopCoinChange) ? portfolio[coin].percent_change_24h : prevTopCoinChange
  }
  return topCoin
}

const CoinSymbol = ({ users }) =>
  <div>

    {Object.keys(users).map(key =>
      <div key={key}>{
        calculateTopCoin(users[key].portfolio).symbol
      }</div>
    )}
  </div>

const CoinPerformance = ({ users }) =>
  <div>

    {Object.keys(users).map(key =>
      <div key={key}>{
        calculateTopCoin(users[key].portfolio).percent_change_24h + '%'
      }</div>
    )}
  </div>

export default TopCoin
