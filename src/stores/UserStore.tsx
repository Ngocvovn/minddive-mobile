import { observable, action, runInAction } from 'mobx'
import * as firebase from 'firebase'
import { UserInfo, addInfo, getInfo } from '../services/ReflectionService'

// store of all user info and actions such as add, get
class UserInfoStore {
  @observable
  userInfo: any
  @observable
  exist: boolean = false
  @observable
  state: string = 'loading'
  @observable
  error: any

  @action
  reset() {
    this.userInfo = null
    this.state = 'loading'
    this.exist = false
    this.error = ''
  }

  @action
  async addUserInfo(userInfo: UserInfo) {
    try {
      let result = await addInfo(userInfo)
      runInAction(() => {
        console.log(userInfo)
        this.userInfo = userInfo
        this.state = 'done'
        this.exist = true
      })
    } catch (e) {
      this.state = 'error'
      this.error = e
    }
  }

  @action
  async getUserInfo() {
    try {
      let result = await getInfo()
      runInAction(() => {
        if (result && result.exists) {
          this.exist = true
        }
        this.userInfo = result.data()
        this.state = 'done'
      })
    } catch (e) {
      this.state = 'error'
      this.error = e
    }
  }
}

export default new UserInfoStore()
