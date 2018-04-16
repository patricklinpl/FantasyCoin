import React, { Component } from 'react'
import {StatsCard} from '../../components/StatsCard.jsx'

class Wins extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    console.log(this.state.coin)
    return (
      <StatsCard
        bigIcon={<i className='pe-7s-medal text-success' />}
        statsText='Wins'
        statsValue='23'
        statsIcon={<i className='fa fa-clock-o' />}
        statsIconText='In the last hour'
      />
    )
  }
}

export default Wins
