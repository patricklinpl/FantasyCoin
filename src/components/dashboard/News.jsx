import React, { Component } from 'react'
import {Thumbnail} from 'react-bootstrap'
// import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx'
// import Button from 'elements/CustomButton/CustomButton.jsx'
import axios from 'axios'

export class News extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newsTitle: [],
      newsImg: [],
      newsURL: []
    }
  }
  // Import data
  componentDidMount () {
    axios.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=5c922eb873824ce1a0c6e3e1f83f3dad')
      .then(res => {
        for (var i = 0; i < 6; i++) {
          // console.log(res.data)
          this.state.newsTitle.push(res.data.articles[i].title)
          this.state.newsImg.push(res.data.articles[i].urlToImage)
          this.state.newsURL.push(res.data.articles[i].url)
        }
      })
      .catch(err => {
        this.state.newsTitle.push('Unable to load news data')
        console.log(err)
      })
  }

  render () {
    const newsTitle = [
      this.state.newsTitle[0],
      this.state.newsTitle[1],
      this.state.newsTitle[2],
      this.state.newsTitle[3],
      this.state.newsTitle[4],
      this.state.newsTitle[5]
    ]
    const newsURL = [
      this.state.newsURL[0],
      this.state.newsURL[1],
      this.state.newsURL[2],
      this.state.newsURL[3],
      this.state.newsURL[4],
      this.state.newsURL[5]
    ]
    const newsImg = [
      this.state.newsImg[0],
      this.state.newsImg[1],
      this.state.newsImg[2],
      this.state.newsImg[3],
      this.state.newsImg[4],
      this.state.newsImg[5]
    ]
    var news = []
    for (var i = 0; i < newsTitle.length; i++) {
      news.push(
        <tr key={i}>
          <td>
            <a href={newsURL[i]}><Thumbnail src={newsImg[i]} size='10x10' /></a>
          </td>
          <td><a href={newsURL[i]}>{newsTitle[i]}</a></td>
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
