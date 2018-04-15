import * as firebase from 'firebase'

const prodConfig = {
  apiKey: 'AIzaSyBLYyWwHeY_sAlIjmPUTXkuhaYcn7JBqK0',
  authDomain: 'react-firebase-tutorial-prod.firebaseapp.com',
  databaseURL: 'https://react-firebase-tutorial-prod.firebaseio.com',
  projectId: 'react-firebase-tutorial-prod',
  storageBucket: 'react-firebase-tutorial-prod.appspot.com',
  messagingSenderId: '1048448709246'
}

const devConfig = {
  apiKey: 'AIzaSyDuZBPOtEt18c_AqHoNYkh3ApIV0HBOPuQ',
  authDomain: 'react-firebase-tutorial-ed319.firebaseapp.com',
  databaseURL: 'https://react-firebase-tutorial-ed319.firebaseio.com',
  projectId: 'react-firebase-tutorial-ed319',
  storageBucket: 'react-firebase-tutorial-ed319.appspot.com',
  messagingSenderId: '816963148960'
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
