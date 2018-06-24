import React, { Component } from 'react'
import {StatsCard} from '../../components/StatsCard.jsx'

import { firebase, db } from '../../firebase'

class Wins extends Component {
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
        bigIcon={<i className='pe-7s-medal text-success' />}
        statsText='Wins'
        statsValue={!!users && <TotalWins users={users} currentUser={this.state.currentUser} />}
        statsIcon={<i className='fa fa-clock-o' />}
        statsIconText='Performance'
      />
    )
  }
}

const TotalWins = ({ users, currentUser }) => {
  var wins = (typeof users[currentUser.uid].statistics !== 'undefined') ? users[currentUser.uid].statistics.wins : 0
  return wins
}

export default Wins
