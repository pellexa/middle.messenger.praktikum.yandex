import Search from '../../components/search'
import IconSearchSvg from '../../components/icons/IconSearch.svg'
import IconAttachSvg from '../../components/icons/IconAttach.svg'
import IconSendSvg from '../../components/icons/IconSend.svg'
import ChatList from '../../components/chatList'
import MenuDotHeader from '../../components/menuDotHeader'
import Message from '../../components/message'
import Time from '../../components/time'
import Block from '../../modules/block'
import mainTmpl from './main.tmpl'
import { MainProps } from './types'
import ValidationError from '../../components/validationError'
import Input from '../../components/input'
import { jsonFromData, runValidation, validationFormData } from '../../utils/formUtils'
import Button from '../../components/button'
import Label from '../../components/label'
import Router from '../../modules/Router'
import Link from '../../components/link'
import Wrapper from '../../components/wrapper'
import Modal from '../../components/modal'
import ChatController from '../../controllers/chat'
import store from '../../servises/store'
import AuthController from '../../controllers/auth'
import { State } from '../../servises/store/store'
import connect from '../../servises/store/connect'
import UserController from '../../controllers/user'
import SearchUserList from '../../components/searchUserList'

const attrs = {
  tagAttrs: {
    class: 'input-row__help',
  },
}
const searchInputValidationError = new ValidationError('span', attrs)

const searchInput = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input input_bg-color_transparent',
      id: 'search',
      name: 'search',
      type: 'text',
      placeholder: 'Поиск',
    },
    events: {
      focus: () => {
        searchInputValidationError.setProps({ error: null })
      },

      blur: () => {
        searchInputValidationError.setProps({ error: null })
      },

      input: (event: Event) => {
        event.preventDefault()

        const fields = {
          field: searchInput,
          validation: searchInputValidationError,
        }

        // В конроллере результат поиска скрывается и отображается.
        UserController.search(event, fields)
      },
    },
  }
)

const iconSearch = new Wrapper(
  'div',
  {
    tagAttrs: {
      class: 'search__icon',
    },
    content: IconSearchSvg,
  }
)

const searchWrapperInput = new Wrapper(
  'div',
  {
    tagAttrs: {
      class: 'left-side__search-input-wrapper',
    },
    content: [iconSearch, searchInput],
  }
)

const searchUserList = new SearchUserList(
  'ul',
  {
    tagAttrs: {
      class: 'search-list',
    },
    events: {
      click: (event: Event) => {
        const element = event.target as HTMLElement
        const li = element.closest('li')
        if (!li) {
          return
        }

        const state = store.getState()
        const activeChatId = state.chats?.activeChatId
        if (!activeChatId) {
          alert('Выбирите чат в который нужно добавить пользователя')
          return
        }

        const chatController = new ChatController()
        chatController.addOrDeleteUserToChat({ chatId: activeChatId, userId: li.dataset.userId! })
      },
    },
  }
)

const search = new Search(
  'form',
  {
    tagAttrs: {
      class: 'search',
    },
    searchInputValidationError,
    searchWrapperInput,
    searchUserList,
  }
)

const chatButtonShowModal = new Button(
  'button',
  {
    tagAttrs: {
      id: 'show_modal_chat',
      class: 'button',
      type: 'button',
    },
    text: 'добавить чат',
    events: {
      click: () => {
        const elemModal = (document.querySelector('.modal') as HTMLElement)
        elemModal.style.display = 'block'
      },
    },
  }
)

const chatModalInputValidationError = new ValidationError('span', attrs)
const chatModalInput = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input input_border-radius_m input_bg-color_lightgray',
      id: 'title',
      name: 'title',
      type: 'text',
      placeholder: 'название чата',
    },
    events: {
      focus: () => {
        chatModalInputValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('title', value, chatModalInput, chatModalInputValidationError)
      },
    },
  }
)

const chatModalAddButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'создать',
  }
)

const chatModalForm = new Wrapper(
  'form',
  {
    tagAttrs: {
      class: 'modal__form',
    },
    content: [chatModalInput, chatModalInputValidationError, chatModalAddButton],
    events: {
      submit: (event: Event) => {
        event.preventDefault()

        const fields = [
          {
            field: chatModalInput,
            validation: chatModalInputValidationError,
          },
        ]

        const chatController = new ChatController(event, fields)
        chatController.create()
      },
    },
  }
)

const chatModal = new Modal(
  'div',
  {
    tagAttrs: {
      class: 'modal',
    },
    form: chatModalForm,
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

function handleRemoveChat(e: Event) {
  const chatId = (e.target as HTMLElement).dataset.chatId!
  const chatController = new ChatController()
  chatController.delete(chatId)
}

const chatList = new ChatList(
  'ul',
  {
    tagAttrs: {
      class: 'chat-list',
    },
    chatButtonShowModal,
    events: {
      click: (event: Event) => {
        const ul = event.currentTarget as HTMLElement
        ul.querySelectorAll('li').forEach((li: HTMLElement) => li.style.backgroundColor = '')

        // Скрыаем "удалить чат" и удаляем событие для всего списка чатов.
        const removeElements = ul.querySelectorAll('.chat__remove')
        removeElements.forEach((r: HTMLElement) => {
          r.removeEventListener('click', handleRemoveChat)
          r.style.display = ''
        })

        // в Message(s) подписываемся на это свойство и там же перерисовываем ленту сообщений
        store.set('chats.activeChatId', null)

        const element = event.target as HTMLElement
        const elementLi = element.closest('li')
        if (!elementLi) {
          return
        }
        // Клик выполнен по li-эементу или внутри него.

        elementLi.style.backgroundColor = '#efefef'
        const chatId = elementLi.dataset.chatId!

        // в Message(s) подписываемся на это свойство и там же перерисовываем ленту сообщений
        store.set('chats.activeChatId', chatId)

        const chatController = new ChatController()
        chatController.getUsers(chatId)

        // Показываем "удалить чат" и навешиваем событие
        const removeElement = elementLi.nextElementSibling as HTMLElement
        removeElement.style.display = 'inline-block'
        removeElement.addEventListener('click', handleRemoveChat)
      },
    },
  }
)

/**
  * Не нашёл описание api для ленты сообщений в Swagger
  * (https://ya-praktikum.tech/api/v2/swagger/#/). Придумал свой json.
  */
const apiResponseMessages = {
  chat_id: 123,
  messages: [
    {
      time: '2020-01-02T14:22:22.000Z',
      content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в \
                какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\
                Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все \
                тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой \
                забрали только кассеты с пленкой.

                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на \
                ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из \
                них недавно продали на аукционе за 45000 евро.`,
      is_my: false,
    },
    {
      time: '2020-01-02T14:22:23.000Z',
      content: { image: './path/to/image.jpg' },
      is_my: false,
    },
    {
      time: '2020-01-03T14:23:12.000Z',
      content: 'круто!',
      is_my: true,
    },
  ],
}

const listMessage = apiResponseMessages.messages.map((msg, index, array) => {
  const datetime = new Date(Date.parse(msg.time))
  const day = datetime.getDate()

  let resultDate: string | null = null
  if (index - 1 < 0) {
    resultDate = msg.time
  } else {
    const prevDatetime = new Date(Date.parse(array[index - 1].time))
    const prevDay = prevDatetime.getDate()
    if (day !== prevDay) {
      resultDate = msg.time
    }
  }

  let time: Time | null = null
  if (resultDate) {
    time = new Time(
      'time',
      {
        tagAttrs: {
          class: 'messages-date',
        },
        date: resultDate,
      }
    )
  }

  const message = new Message(
    'div',
    {
      msg,
      isImage: typeof msg.content === 'object' && msg.content.image ? true : false,
      isMy: msg.is_my,
      time,
    }
  )

  return message
})

const menuDotHeaderItems = {
  '/settings': 'мой профиль',
}

const menuDotHeaderItemComponents = Object.entries(menuDotHeaderItems).map(([href, content]) => {
  const link = new Link(
    'a',
    {
      tagAttrs: {
        href,
        class: 'link link_color_blue',
      },
      content,
      events: {
        click: (event: Event) => {
          event.preventDefault()

          const element = event.target as HTMLLinkElement
          const router = Router.getInstance()
          const uri = element.getAttribute('href')

          if (!uri) {
            throw new Error('The href attribute must exist on the "a" tag.')
          }

          // Hide menu.
          const elemMenuItems = document.querySelector('.menu-dot__items') as HTMLElement
          elemMenuItems.style.display = 'none'

          router.go(uri)
        },
      },
    }
  )

  const wrapper = new Wrapper(
    'li',
    {
      tagAttrs: {
        class: 'menu-dot__item',
      },
      content: link,
    }
  )

  return wrapper
})

const linkSignout = new Link(
  'a',
  {
    tagAttrs: {
      href: '/',
      class: 'link link_color_blue',
    },
    content: 'Выход',
    events: {
      click: async (event: Event) => {
        event.preventDefault()

        // Hide menu.
        const elemMenuItems = document.querySelector('.menu-dot__items') as HTMLElement
        elemMenuItems.style.display = 'none'

        const authController = new AuthController(event)
        authController.signuot()
      },
    },
  }
)

const wrapperSignout = new Wrapper(
  'li',
  {
    tagAttrs: {
      class: 'menu-dot__item',
    },
    content: linkSignout,
  }
)

menuDotHeaderItemComponents.push(wrapperSignout)

const menuDotHeader = new MenuDotHeader(
  'div',
  {
    tagAttrs: {
      class: 'menu-dot',
    },
    menuDotHeaderItemComponents,
    events: {
      click: () => {
        const elemMenuItems = document.querySelector('.menu-dot__items') as HTMLElement

        if (elemMenuItems) {
          elemMenuItems.style.display = 'block'
        }
      },
    },
  }
)

const formInputFileLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'label',
      for: 'file',
    },
    text: IconAttachSvg,
  }
)

const formInputFile = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input_display',
      id: 'file',
      name: 'file',
      type: 'file',
    },
  }
)

const sendButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'content__button-send',
      type: 'submit',
    },
    text: IconSendSvg,
  }
)

const formInputMessageValidationError = new ValidationError('span', attrs)

const formInputMessage = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input input_border-radius_m input_bg-color_lightgray',
      id: 'message',
      name: 'message',
      type: 'text',
      placeholder: 'Сообщение',
    },
    events: {
      focus: () => {
        formInputMessageValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('message', value, formInputMessage, formInputMessageValidationError)
      },
    },
  }
)

const formMessage = new Wrapper(
  'form',
  {
    tagAttrs: {
      class: 'content__form',
    },
    content: [
      formInputFileLabel,
      formInputFile,
      formInputMessage,
      sendButton,
    ],
    events: {
      submit: (event: Event) => {
        event.preventDefault()

        const fields = [
          {
            field: formInputFile,
            validation: formInputMessageValidationError,
          },
          {
            field: formInputMessage,
            validation: formInputMessageValidationError,
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
  }
)

class Main extends Block {
  constructor(tagName: string, props: MainProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(mainTmpl)
  }
}

function mapMainToProps(state: State) {
  return {
    selectedChat: state.chats?.activeChatId,
  }
}

const MainConnect = connect<typeof Main>(mapMainToProps)(Main)

const main = new MainConnect(
  'main',
  {
    tagAttrs: {
      class: 'main',
    },
    inputSearch: search,
    chatModal,
    chatList,
    messages: listMessage,
    formInputMessageValidationError,
    formMessage,
    menuDotHeader,
    events: {
      click: (event: Event) => {
        // Close MenuDot.
        if (!(event.target as HTMLElement).closest('.menu-dot')) {
          const elemMenuItems = document.querySelector('.menu-dot__items') as HTMLElement
          if (elemMenuItems) {
            elemMenuItems.style.display = 'none'
          }
        }
      },
    },
  }
)

export default main
