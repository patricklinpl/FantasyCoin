import * as firebase from 'firebase'

const prodConfig = {
  apiKey: "AIzaSyBLcwOXcl8bS2FaJk-Ee2yGFwdImE54rss",
  authDomain: "fantasycoin-prod.firebaseapp.com",
  databaseURL: "https://fantasycoin-prod.firebaseio.com",
  projectId: "fantasycoin-prod",
  storageBucket: "fantasycoin-prod.appspot.com",
  messagingSenderId: "363231009012"
}

const devConfig = {
  apiKey: 'AIzaSyA4fZtPpQIMvUbDk887ul2ACUlPYNeri28',
  authDomain: 'fantasycoin-ddbe3.firebaseapp.com',
  databaseURL: 'https://fantasycoin-ddbe3.firebaseio.com',
  projectId: 'fantasycoin-ddbe3',
  storageBucket: 'fantasycoin-ddbe3.appspot.com',
  messagingSenderId: '930678974720'
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()

const auth = firebase.auth()

export {
  db,
  auth
}
