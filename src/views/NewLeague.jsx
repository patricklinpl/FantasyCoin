import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import Checkbox from '../elements/CustomCheckbox/CustomCheckbox.jsx'
import Card from '../components/Card'
import TeamSelect from '../components/newleague/TeamSelect'

import withAuthorization from '../components/withAuthorization'

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
      userAdd,
    } = this.state;

    const {
      history,
    } = this.props;

    event.preventDefault();
  }

  render () {
    const {
      userAdd
    } = this.state;

    const isInvalid =
      userAdd === [];
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
            <TeamSelect />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(NewLeague)
