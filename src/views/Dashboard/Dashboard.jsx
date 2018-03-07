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
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from 'variables/Variables.jsx'
import axios from 'axios'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coin: []
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
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='pe-7s-wallet text-success' />}
                statsText={this.state.coin.symbol}
                statsValue={this.state.coin.percent_change_24h + '%'}
                statsIcon={<i className='fa fa-calendar-o' />}
                statsIconText='Top Coin'
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='pe-7s-graph2 text-primary' />}
                statsText='Overall Performance'
                statsValue='$1,345'
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Last day'
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='pe-7s-medal text-success' />}
                statsText='Wins'
                statsValue='23'
                statsIcon={<i className='fa fa-clock-o' />}
                statsIconText='In the last hour'
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='fa fa-twitter text-info' />}
                statsText='Insert some shit here'
                statsValue='???'
                statsIcon={<i className='fa fa-refresh' />}
                statsIconText='Updated now'
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className='content'>
                <Grid fluid>
                  <Row>
                    <Col md={8} mdOffset={2}>
                      <Card
                        hCenter
                        title='Leaderboard'
                        category='Your Competetion'
                        ctTableResponsive ctTableFullWidth ctTableUpgrade
                        content={
                          <Table>
                            <thead>
                              <tr><th />
                                <th className='text-center'>ROI</th>
                                <th className='text-center'>Rank</th>
                              </tr></thead>
                            <tbody>
                              <tr>
                                <td>Jason</td>
                                <td>Insert ROI</td>
                                <td>#1</td>
                              </tr>
                              <tr>
                                <td>Max</td>
                                <td>-99%</td>
                                <td>#2</td>
                              </tr>
                              <tr>
                                <td>Ze</td>
                                <td>7%</td>
                                <td>#3</td>
                              </tr>
                              <tr>
                                <td>Patrick</td>
                                <td>Godliness</td>
                                <td>#4</td>
                              </tr>
                              <tr>
                                <td>Michael</td>
                                <td>Holy SH*T</td>
                                <td>#1</td>
                              </tr>
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
            <Col md={6}>
              <Card
                id='chartActivity'
                title='2014 Sales'
                category='All products including Taxes'
                stats='Data information certified'
                statsIcon='fa fa-check'
                content={
                  <div className='ct-chart'>
                    <ChartistGraph
                      data={dataBar}
                      type='Bar'
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className='legend'>
                    {this.createLegend(legendBar)}
                  </div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title='News'
                category='Your Daily Crypto Currency News'
                stats='Updated 3 minutes ago'
                statsIcon='fa fa-history'
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
