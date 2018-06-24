import React, { Component } from 'react'
import { Card } from '../../components/Card.jsx'
import { News } from './News.jsx'
import { newsCardStyle } from 'variables/DashboardVariables.jsx'

class NewsCard extends Component {
  render () {
    return (
      <Card
        title='News'
        category='Your Daily Crypto Currency News'
        stats='Updated 3 minutes ago'
        statsIcon='fa fa-history'
        style={newsCardStyle}
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

export default NewsCard
