import { db } from './firebase'

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  })

export const onceGetUsers = () =>
  db.ref('users').once('value')

// Other Entity APIs ...

export const doSetTopCoin = (topCoin) =>
  db.ref('')
