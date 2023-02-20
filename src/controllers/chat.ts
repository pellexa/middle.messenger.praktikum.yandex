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
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
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
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
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

  public async getUsers(chatId: string) {
    try {
      chatId = chatId.replace(/\D+/g, '')
      const chatAPI = new ChatAPI()
      const response = await chatAPI.getUsers(chatId)

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        store.set('chats.activeChatUsers', JSON.parse(response.responseText))
        ChatController.getAlreadyAddedUsersToChat()
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При запросе пользователей чата что-то полшло не так.')
    }
  }

  public addOrDeleteUserToChat(data: {chatId: string, userId: string}) {
    const state = store.getState()
    const alreadyAddedUsers = state.chats?.alreadyAddedUsers

    if (!alreadyAddedUsers || alreadyAddedUsers.length < 1) {
      this.addUser(data)
      return
    }

    const user = alreadyAddedUsers.find(
      (item: {id: number}) => item.id === +data.userId)

    if (!user) {
      this.addUser(data)
      return
    }

    if (user._wasAdded) {
      this.deleteUser(data)
    } else {
      this.addUser(data)
    }
  }

  // Добавлем по одному пользователю (хотя api позволяет сразу много),
  // при клике по результату поиска.
  public async addUser(data: {chatId: string, userId: string}) {
    try {
      const chatId = data.chatId.replace(/\D+/g, '')
      const userId = data.userId.replace(/\D+/g, '')
      const resultData = { users: [userId], chatId }
      const chatAPI = new ChatAPI()
      const response = await chatAPI.addUserToChat(resultData)

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        await this.getUsers(chatId)
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При доблении пользователя в чат что-то полшло не так.')
    }
  }

  // Удаляем по одному пользователю (хотя api позволяет сразу много),
  // при клике по результату поиска.
  public async deleteUser(data: {chatId: string, userId: string}) {
    try {
      const chatId = data.chatId.replace(/\D+/g, '')
      const userId = data.userId.replace(/\D+/g, '')
      const resultData = { users: [userId], chatId }
      const chatAPI = new ChatAPI()
      const response = await chatAPI.deleteUserFromChat(resultData)

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        await this.getUsers(chatId)
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При удалении пользователя из чата что-то полшло не так.')
    }
  }

  public static getAlreadyAddedUsersToChat() {
    const state = store.getState()
    const searchUser = state.search?.users
    const activeChatUsers = state.chats?.activeChatUsers ? state.chats.activeChatUsers : []
    const alreadyAddedUsers = []

    if (searchUser && searchUser.length > 0) {
      searchLoop: for (let s = 0; s < searchUser.length; s++) {
        for (let a = 0; a < activeChatUsers.length; a++ ) {
          if (searchUser[s].id === activeChatUsers[a].id) {
            searchUser[s]._wasAdded = true
            alreadyAddedUsers.push(searchUser[s])
            continue searchLoop
          }
        }
        searchUser[s]._wasAdded = false
        alreadyAddedUsers.push(searchUser[s])
      }
    }

    store.set('chats.alreadyAddedUsers', null)
    store.set('chats.alreadyAddedUsers', alreadyAddedUsers)
  }

  public async getNewMessages(chatId: string) {
    try {
      chatId = chatId.replace(/\D+/g, '')
      const chatAPI = new ChatAPI()
      const response = await chatAPI.getNewMessages(chatId)

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        store.set('chats.' + chatId + '.countNewMessages',
          JSON.parse(response.responseText).unread_count)
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При получении непрочитанных сообщений что-то полшло не так.')
    }
  }

  public async getToken(chatId: string) {
    try {
      chatId = chatId.replace(/\D+/g, '')
      const chatAPI = new ChatAPI()
      const response = await chatAPI.getToken(chatId)

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 200) {
        store.set('chats.webSocketToken', JSON.parse(response.responseText).token)
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При получении WebSocket-токена что-то полшло не так. ')
    }
  }
}
