import db from './Db'
import * as firebase from 'firebase'
export enum Feeling {
  Happy = 'Happy',
  Sad = 'Sad',
}
export interface Reflextion {
  createdBy?: string
  createdAt?: Date
  text?: string
  image?: string
  feeling?: Feeling
  updatedAt?: Date
}

const collection = db.collection('reflextions')

export async function addReflextion(reflextion: Reflextion) {
  try {
    let response = await collection.add(reflextion)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export async function deleteReflextion(uid: string) {
  try {
    await collection.doc(uid).delete()
  } catch (error) {
    console.log(error)
  }
}

export async function updateReflextion(uid: string, newReflextion: Reflextion) {
  try {
    await collection.doc(uid).update(newReflextion)
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
  let as: Reflextion = {
    updatedAt: new Date(),
    createdBy: id,
    text: 'daasdasdasd',
    feeling: Feeling.Sad,
  }
  try {
    let response = await updateReflextion('8AnCrAvpOGF8L2Ysgexn', as)
  } catch (error) {
    console.log(error)
  }
}*/
