import * as firebase from 'firebase'

import db from './Db'

export interface Reflection {
  createdBy: string
  createdAt: firebase.firestore.Timestamp
  text?: string
  image?: string
  feeling?: string
  updatedAt?: firebase.firestore.Timestamp
  video?: string
}

export interface UserInfo {
  dueDate?: firebase.firestore.Timestamp
  isMother?: boolean
}

export const collection = db.collection('reflections')
export const userCollection = db.collection('users')

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
