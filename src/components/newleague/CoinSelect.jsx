import React, { Component } from 'react'
import {Card} from '../../components/Card.jsx'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx'

import { firebase, db } from '../../firebase'

class CoinSelect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      currentUser: null,
      coinData: null
    }
  }

  componentDidMount () {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )

    db.onceGetCoins().then(snapshot =>
      this.setState(() => ({ coinData: snapshot.val() }))
    )

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ currentUser: authUser }))
        : this.setState(() => ({ currentUser: null }))
    })
  }

  render () {
    var coins = []
    console.log(this.state.coinData[0])
    for (var j = 0; j < this.state.coinData.length; j++) {
      coins.push(
        <tr key={j}>
          <td>{this.state.coinData[j]}</td>
          <td>
            <Checkbox
              number={j}
              isChecked={!!(j === 1 || j === 2)}
            />
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
                category='Please select up to 10 coins for your portfolio'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={
                  <Table>
                    <tbody>
                      {coins.length === 0 ? 'Unable to load data' : coins}
                      <td />
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default CoinSelect
