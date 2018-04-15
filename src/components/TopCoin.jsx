import React, { Component } from 'react'
import {StatsCard} from 'components/StatsCard.jsx'

import axios from 'axios'

class TopCoin extends Component {
  componentWillMount () {
    this.getTopCoin()
  }

  getTopCoin () {
    axios.get('http://api.coinmarketcap.com/v1/ticker')
      .then(res => {
        const coin = res.data[0]
        this.setState({ coin })
      })
  }

  constructor (props) {
    super(props)

    this.state = {
      coin: []
    }
    this.getTopCoin = this.getTopCoin.bind(this)
  }

  render () {
    console.log(this.state.coin)
    return (
      <StatsCard
        bigIcon={<i className='pe-7s-wallet text-success' />}
        statsText={this.state.coin.symbol}
        statsValue={this.state.coin.percent_change_24h + '%'}
        statsIcon={<i className='fa fa-calendar-o' />}
        statsIconText='Top Coin'
      />
    )
  }
}

export default TopCoin
