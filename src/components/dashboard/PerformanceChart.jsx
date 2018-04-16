import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import ChartistGraph from 'react-chartist'
import {
  dataPie,
  legendPie
} from 'variables/Variables.jsx'

class PerformanceChart extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

  render () {
    return (
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
    )
  }
}

export default PerformanceChart
