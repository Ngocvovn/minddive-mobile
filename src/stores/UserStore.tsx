import { observable, action, runInAction } from 'mobx'
import * as firebase from 'firebase'
import { UserInfo, addInfo } from '../services/ReflectionService'
class UserInfoStore {
  @observable
  userInfo: UserInfo = {}
  @observable
  state: string = 'loading'
  @observable
  error: any

  @action
  async addUserInfo(userInfo: UserInfo) {
    try {
      let result = await addInfo(userInfo)
      console.log(result)
      runInAction(() => {
        this.userInfo = userInfo
        this.state = 'done'
      })
    } catch (e) {
      this.state = 'error'
      this.error = e
    }
  }
}

export default new UserInfoStore()
