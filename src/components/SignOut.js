import React from 'react'
import { Button } from 'react-bootstrap'

import { auth } from '../firebase'

var test = {
  padding: '4px 8px'
}

const SignOutButton = () =>
  <Button
    type='button'
    style={test}
    onClick={auth.doSignOut}
  >
    Sign Out
  </Button>

export default SignOutButton
