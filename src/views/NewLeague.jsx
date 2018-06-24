import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import withAuthorization from '../components/withAuthorization'
import CoinSelect from '../components/newleague/CoinSelect'
import PortfolioManage from '../components/newleague/PortfolioManage'

const NewLeaguePage = ({ history }) =>
  <div>
    <h1>New League</h1>
    <NewLeague history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  userAdd: '',
  done: false
};

class NewLeague extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.completeCoinSelect = this.completeCoinSelect.bind(this)
  }

  onSubmit = (event) => {
    const {
      history,
    } = this.props;

    event.preventDefault();
  }

  completeCoinSelect() {
    this.setState({
      done: true
    })
  }

  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
            {this.state.done ? <PortfolioManage /> : <CoinSelect nextStep={this.completeCoinSelect} />}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
  

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(NewLeague)
