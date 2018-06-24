import React, { Component } from 'react'
import { StatsCard } from '../../components/StatsCard.jsx'

import { firebase, db } from '../../firebase'

class Wallet extends Component {
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
        bigIcon={<i className='pe-7s-cash text-success' />}
        statsText='Balance'
        statsValue={!!users && <WalletTotal users={users} currentUser={this.state.currentUser} />}
        statsIcon={<i className='fa fa-refresh' />}
        statsIconText='USD'
      />
    )
  }
}

/**
* Returns the 24hr percent change of the top coin in your portfolio
*
* @param {JSON} users
* @param {JSON} currentUser
*
* @return {String} data - dollar amount of USD holdings in your account
*/
const WalletTotal = ({ users, currentUser }) => {
  return '$' + users[currentUser.uid].statistics.usd
}

export default Wallet
