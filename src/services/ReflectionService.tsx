import db from './Db'
import * as firebase from 'firebase'
export enum Feeling {
  Happy = 'Happy',
  Sad = 'Sad',
}
export interface Reflection {
  createdBy: string
  createdAt: firebase.firestore.Timestamp
  text?: string
  image?: string
  feeling?: Feeling
  updatedAt?: firebase.firestore.Timestamp
}

export const collection = db.collection('reflections')

export async function addReflection(reflection: Reflection) {
  try {
    await collection.add(reflection)
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
