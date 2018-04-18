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
  return users[currentUser.uid].statistics.wins
}

export default Wins
