import ChatAPI from '../api/chat-api'
import Block from '../modules/block'
import Router from '../modules/Router'
import store from '../servises/store'
import { StoreEvents } from '../servises/store/store'
import { jsonFromData, validationFormData } from '../utils/formUtils'

type ChatFieldElements = Array<{
  field: Block
  validation: Block
}>

type Chat = {
  id: string
}

export default class ChatController {
  public event?: Event
  public fields?: ChatFieldElements
  public router

  constructor(event?: Event, fields?: ChatFieldElements) {
    this.event = event
    this.fields = fields
    this.router = Router.getInstance()
  }

  public async getChats() {
    try {
      const chatAPI = new ChatAPI()
      const response = await chatAPI.getChats()

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 200) {
        store.set('chats.list', JSON.parse(response.responseText))
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При получении списка чатов что-то полшло не так.')
    }
  }

  public async create() {
    try {
      const validationResults = validationFormData.call(this.event, this.fields)
      const isValid = Object.values(validationResults).every((value: boolean) => value === true)

      if (!isValid) {
        return
      }

      const json = jsonFromData.call(this.event, this.fields)
      const chatAPI = new ChatAPI(json) // нужно экранировать символы перед отправкой
      const response = await chatAPI.create()

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        alert(`Ошибка: ${response.response.reason}`)
      } else if (response.status === 200) {
        await this.getChats()
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При создании чата что-то полшло не так.')
    }
  }

  public async delete(id: string) {
    try {
      const chatAPI = new ChatAPI({ chatId: id.replace(/\D+/g, '') })
      const response = await chatAPI.delete()

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        alert(`Ошибка: ${response.response.reason}`)
      } else if (response.status === 403) {
        alert('У вас нет прав что бы удалить этот чат')
      } else if (response.status === 200) {
        const chatList = store.getState().chats.list
        const newChatList = chatList.filter((chat: Chat) => chat.id.toString() !== id)
        store.getState().chats.list = newChatList.length > 0 ? newChatList : null
        store.emit(StoreEvents.UPDATED)
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При удалени чата что-то полшло не так.')
    }
  }
}
