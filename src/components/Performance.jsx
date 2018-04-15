import React, { Component } from 'react'
import {StatsCard} from 'components/StatsCard.jsx'

class Performance extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    console.log(this.state.coin)
    return (
      <StatsCard
        bigIcon={<i className='pe-7s-graph2 text-primary' />}
        statsText='Overall Performance'
        statsValue='203%'
        statsIcon={<i className='fa fa-refresh' />}
        statsIconText='Last day'
      />
    )
  }
}

export default Performance
