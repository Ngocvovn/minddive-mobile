import * as firebase from 'firebase'
require('firebase/firestore')

export function init() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYlM5kr5rYCfCY9SzkqDZR19VfKygoFxk',
      authDomain: 'mindive-449e6.firebaseapp.com',
      databaseURL: 'https://mindive-449e6.firebaseio.com',
      projectId: 'mindive-449e6',
      storageBucket: 'mindive-449e6.appspot.com',
      messagingSenderId: '49215748476',
    })
    firebase.firestore().settings({ timestampsInSnapshots: true })
  }
}
