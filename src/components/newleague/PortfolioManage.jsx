import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import {
  // Table,
  Grid,
  Row,
  Col,
  // HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Label
} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import { firebase, db } from '../../firebase'

const INITIAL_STATE = {
  coin0: '',
  coins: [{'coin0': '', 'coin1': '', 'coin2': '', 'coin3': '', 'coin4': ''}],
  users: null,
  currentUser: null,
  redirectToNewPage: false,
  balance: ''
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class PortfolioManage extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    var totalAmount = 0
    var finalBalance = this.state.balance
    for (var coin in this.state.coins) {
      try {
        db.doSetAmountInPortfolio (this.state.currentUser.uid, coin)
        totalAmount += coin
        } catch (error) {
        console.log('ERROR in CoinSelect: ' + error.message)
        }
    }

    finalBalance -= totalAmount
    if (finalBalance < 0) {
      console.log('not enough balance!')
    } else {
      try {
        db.doDeductBalance (this.state.currentUser.uid, finalBalance)
        // Redirect back to dashboard if user has high enough balance
        this.setState({
          redirectToNewPage: true
        })
        } catch (error) {
        console.log('ERROR in CoinSelect: ' + error.message)
        }
    }
  }

  componentDidMount () {
    // Get all users
    try {
      db.onceGetUsers().then(snapshot =>
        this.setState(() => ({ users: snapshot.val() }))
      )
    } catch (error) {
      console.log('there was an error')
    }

    // Get current user
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })

    // Get balance of the current user
    try {
      db.onceGetUsers().then(snapshot =>
        this.setState(() => ({ balance: snapshot.val() }))
      )
    } catch (error) {
      console.log('there was an error')
    }
  }

  render () {
    const {
      users
    } = this.state

    var coins = ['coin0', 'coin1', 'coin2', 'coin3', 'coin4']
    var currentPortfolio = []

    for (var coin in coins) {
      if (<CoinSymbol users={users} currentUser={this.state.currentUser} coin={coin} /> != null) {
        currentPortfolio.push(
          <FormGroup controlId={'coin0'} bsSize='large'>
            <ControlLabel>{!!users && <CoinSymbol users={users} currentUser={this.state.currentUser} coin={coin} />}</ControlLabel>
            <FormControl
              autoFocus
              type='text'
              value={'coin0'}
              onChange={event => this.setState(byPropKey('coin0', event.target.value))}
            />
          </FormGroup>
        )
      }
    }

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
                title='Manage your portfolio'
                category='Please specify the amount of each coin for your portfolio in USD.'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={currentPortfolio}
              />
              <form onSubmit={this.onSubmit}>
                <button type='submit'>Done</button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

// Grab the coin symbol and price for given user and coin index
// TODO: Might want to move this into a re-usable file/function
const CoinSymbol = ({ users, currentUser, coin }) => {
  console.log(coin)
  return (users[currentUser.uid].portfolio['coin' + coin].symbol + ' ($' + users[currentUser.uid].portfolio['coin' + coin].price_usd + ')')
}

export default PortfolioManage
