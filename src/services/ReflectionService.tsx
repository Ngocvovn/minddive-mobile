import * as firebase from 'firebase'

//  instance of database
import db from './Db'

export interface Reflection {
  createdBy: string
  createdAt: firebase.firestore.Timestamp
  text?: string
  image?: string
  feeling?: string
  updatedAt?: firebase.firestore.Timestamp
  video?: string
  answers?: Answer[]
  session: number
}

export interface UserInfo {
  dueDate?: firebase.firestore.Timestamp
  isMother?: boolean
}

export interface Answer {
  answer: string
  questionNumber: number
}

//collections in no sql database
export const collection = db.collection('reflections')
export const userCollection = db.collection('users')
export const answer = db.collection('answers')

export async function addReflection(reflection: Reflection) {
  try {
    const res = await collection.add(reflection)
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function deleteReflection(uid: string) {
  try {
    await collection.doc(uid).delete()
  } catch (error) {
    console.log(error)
  }
}

export async function updateReflection(uid: string, newReflection: Reflection) {
  try {
    await collection.doc(uid).update(newReflection)
  } catch (error) {
    console.log(error)
  }
}

export async function addInfo(userInfo: UserInfo) {
  const user = firebase.auth().currentUser || { uid: '' }
  try {
    await userCollection.doc(user.uid).set(userInfo)
  } catch (e) {
    console.log(e)
  }
}

export async function getInfo() {
  const user = firebase.auth().currentUser || { uid: '' }
  try {
    console.log('id', user.uid)
    let result = await userCollection.doc(user.uid).get()
    return result
  } catch (e) {
    console.log(e)
  }
}
// example code
/*async function add() {
  let user = firebase.auth().currentUser
  let id: string = ''
  if (user !== null) {
    id = user.uid
  }
  let as: Reflection = {
    updatedAt: new Date(),
    createdBy: id,
    text: 'daasdasdasd',
    feeling: Feeling.Sad,
  }
  try {
    let response = await updateReflection('8AnCrAvpOGF8L2Ysgexn', as)
  } catch (error) {
    console.log(error)
  }
}*/
