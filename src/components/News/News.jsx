import React, { Component } from 'react';
import {Tooltip,OverlayTrigger,Thumbnail} from 'react-bootstrap';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {
    apiKey
  } from 'variables/Variables.jsx';
import axios from 'axios';

export class News extends Component{
    constructor (props) {
        super(props)
    
        this.state = {
            news: [],
            news_img: [],
            news_url: []
        }
      }
    // Import data
    componentDidMount () {
        axios.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=5c922eb873824ce1a0c6e3e1f83f3dad')
          .then(res => {
            for (var i = 0; i < 6; i++) {
                this.state.news.push(res.data.articles[i].title)
                this.state.news_img.push(res.data.articles[i].urlToImage)
                this.state.news_url.push(res.data.articles[i].url)
            }
          })
          .catch(err => {
            this.state.news.push("Unable to load news data")
            console.log(err);
          })
      }

    handleCheckbox = event => {
        const target = event.target;
        console.log(event.target);
        this.setState({
            [target.name]: target.checked
        });
    };
    render(){
        const edit = (<Tooltip id="edit_tooltip">Edit Task</Tooltip>);
        const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
        const news_title = [
            this.state.news[0],
            this.state.news[1],
            this.state.news[2],
            this.state.news[3],
            this.state.news[4],
            this.state.news[5]
        ];
        const news_url = [
            this.state.news_url[0],
            this.state.news_url[1],
            this.state.news_url[2],
            this.state.news_url[3],
            this.state.news_url[4],
            this.state.news_url[5]
        ];
        const img_urls = [
            this.state.news_img[0],
            this.state.news_img[1],
            this.state.news_img[2],
            this.state.news_img[3],
            this.state.news_img[4],
            this.state.news_img[5]
        ];
        var news = [];
        var number;
        for (var i = 0; i < news_title.length; i++) {
            number = "checkbox"+i;
            news.push(
                <tr key={i}>
                    <td>
                    <a href={news_url[i]}><Thumbnail src={img_urls[i]} size="10x10" /></a>
                    </td>
                    <td><a href={news_url[i]}>{news_title[i]}</a></td>
                    <td className="td-actions text-right">
                        <OverlayTrigger placement="top" overlay={edit}>
                            <Button
                                bsStyle="info"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-edit"></i>
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={remove}>
                            <Button
                                bsStyle="danger"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-times"></i>
                            </Button>
                        </OverlayTrigger>

                    </td>
                </tr>
            );
        }
        return (
            <tbody>
                {news}
            </tbody>
        );
    }
}

export default News;
