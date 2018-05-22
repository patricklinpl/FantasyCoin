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
  ControlLabel
} from 'react-bootstrap'

import { firebase, db } from '../../firebase'

const INITIAL_STATE = {
  coin1: '',
  users: null,
  currentUser: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class PortfolioManage extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  componentDidMount () {
    try {
      db.onceGetUsers().then(snapshot =>
        this.setState(() => ({ users: snapshot.val() }))
      )
    } catch (error) {
      console.log('there was an error')
    }

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })
  }

  render () {
    const {
      coin1,
      users
    } = this.state

    var coins = users[]

    var currentPortfolio = []

    for (var coin in coins) {
      currentPortfolio.push(
        <FormGroup controlId={coin} bsSize='large'>
          <ControlLabel>{!!users && <CoinSymbol users={users} currentUser={this.state.currentUser} coin={coin} />}</ControlLabel>
          <FormControl
            autoFocus
            type='text'
            value={coin1}
            onChange={event => this.setState(byPropKey(coin1, event.target.value))}
          />
        </FormGroup>
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
                category='Please specify the amount of each coin for your portfolio'
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

const CoinSymbol = ({ users, currentUser, coin }) => {
  console.log(coin)
  return users[currentUser.uid].portfolio['coin' + coin].symbol
}

export default PortfolioManage
