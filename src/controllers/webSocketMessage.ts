import store from '../servises/store'
import ChatController from './chat'

export type Message = {
  id: number
  chat_id?: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
      id: number
      user_id: number
      path: string
      filename: string
      content_type: string
      content_size: number
      upload_date: string
  }
  _isMy?: boolean
  _isText?: boolean
  _messageTime?: string
}

interface IWebSocketMessage {
  connect(chatId: string): void
  sendMessage(message: string): void
  getMessages(): void
}

export default class WebSocketMessage {
  private static instance: IWebSocketMessage
  private url = 'wss://ya-praktikum.tech/ws/chats'
  private socket: WebSocket | null
  private timerId: ReturnType<typeof setInterval>

  public static getInstance(): IWebSocketMessage {
    if (!WebSocketMessage.instance) {
      WebSocketMessage.instance = new WebSocketMessage()
    }
    return WebSocketMessage.instance
  }

  public sendPing() {
    this.socket?.send(JSON.stringify({ type: 'ping' }))
  }

  public sendMessage(message: string) {
    this.socket?.send(JSON.stringify({ content: message, type: 'message' }))
  }

  public getMessages(offsetId: string = '0') {
    this.socket?.send(JSON.stringify({ content: offsetId, type: 'get old' }))
  }

  private async connecting(authUserId: string, chatId: string) {
    const chatAPI = new ChatController()
    await chatAPI.getToken(chatId)
    const token = store.getState().chats!.webSocketToken
    this.socket = new WebSocket(`${this.url}/${authUserId}/${chatId}/${token}`)
  }

  private disconnect() {
    this.socket?.close()
    this.socket = null
    clearInterval(this.timerId)
  }

  public async connect(chatId: string) {
    const state = store.getState()
    const prevActiveChatId = state.chats!.prevActiveChatId
    const authUserId = state.auth!.user.id.toString()
    chatId = chatId.replace(/\D+/g, '')

    if (prevActiveChatId === chatId) {
      if (this.socket && this.socket.readyState === WebSocket.CLOSED) {
        await this.connecting(authUserId, chatId)
      }
    } else {
      if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
        this.disconnect()
      }

      await this.connecting(authUserId, chatId)
    }

    if (!this.socket) {
      console.log('Что-то не отрабатывает в логике подключения к сокету.')
      return
    }

    this.socket.addEventListener('open', () => {
      this.timerId = setInterval(() => this.sendPing(), 50000)
      this.getMessages()
    })

    this.socket.addEventListener('message', event => {
      try {
        const data = JSON.parse(event.data)

        if (!Array.isArray(data) && !data.type?.match(/^message|file|sticker$/i)) {
          return
        }

        this._handlerMessage(authUserId, +chatId, data)
      } catch (error) {
        console.log('При получении данных в WebSocketMessage что-то полшло не так.')
      }
    })

    this.socket.addEventListener('close', () => {
      this.disconnect()
    })

    this.socket.addEventListener('error', event => {
      console.log('Ошибка', event)
    })
  }

  private _additionalFields(item: Message, authUserId: string) {
    item._isMy = item.user_id === +authUserId ? true : false
    item._isText = item.type === 'message' ? true : false

    const datetime = new Date(Date.parse(item.time))
    const minutes = (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes()
    item._messageTime = datetime.getHours() + ':' + minutes
    return item
  }

  private async _handlerMessage(authUserId: string, chatId: number, data: Message | Message[]) {
    const state = store.getState()

    if (!state.chats) {
      console.log('state.chats must exist.')
      return
    }

    const messages = state.chats[chatId]?.messages
      ? { [chatId]: state.chats[chatId]?.messages }
      : { [chatId]: [] }

    if (Array.isArray(data)) {
      dataLoop: for (let d = 0; d < data.length; d++) {
        const item = data[d]
        for (let m = 0; m < messages[chatId].length; m++) {
          if (item.id === messages[chatId][m].id) {
            continue dataLoop
          }
        }
        messages[chatId].push(this._additionalFields(item, authUserId))
      }

      store.set('chats.' + chatId + '.messages', null)
      store.set('chats.' + chatId + '.messages', messages[chatId].reverse())

      const chatAPI = new ChatController()
      await chatAPI.getNewMessages(chatId.toString())
      const countNewMessages = state.chats[chatId].countNewMessages

      // Здесь рекурсия, загружает непрочитанные сообщения пока не загрузит все.
      if (countNewMessages && countNewMessages !== 0) {
        const lastId = data[data.length - 1].id.toString()
        messages[chatId].reverse()
        this.getMessages(lastId)
        await chatAPI.getChats()
      }
    } else if (typeof data === 'object') {
      messages[chatId].push(this._additionalFields(data, authUserId))

      store.set('chats.' + chatId + '.messages', null)
      store.set('chats.' + chatId + '.messages', messages[chatId])
    }
  }
}
