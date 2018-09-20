const firebase = require('firebase')

firebase.initializeApp({
  apiKey: 'AIzaSyAX1K5fbyQmaNPTdw27wvdtRrCKtbSwoxE',
  authDomain: 'food-app-1a847.firebaseapp.com',
  databaseURL: 'https://food-app-1a847.firebaseio.com',
  projectId: 'food-app-1a847',
  storageBucket: 'food-app-1a847.appspot.com',
  messagingSenderId: '247224424719',
})

const auth = firebase.auth()
async function doWork() {
  const res = await auth.signInWithEmailAndPassword(
    'innolight1001@gmail.com',
    'vittuperkele',
  )
  const user = res.user

  if (user) {
    name = user.displayName
    email = user.email
    photoUrl = user.photoURL
    emailVerified = user.emailVerified
    uid = user.uid
    console.log(name, email, photoUrl, emailVerified, uid)
    const token = await user.getIdToken(true)
    console.log('User token:')
    console.log(token)
  }
}

doWork().catch(console.log)
