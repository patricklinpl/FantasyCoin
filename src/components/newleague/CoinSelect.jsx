import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

import { firebase, db } from '../../firebase'

var statePortfolio = []


class CoinSelect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coins: [],
      users: [],
      currentUser: null,
      coinSelect: [],
      portfolio: [],
      invalid: true,
      redirectToNewPage: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onSubmit = (event) => {
    var finalPortfolio = []

    // Push all coins to an array removing all empty values
    for (var coin in statePortfolio) {
      if (coin) {
        finalPortfolio.push(statePortfolio[coin])
      }
    }


    db.doDeletePortfolio(this.state.currentUser.uid)

    console.log(finalPortfolio)
    var i = 0
    // var coinAdded = false
    for (var coin in finalPortfolio) {
      //console.log(finalPortfolio[coin])
      var coinName = 'coin' + i
      i++

      try {
      db.doSetCoinInPortfolio (this.state.currentUser.uid, coinName, finalPortfolio[coin].id, finalPortfolio[coin].name, finalPortfolio[coin].percentChange1hr, finalPortfolio[coin].percentChange24hr, finalPortfolio[coin].percentChange7d, finalPortfolio[coin].priceBTC, finalPortfolio[coin].priceUSD, finalPortfolio[coin].rank, finalPortfolio[coin].symbol, 0)
      } catch (error) {
      console.log('ERROR in CoinSelect: ' + error.message)
      }
    }
    
    this.setState({
      redirectToNewPage: true
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    // Extract the X digit(s) from "coinX" to use as an index
    var coinIndex = name.match(/\d/g)
    coinIndex = coinIndex.join("")

    // Here we must state the index instead of pushing because we may have to unset the value
    if (target.type === 'checkbox' && target.checked) {
      statePortfolio[coinIndex - 1] = this.state.coins[coinIndex - 1]
    } else if (target.type === 'checkbox' && !target.checked) {
      statePortfolio.splice(coinIndex - 1, 1)
    }

    console.log(statePortfolio.every(element => element === 'empty'))
    if ((statePortfolio.every(element => element === 'empty'))) {
      this.setState({
        invalid: true
      })
    } else {
      this.setState({
        invalid: false
      })
    }
  }

  componentDidMount () {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })

    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )

    db.onceGetCoins().then(snapshot =>
      this.setState(() => ({ coins: snapshot.val() }))
    )
  }

  render () {
    const { coins } = this.state

    var allCoins = []
    var index = 0
    for (var coin in coins) {
      index++
      allCoins.push(
        <tr key={'coin' + index}>
          <td>{coins[coin].symbol + '  ' + '(' + coins[coin].percentChange24hr + ')' }</td>
          <td>
            <input
              name={'coin' + index}
              type='checkbox'
              checked={this.state.coinSelect['coin' + index]}
              onChange={this.handleInputChange} />
          </td>
        </tr>
      )
    }

    const isInvalid = this.state.invalid

    if (this.state.redirectToNewPage) {
      return (
      <Redirect to="/dashboard"/>
      )
    }

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Card
                hCenter
                title='Pick your coins here'
                category='Please select up to 10 coins for your portfolio'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={
                  <Table>
                    <tbody>
                      {allCoins.length === 0 ? <tr><td>Unable to load data</td></tr> : allCoins}
                    </tbody>
                  </Table>
                }
              />
              <form onSubmit={this.onSubmit}>
              <button disabled={isInvalid} type='submit'>Next</button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default CoinSelect
