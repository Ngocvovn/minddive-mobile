import { observable, action, runInAction } from 'mobx'
import * as firebase from 'firebase'
import {
  addReflection,
  Reflection,
  Feeling,
  collection,
} from '../services/ReflectionService'
class DiaryStore {
  @observable
  reflections: Array<Reflection> = []
  @observable
  state: string = 'loading'
  @observable
  error: any

  @action
  async getAll() {
    let user = firebase.auth().currentUser || { uid: '' }
    try {
      let query = await collection.where('createdBy', '==', user.uid).get()
      runInAction(() => {
        this.reflections = []
        query.docs.forEach(doc => {
          this.reflections.push(doc.data())
        })
        this.state = 'done'
      })
    } catch (e) {
      this.state = 'error'
      this.error = e
    }
  }

  @action
  async addReflection(reflection: Reflection) {
    try {
      let result = await addReflection(reflection)
      runInAction(() => {
        if (result) {
          this.reflections.unshift(reflection)
        }
        this.state = 'done'
      })
    } catch (e) {
      this.state = 'error'
      this.error = e
    }
  }
}

export default new DiaryStore()
