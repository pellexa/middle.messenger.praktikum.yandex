import BaseAPI from '../modules/base-api'
import HTTPTransport from '../modules/httpTransport'

const host = `${BaseAPI.host}/api/v2/user`
const userAPIInstance = new HTTPTransport()

type profileData = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

type profilePassword = {
  oldPassword: string
  newPassword: string
}

type UserData = profileData | profilePassword
export default class UserAPI extends BaseAPI {
  private data?: UserData

  constructor(data?: UserData) {
    super()

    this.data = data
  }

  changeProfile() {
    return userAPIInstance.put(`${host}/profile`, {
      headers: BaseAPI.headers,
      data: JSON.stringify(this.data),
    })
  }

  changePassword() {
    return userAPIInstance.put(`${host}/password`, {
      headers: BaseAPI.headers,
      data: JSON.stringify(this.data),
    })
  }
}
