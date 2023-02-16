import BaseAPI from '../modules/base-api'
import HTTPTransport from '../modules/httpTransport'

const host = `${BaseAPI.host}/api/v2/chats`
const chatAPIInstance = new HTTPTransport()

export type ChatData = {
  chatId?: string
  title?: string
}

export default class ChatAPI extends BaseAPI {
  private data?: ChatData

  constructor(data?: ChatData) {
    super()

    this.data = data
  }

  public getChats() {
    return chatAPIInstance.get(host, { headers: BaseAPI.headers })
  }

  public create() {
    return chatAPIInstance.post(host, {
      data: JSON.stringify(this.data),
      headers: BaseAPI.headers,
    })
  }

  public delete() {
    return chatAPIInstance.delete(host, {
      data: JSON.stringify(this.data),
      headers: BaseAPI.headers,
    })
  }
}
