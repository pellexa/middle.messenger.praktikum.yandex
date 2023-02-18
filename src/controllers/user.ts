import UserAPI from '../api/user-api'
import Input from '../components/input'
import ValidationError from '../components/validationError'
import Block from '../modules/block'
import Router from '../modules/Router'
import store from '../servises/store'
import { jsonFromData, runValidation, validationFormData } from '../utils/formUtils'
import ChatController from './chat'

type UserFieldElements = Array<{
  field: Block
  validation: Block
}>

export default class UserController {
  public event?: Event
  public fields?: UserFieldElements
  public router

  constructor(event?: Event, fields?: UserFieldElements) {
    this.event = event
    this.fields = fields
    this.router = Router.getInstance()
  }

  public async changeProfile() {
    try {
      const validationResults = validationFormData.call(this.event, this.fields)
      const isValid = Object.values(validationResults).every((value: boolean) => value === true)

      if (!isValid) {
        return
      }

      const json = jsonFromData.call(this.event, this.fields)
      const userAPI = new UserAPI(json)
      const response = await userAPI.changeProfile()

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        store.set('auth.user', JSON.parse(response.responseText))
        alert('Данные обновлены.')
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При изменении данных что-то полшло не так.')
    }
  }

  public async changePassword() {
    try {
      const validationResults = validationFormData.call(this.event, this.fields)
      const isValid = Object.values(validationResults).every((value: boolean) => value === true)

      if (!isValid) {
        return
      }

      const json = jsonFromData.call(this.event, this.fields)
      const userAPI = new UserAPI(json)
      const response = await userAPI.changePassword()

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        // Clear input fields.
        this.fields!.forEach(item => {(item.field.element as HTMLInputElement).value = ''})
        alert('Пароль успешно изменен.')
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При смене пароля что-то полшло не так.')
    }
  }

  public async changeAvatar() {
    try {
      const form = (this.event!.target as HTMLElement).closest('form')

      if (!form) {
        throw new Error('Form not found. The button must be inside the form.')
      }

      const formData = new FormData(form)
      const avatarFile = formData.get('avatar') as File

      if (avatarFile.size <= 0) {
        alert('Файл не выбран.')
      }

      const userAPI = new UserAPI()
      const response = await userAPI.changeAvatar(formData)

      if (response.status === 401) {
        this.router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (response.status === 200) {
        store.set('auth.user', JSON.parse(response.responseText))
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При изменении аватара что-то полшло не так.')
    }
  }

  public static async search(
    event: Event,
    fields: { field: Input, validation: ValidationError }
  ) {
    try {
      const state = store.getState()
      if (!state.chats?.activeChatId) {
        store.set('chats.activeChatUsers', null)
      }

      const { value } = event.target as HTMLInputElement
      const searchList = document.querySelector('.search-list') as HTMLElement
      if (value.length < 3) {
        searchList.style.display = 'none'
        store.set('search.users', null)
        return
      }

      const { field, validation } = fields
      // Поиск осуществляется по логину, по нему и валидируем.
      const isValid = runValidation('login', value, field, validation)

      if (!isValid) {
        return
      }

      const userAPI = new UserAPI()
      const response = await userAPI.search({ login: value })

      if (response.status === 401) {
        const router = Router.getInstance()
        router.go('/')
      } else if (response.status === 400) {
        const reason = JSON.parse(response.response).reason
        validation.setProps({ error: reason })
      } else if (response.status === 200) {
        const responseData = JSON.parse(response.responseText)
        if (responseData.length < 1) {
          validation.setProps({ error: 'ничего не найдно' })
          return
        }

        store.set('search.users', JSON.parse(response.responseText))
        ChatController.getAlreadyAddedUsersToChat()

        searchList.style.display = 'block'
      } else if (response.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При выполнении поиска пользователей что-то полшло не так.')
    }
  }
}
