import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import TeamSelect from '../components/newleague/TeamSelect'

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
};

class NewLeague extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      history,
    } = this.props;

    event.preventDefault();
  }

  render () {

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
            <PortfolioManage />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(NewLeague)
