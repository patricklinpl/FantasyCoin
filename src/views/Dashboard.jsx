import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
// import Button from 'elements/CustomButton/CustomButton'

import TopCoin from '../components/dashboard/TopCoin.jsx'
import Performance from '../components/dashboard/Performance.jsx'
import Wallet from '../components/dashboard/Wallet.jsx'
import Wins from '../components/dashboard/Wins.jsx'
import Leaderboard from '../components/dashboard/Leaderboard.jsx'
import PerformanceChart from '../components/dashboard/PerformanceChart.jsx'
import NewsCard from '../components/dashboard/NewsCard.jsx'

import withAuthorization from '../components/withAuthorization'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coin: [],
      competition: []
    }
  }

  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <Wallet />
            </Col>
            <Col lg={3} sm={6}>
              <TopCoin />
            </Col>
            <Col lg={3} sm={6}>
              <Performance />
            </Col>
            <Col lg={3} sm={6}>
              <Wins />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className='content'>
                <Grid fluid>
                  <Row>
                    <Col md={13}>
                      <Leaderboard />
                    </Col>
                  </Row>
                </Grid>
              </div>
            </Col>
            <Col md={4}>
              <PerformanceChart />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <NewsCard />
            </Col>
          </Row>

        </Grid>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Dashboard)
