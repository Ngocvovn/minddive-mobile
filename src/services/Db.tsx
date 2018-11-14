import * as firebase from 'firebase'
import { init } from '../services/FireBase'

init()
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })
console.log('asdasdasd', db)
export default db
