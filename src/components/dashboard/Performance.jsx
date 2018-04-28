import React, { Component } from 'react'
import {StatsCard} from '../../components/StatsCard.jsx'

import { firebase, db } from '../../firebase'

class Performance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      currentUser: null
    }
  }

  componentDidMount () {
    var localUsers = null
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )

    db.onceGetUsers().then(snapshot => { localUsers = snapshot.val })

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })

    // console.log(calculatePerformance(this.state.users[this.state.currentUser.uid].portfolio))
  }

  render () {
    const { users } = this.state

    return (
      <StatsCard
        bigIcon={<i className='pe-7s-graph2 text-primary' />}
        statsText='Overall Performance'
        statsValue={!!users && <PortfolioPerformance users={users} currentUser={this.state.currentUser} />}
        statsIcon={<i className='fa fa-refresh' />}
        statsIconText='Past 24 Hours'
      />
    )
  }
}

const calculatePerformance = (portfolio) => {
  var totalGains = 0
  var portfolioSize = 0
  for (var coin in portfolio) {
    portfolioSize++
    totalGains += parseFloat(portfolio[coin].percent_change_24h, 10)
  }
  return Math.round((totalGains / portfolioSize) * 100) / 100
}

const PortfolioPerformance = ({ users, currentUser }) => {
  return calculatePerformance(users[currentUser.uid].portfolio) + '%'
}

export default Performance
