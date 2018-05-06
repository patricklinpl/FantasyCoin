import React, { Component } from 'react'
import {StatsCard} from '../../components/StatsCard.jsx'

import { firebase, db } from '../../firebase'

class Wallet extends Component {
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
        bigIcon={<i className='pe-7s-cash text-success' />}
        statsText='Balance'
        statsValue={!!users && <WalletTotal users={users} currentUser={this.state.currentUser} />}
        statsIcon={<i className='fa fa-refresh' />}
        statsIconText='USD'
      />
    )
  }
}

const WalletTotal = ({ users, currentUser }) => {
  return '$' + users[currentUser.uid].statistics.usd
}

export default Wallet
