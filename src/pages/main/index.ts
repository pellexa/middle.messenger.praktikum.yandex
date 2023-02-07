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

const search = new Search(
  'div',
  {
    tagAttrs: {
      class: 'search',
    },
    IconSearch: IconSearchSvg,
  }
)

const apiResponseChatList = {
  data: [
    {
      id: 123,
      title: 'my-chat',
      avatar: '/123/avatar1.jpg',
      unread_count: 15,
      last_message: {
        user: {
          first_name: 'Petya',
          second_name: 'Pupkin',
          avatar: '/path/to/avatar.jpg',
          email: 'my@email.com',
          login: 'userLogin',
          phone: '8(911)-222-33-22',
        },
        time: '2020-01-02T14:22:22.000Z',
        content: 'this is message content',
      },
    },
    {
      id: 1234,
      title: 'my-chat-2',
      avatar: '/123/avatar2.jpg',
      unread_count: 55,
      last_message: {
        user: {
          first_name: 'Vasya',
          second_name: 'Terkin',
          avatar: '/path/to/avatar.jpg',
          email: 'vt@email.com',
          login: 'vtLogin',
          phone: '8(922)-333-44-33',
        },
        //   "time": "2020-03-01T14:22:22.000Z",
        time: '1 мар 2020',
        content: 'Друзья, у меня для вас особенный выпуск новостей! Во-первых лалала',
      },
    },
  ],
}

const chatList = new ChatList(
  'ul',
  {
    tagAttrs: {
      class: 'chat-list',
    },
    data: apiResponseChatList.data,
  }
)

// const apiResponseSelectedChat = {}
const apiResponseSelectedChat = {
  id: 123,
  title: 'my-chat',
  avatar: '/123/avatar1.jpg',
  unread_count: 15,
  last_message: {
    user: {
      first_name: 'Petya',
      second_name: 'Pupkin',
      avatar: '/path/to/avatar.jpg',
      email: 'my@email.com',
      login: 'userLogin',
      phone: '8(911)-222-33-22',
    },
    time: '2020-01-02T14:22:22.000Z',
    content: 'this is message content',
  },
}

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
  '#': 'выйти',
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
        href,
        class: 'menu-dot__item',
      },
      content: link,
    }
  )

  return wrapper
})

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

const attrs = {
  tagAttrs: {
    class: 'input-row__help input-row__help_signin-width',
  },
}

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

class Main extends Block {
  constructor(tagName: string, props: MainProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(mainTmpl)
  }
}

const main = new Main(
  'main',
  {
    tagAttrs: {
      class: 'main',
    },
    inputSearch: search,
    chatList,
    selectedChat: Object.keys(apiResponseSelectedChat).length > 0 ? apiResponseSelectedChat : false,
    messages: listMessage,
    formInputFileLabel,
    formInputFile,
    formInputMessage,
    formInputMessageValidationError,
    sendButton,
    menuDotHeader,
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
      click: (event: Event) => {
        // Close MenuDot.
        if (!(event.target as HTMLElement).closest('.menu-dot')) {
          const elemMenuItems = document.querySelector('.menu-dot__items') as HTMLElement
          elemMenuItems.style.display = 'none'
        }
      },
    },
  }
)

export default main
