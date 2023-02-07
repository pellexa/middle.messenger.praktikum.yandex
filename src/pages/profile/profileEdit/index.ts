import profileEditTmpl from './profileEdit.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import Block from '../../../modules/block'
import { ProfileEditProps } from './types'
import Button from '../../../components/button'
import ProfileUploadAvatar from '../profileUploadAvatar'
import Label from '../../../components/label'
import ValidationError from '../../../components/validationError'
import Input from '../../../components/input'
import { jsonFromData, runValidation, validationFormData } from '../../../utils/formUtils'
import Link from '../../../components/link'
import Router from '../../../modules/Router'

const linkBack = new Link(
  'a',
  {
    tagAttrs: {
      class: 'link__icon-back',
      href: '/messanger',
    },
    content: IconBackSvg,
    events: {
      click: (event: Event) => {
        event.preventDefault()

        const element = event.currentTarget as HTMLLinkElement
        const router = Router.getInstance()
        const uri = element.getAttribute('href')

        if (!uri) {
          throw new Error('The href attribute must exist on the "a" tag.')
        }

        router.go(uri)
      },
    },
  }
)

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'сохранить',
  }
)

const acceptButtonUploadAvatar = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'поменять UploadAvatar',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        console.log('Button profileUploadAvatar event: ', event)
      },
    },
  }
)

const profileUploadAvatar = new ProfileUploadAvatar(
  'div',
  {
    tagAttrs: {
      class: 'modal',
    },
    acceptButton: acceptButtonUploadAvatar,
    events: {
      click: (event: Event) => {
        const elemModal = (document.querySelector('.modal') as HTMLElement)
        if (event.target === elemModal) {
          elemModal.style.display = 'none'
        }
      },
    },
  }
)

const formInputEmailLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'email',
    },
    text: 'Почта',
  }
)

const formInputLoginLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'login',
    },
    text: 'Логин',
  }
)

const formInputFirstNameLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'first_name',
    },
    text: 'Имя',
  }
)

const formInputSecondNameLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'second_name',
    },
    text: 'Фамилия',
  }
)

const formInputDisplayNameLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'display_name',
    },
    text: 'Имя в чате',
  }
)

const formInputPhoneLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'phone',
    },
    text: 'Телефон',
  }
)

const attrs = {
  tagAttrs: {
    class: 'input-row__help',
  },
}

const formInputEmailValidationError = new ValidationError('span', attrs)
const formInputLoginValidationError = new ValidationError('span', attrs)
const formInputFirstNameValidationError = new ValidationError('span', attrs)
const formInputSecondNameValidationError = new ValidationError('span', attrs)
const formInputDisplayNameValidationError = new ValidationError('span', attrs)
const formInputPhoneValidationError = new ValidationError('span', attrs)

const apiResponseProfile = {
  id: 123,
  first_name: 'Petya',
  second_name: 'Pupkin',
  display_name: 'Petya Pupkin',
  login: 'userLogin',
  email: 'my@email.com',
  phone: '89223332211',
  avatar: '/path/to/avatar.jpg',
}

const formInputEmail = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'Почта',
      value: apiResponseProfile.email,
    },
    events: {
      focus: () => {
        formInputEmailValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('email', value, formInputEmail, formInputEmailValidationError)
      },
    },
  }
)

const formInputLogin = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'login',
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
      value: apiResponseProfile.login,
    },
    events: {
      focus: () => {
        formInputLoginValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('login', value, formInputLogin, formInputLoginValidationError)
      },
    },
  }
)

const formInputFirstName = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'first_name',
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя',
      value: apiResponseProfile.first_name,
    },
    events: {
      focus: () => {
        formInputFirstNameValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('first_name', value, formInputFirstName, formInputFirstNameValidationError)
      },
    },
  }
)

const formInputSecondName = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'second_name',
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия',
      value: apiResponseProfile.second_name,
    },
    events: {
      focus: () => {
        formInputSecondNameValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('second_name', value, formInputSecondName, formInputSecondNameValidationError)
      },
    },
  }
)

const formInputDisplayName = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'display_name',
      name: 'display_name',
      type: 'text',
      placeholder: 'Фамилия',
      value: apiResponseProfile.display_name,
    },
    events: {
      focus: () => {
        formInputDisplayNameValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation(
          'display_name',
          value,
          formInputDisplayName,
          formInputDisplayNameValidationError
        )
      },
    },
  }
)

const formInputPhone = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'phone',
      name: 'phone',
      type: 'text',
      placeholder: 'Телефон',
      value: apiResponseProfile.phone,
    },
    events: {
      focus: () => {
        formInputPhoneValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('phone', value, formInputPhone, formInputPhoneValidationError)
      },
    },
  }
)

class ProfileEdit extends Block {
  constructor(tagName: string, props: ProfileEditProps) {
    // if (!props.apiResponseProfile) {
    //   throw new Error('ProfileEdit apiResponseProfile is undefined.')
    // }

    super(tagName, props)
  }

  componentDidMount() {
    this.clickByAvatar()
  }

  clickByAvatar() {
    const elemAvatar = document.querySelector('.avatar')
    const elemModal = (document.querySelector('.modal') as HTMLElement)

    if (elemAvatar) {
      elemAvatar.addEventListener('click', () => {
        elemModal.style.display = 'block'
      })
    }
  }

  render() {
    return this.compile(profileEditTmpl)
  }
}

const profileEditHTML = new ProfileEdit('div', {
  tagAttrs: {
    class: 'profile',
  },
  formInputEmailLabel,
  formInputEmail,
  formInputEmailValidationError,

  formInputLoginLabel,
  formInputLogin,
  formInputLoginValidationError,

  formInputFirstNameLabel,
  formInputFirstName,
  formInputFirstNameValidationError,

  formInputSecondNameLabel,
  formInputSecondName,
  formInputSecondNameValidationError,

  formInputDisplayNameLabel,
  formInputDisplayName,
  formInputDisplayNameValidationError,

  formInputPhoneLabel,
  formInputPhone,
  formInputPhoneValidationError,

  linkBack,
  profileUploadAvatar,
  acceptButton,
  events: {
    submit: (event: Event) => {
      event.preventDefault()

      const fields = [
        {
          field: formInputEmail,
          validation: formInputEmailValidationError,
        },
        {
          field: formInputLogin,
          validation: formInputLoginValidationError,
        },
        {
          field: formInputFirstName,
          validation: formInputFirstNameValidationError,
        },
        {
          field: formInputSecondName,
          validation: formInputSecondNameValidationError,
        },
        {
          field: formInputDisplayName,
          validation: formInputDisplayNameValidationError,
        },
        {
          field: formInputPhone,
          validation: formInputPhoneValidationError,
        },
      ]

      const validationResults = validationFormData.call(event, fields)
      const result = Object.values(validationResults).every((value: boolean) => value === true)

      const json = jsonFromData.call(event, fields)
      console.log('json: ', json)

      if (result) {
        console.log('send api request')
      }
    },
  },
})

export default profileEditHTML
