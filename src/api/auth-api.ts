import BaseAPI from '../modules/base-api'
import HTTPTransport from '../modules/httpTransport'

const host = `${BaseAPI.host}/api/v2/auth`
const authAPIInstance = new HTTPTransport()

export interface ISigninData {
  login: string
  password: string
}

export interface ISignupData extends ISigninData {
  email: string
  first_name: string
  second_name: string
  phone: string
  password_again: string
}

export type AuthData = ISigninData | ISignupData

export default class AuthAPI extends BaseAPI {
  private data: AuthData

  constructor(data: AuthData) {
    super()
    this.data = data
  }

  public signin() {
    return authAPIInstance.post(`${host}/signin`, {
      data: JSON.stringify(this.data),
      headers: BaseAPI.headers,
    })
  }

  public signup() {
    return authAPIInstance.post(`${host}/signup`, {
      data: JSON.stringify(this.data),
      headers: BaseAPI.headers,
    })
  }

  public static user() {
    return authAPIInstance.get(`${host}/user`, { headers: BaseAPI.headers })
  }

  public static signout() {
    return authAPIInstance.post(`${host}/logout`, { headers: BaseAPI.headers })
  }
}
