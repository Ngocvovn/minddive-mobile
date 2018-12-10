import * as firebase from 'firebase'
import { init } from '../services/FireBase'

init()
// return firestore database instance
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })
export default db
