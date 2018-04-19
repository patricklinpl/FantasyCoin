import React, { Component } from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import Checkbox from '../../elements/CustomCheckbox/CustomCheckbox.jsx'
import Card from '../Card'
import { firebase, db } from '../../firebase'

import withAuthorization from '../withAuthorization'

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

  componentDidMount () {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(byPropKey('currentUser', authUser))
        : this.setState(byPropKey('currentUser', null))
    })
  }

  onSubmit = (event) => {
    const {
      user0,
      user1,
      user2,
      user3,
      user4,
    } = this.state;

    const {
      history
    } = this.props;

    db.doCreateLeague(this.state.currentUser)

    event.preventDefault();
  }

  render () {
    const {
      user0,
      user1,
      user2,
      user3,
      user4,
      error,
    } = this.state;

    const isInvalid =
    user0 === '' ||
    user1 === '' ||
    user2 === '' ||
    user3 === '' ||
    user4 === '';
    return (
              <Card
                hCenter
                title='Pick your team here'
                category='Please select up to 5 people to compete against'
                ctTableResponsive ctTableFullWidth ctTableLeague
                content={
                  <form onSubmit={this.onSubmit}>
                    <input
                      value={user0}
                      onChange={event => this.setState(byPropKey('user0', event.target.value))}
                      type='text'
                      placeholder='User'
                    />
                    <input
                      value={user1}
                      onChange={event => this.setState(byPropKey('user1', event.target.value))}
                      type='text'
                      placeholder='User'
                    />
                    <input
                      value={user2}
                      onChange={event => this.setState(byPropKey('user2', event.target.value))}
                      type='text'
                      placeholder='User'
                    />
                    <input
                      value={user3}
                      onChange={event => this.setState(byPropKey('user3', event.target.value))}
                      type='text'
                      placeholder='User'
                    />
                    <input
                      value={user4}
                      onChange={event => this.setState(byPropKey('user4', event.target.value))}
                      type='text'
                      placeholder='User'
                    />
                    <button disabled={isInvalid} type="submit">
                      Add
                    </button>
                  </form>
                }
              />
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(NewLeague)
