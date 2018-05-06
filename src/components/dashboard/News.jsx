import React, { Component } from 'react'
import {Thumbnail} from 'react-bootstrap'
// import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx'
// import Button from 'elements/CustomButton/CustomButton.jsx'
import axios from 'axios'

var styleTest = {
  fontSize: '25px'
}

export class News extends Component {
  constructor (props) {
    super(props)

    this.state = {
      news: []
    }
  }
  // Import data
  componentDidMount () {
    axios.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=5c922eb873824ce1a0c6e3e1f83f3dad')
      .then(res => {
        const news = res.data.articles
        this.setState({ news })
      })
      .catch(err => {
        this.setState({ news: 'Unable to load news data' })
        console.log(err)
      })
  }

  render () {
    // console.log(this.state.news)
    var i = 0
    var news = []
    for (var newsObj in this.state.news) {
      if (i === 6) break
      i++
      news.push(
        <tr key={i}>
          <td>
            <a href={this.state.news[newsObj].url}><Thumbnail src={this.state.news[newsObj].urlToImage} /></a>
          </td>
          <td><a style={styleTest}href={this.state.news[newsObj].url}>{this.state.news[newsObj].title}</a></td>
        </tr>
      )
    }
    return (
      <tbody>
        {news}
      </tbody>
    )
  }
}

export default News
