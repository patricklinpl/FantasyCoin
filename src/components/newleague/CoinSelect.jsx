import React, { Component } from 'react'
import { Card } from '../../components/Card.jsx'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import { TOTAL_COINS } from 'variables/NewLeagueVariables.jsx'

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

    // Calls handleInputChange after a checkbox is checked or unchecked
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

    if (finalPortfolio.length == TOTAL_COINS) {
      // Deletes the old portfolio saved in db
      db.doDeletePortfolio(this.state.currentUser.uid)
      var i = 0
      for (var coin in finalPortfolio) {
        var coinName = 'coin' + i
        i++
        try {
          // Set the selected coin in the db
          db.doSetCoinInPortfolio (this.state.currentUser.uid, coinName, finalPortfolio[coin].id, finalPortfolio[coin].name, finalPortfolio[coin].percentChange1hr, finalPortfolio[coin].percentChange24hr, finalPortfolio[coin].percentChange7d, finalPortfolio[coin].priceBTC, finalPortfolio[coin].priceUSD, finalPortfolio[coin].rank, finalPortfolio[coin].symbol, 0)
        } catch (error) {
          console.log('ERROR in CoinSelect: ' + error.message)
        }
      }
      // Updates the state of parent component to trigger a render for the PortfolioManage component 
      this.props.nextStep()
    }
  }

/**
* Handler for extracting data from selected coins and checks if coin selections are valid.
* In this context, valid means the user selected 5 coins. This validity check may change
* once this app contains additional leagues/features and portfolio selection
*
* @param {event} - event data containing checkbox state change
*
*/
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

    // Push all coins to finalPortfolio removing all empty values
    var finalPortfolio = []
    for (var coin in statePortfolio) {
      if (coin) {
        finalPortfolio.push(statePortfolio[coin])
      }
    }
    
    // The value of TOTAL_COINS coins must be selected in order to continue to the next step 
    if (finalPortfolio.length !== TOTAL_COINS || (statePortfolio.every(element => element === 'empty'))) {
      this.setState({
        invalid: true
      })
    } else {
      this.setState({
        invalid: false
      })
    }
  }

/**
 * Fetch firebase db snapshots and authenticated user
 */
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

  completeCoinSelect() {
    this.props.finishCoinSelect()
  }

  render () {
    const { coins, invalid } = this.state

    // Formats a table of coins pushed into an array
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

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Card
                hCenter
                title='Pick your coins here'
                category='Please select 5 coins for your portfolio'
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
              <button disabled={invalid} type='submit'>Next</button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default CoinSelect
