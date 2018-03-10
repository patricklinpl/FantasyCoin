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
          coin: []
        }
      }
    // Import data
    componentDidMount () {
        axios.get('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=5c922eb873824ce1a0c6e3e1f83f3dad')
          .then(res => {
            const coin = res.data[0]
            this.setState({ coin })
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
            'Crypto Exchange Bittrex: We’re Compliant With SEC’s ICO Rules',
            'Russia is Considering Relaxed Rules for Cryptocurrency Adopters',
            'Cryptocurrency Hedge Fund Raises Millions of Dollars From Major VCs',
            'Cryptocurrency Will Take Power Away from Central Banks: Steve Bannon',
            'Bitcoin: Doomed for Success',
            'The First Blockchain-Backed Presidential Election Just Took Place in Sierra Leone'
        ];
        const img_urls = [
            'https://www.ccn.com/wp-content/uploads/2018/01/Securities-and-Exchange-Commission.jpg',
            'https://www.ccn.com/wp-content/uploads/2017/05/Central-Bank-of-Russia.jpg',
            'https://www.ccn.com/wp-content/uploads/2018/03/Bitcoin-dollar-roll.jpg',
            'https://www.ccn.com/wp-content/uploads/2018/03/Steve-Bannon.jpg',
            'https://www.ccn.com/wp-content/uploads/2018/03/hiker-celebrating-success-000055416656_Large.jpg',
            'https://www.ccn.com/wp-content/uploads/2018/03/Sierra-Leone.jpg'
        ];
        var news = [];
        var number;
        for (var i = 0; i < news_title.length; i++) {
            number = "checkbox"+i;
            news.push(
                <tr key={i}>
                    <td>
                    <Thumbnail src={img_urls[i]} size="10x10" />
                    </td>
                    <td>{news_title[i]}</td>
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
