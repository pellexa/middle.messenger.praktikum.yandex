import AuthAPI from '../api/auth-api'
import Block from '../modules/block'
import Router from '../modules/Router'
import store from '../servises/store'
import { jsonFromData, validationFormData } from '../utils/formUtils'

type LoginFieldElements = Array<{
  field: Block
  validation: Block
}>

export default class AuthController {
  public event: Event
  public fields?: LoginFieldElements
  public router

  constructor(event: Event, fields?: LoginFieldElements) {
    this.event = event
    this.fields = fields
    this.router = Router.getInstance()
  }

  public async signin() {
    try {
      const validationResults = validationFormData.call(this.event, this.fields)
      const isValid = Object.values(validationResults).every((value: boolean) => value === true)

      if (!isValid) {
        return
      }

      const json = jsonFromData.call(this.event, this.fields)
      const authAPI = new AuthAPI(json) // нужно экранировать символы перед отправкой
      const responseAuth = await authAPI.signin()

      if (responseAuth.status === 401) {
        alert('Login or password incorrect.')
      } else if (responseAuth.status === 400) {
        const reason = JSON.parse(responseAuth.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (responseAuth.status === 200) {
        await this.getUser()

        this.router.go('/messanger')

        // Clear input fields.
        this.fields!.forEach(item => (item.field.element as HTMLInputElement).value = '')
      } else if (responseAuth.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При аутентификации что-то полшло не так.')
    }
  }

  public async getUser() {
    try {
      const response = await AuthAPI.user()

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
      console.log('При получении аутентифицированного пользователя что-то полшло не так.')
    }
  }

  public async signup() {
    try {
      const validationResults = validationFormData.call(this.event, this.fields)
      const isValid = Object.values(validationResults).every((value: boolean) => value === true)

      if (!isValid) {
        return
      }

      const json = jsonFromData.call(this.event, this.fields)
      const authAPI = new AuthAPI(json) // нужно экранировать символы перед отправкой
      const responseAuth = await authAPI.signup()

      if (responseAuth.status === 401) {
        alert('Login or password incorrect.')
      } else if (responseAuth.status === 400) {
        const reason = JSON.parse(responseAuth.response).reason
        alert(`Ошибка: ${reason}`)
      } else if (responseAuth.status === 200) {
        await this.getUser()

        this.router.go('/messanger')

        // Clear input fields.
        this.fields!.forEach(item => (item.field.element as HTMLInputElement).value = '')
      } else if (responseAuth.status.toString().match(/^5\d\d$/)) {
        alert('Фиксим проблему...')
      }
    } catch (error) {
      console.log('При регистрации что-то полшло не так.')
    }
  }

  public async signuot() {
    await AuthAPI.signout()

    const element = this.event.target as HTMLLinkElement
    const router = Router.getInstance()
    const uri = element.getAttribute('href')

    if (!uri) {
      throw new Error('The href attribute must exist on the "a" tag.')
    }

    router.go(uri)
  }
}
