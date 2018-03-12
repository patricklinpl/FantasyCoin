import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import Button from 'elements/CustomButton/CustomButton'

import {Card} from 'components/Card/Card.jsx'
import {StatsCard} from 'components/StatsCard/StatsCard.jsx'
import {News} from 'components/News/News.jsx'
import * as Icon from 'react-cryptocoins'
import {
  dataPie,
  legendPie
} from 'variables/Variables.jsx'
import axios from 'axios'

var cardStyle = {
  display: 'block',
  width: '80vw',
  transitionDuration: '0.3s',
  height: '45vw'
}

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coin: [],
      competition: []
    }
  }

  createLegend (json) {
    var legend = []
    for (var i = 0; i < json['names'].length; i++) {
      var type = 'fa fa-circle text-' + json['types'][i]
      legend.push(
        <i className={type} key={i} />
      )
      legend.push(' ')
      legend.push(
        json['names'][i]
      )
    }
    return legend
  }

  componentDidMount () {
    axios.get(`http://api.coinmarketcap.com/v1/ticker`)
      .then(res => {
        const coin = res.data[0]
        this.setState({ coin })
      })
  }

  render () {
    var playerNames = [
      'Jason',
      'Patrick',
      'Michael',
      'Ze',
      'Max',
      'Paul'
    ]

    var roi = [
      '20',
      '43',
      '15',
      '23',
      '89',
      '110'
    ]

    var team = []
    var number
    for (var i = 0; i < 6; i++) {
      number = 'checkbox' + i
      team.push(
        <tr>
          <td>{playerNames[i]}</td>
          <td>{roi[i]}%</td>
          <td>#{i+1}</td>
        </tr>
      )
    }

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col lg={4} sm={8}>
              <StatsCard
                bigIcon={<i className='pe-7s-wallet text-success' />}
                statsText={this.state.coin.symbol}
                statsValue={this.state.coin.percent_change_24h + '%'}
                statsIcon={<i className='fa fa-calendar-o' />}
                statsIconText='Top Coin'
              />
            </Col>
            <Col lg={4} sm={8}>
              <StatsCard
                bigIcon={<i className='pe-7s-graph2 text-primary' />}
                statsText='Overall Performance'
                statsValue='203%'
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Last day'
              />
            </Col>
            <Col lg={4} sm={8}>
              <StatsCard
                bigIcon={<i className='pe-7s-medal text-success' />}
                statsText='Wins'
                statsValue='23'
                statsIcon={<i className='fa fa-clock-o' />}
                statsIconText='In the last hour'
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className='content'>
                <Grid fluid>
                  <Row>
                    <Col md={13}>
                      <Card
                        hCenter
                        title='Leaderboard'
                        category='Your Competetion'
                        ctTableResponsive ctTableFullWidth ctTableLeague
                        content={
                          <Table>
                            <thead>
                              <tr><th />
                                <th className='text-center'>ROI</th>
                                <th className='text-center'>Rank</th>
                              </tr></thead>
                            <tbody>
                              {team}
                            </tbody>
                          </Table>
                        }
                      />
                    </Col>
                  </Row>
                </Grid>
              </div>
            </Col>
            <Col md={4}>
              <Card
                statsIcon='fa fa-clock-o'
                title='Crypto Currency Statistics'
                category='Portfolio Profit Performance'
                stats='Your 1 week performance'
                content={
                  <div id='chartPreferences' className='ct-chart ct-perfect-fourth'>
                    <ChartistGraph data={dataPie} type='Pie' />
                  </div>
                }
                legend={
                  <div className='legend'>
                    {this.createLegend(legendPie)}
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
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
            </Col>
          </Row>

        </Grid>
      </div>
    )
  }
}

export default Dashboard
