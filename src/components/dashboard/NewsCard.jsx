import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import {News} from './News.jsx'

var cardStyle = {
  display: 'block',
  width: '80vw',
  transitionDuration: '0.3s',
  height: '45vw'
}

class Wins extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <Card
        title='News'
        category='Your Daily Crypto Currency News'
        stats='Updated 3 minutes ago'
        statsIcon='fa fa-history'
        style={cardStyle}
        content={
          <div className='table-full-width'>
            <table className='table'>
              <News />
            </table>
          </div>
        }
      />
    )
  }
}

export default Wins
