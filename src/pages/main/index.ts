import main from './main.tmpl';
import search from '../../components/search';
import IconSearchSvg from '../../components/icons/IconSearch.svg';
import chatListComponent from '../../components/chatList';
import message from '../../components/message';
import IconAttachSvg from '../../components/icons/IconAttach.svg';
import IconSendSvg from '../../components/icons/IconSend.svg';
import menuDotHeaderComponent from '../../components/menuDotHeader';
import Handlebars from 'handlebars';

const IconSearch = Handlebars.compile(IconSearchSvg)
const inputSearch = Handlebars.compile(search)({IconSearch})

const apiResponseChatList = {
  data:[
    {
      "id": 123,
      "title": "my-chat",
      "avatar": "/123/avatar1.jpg",
      "unread_count": 15,
      "last_message": {
        "user": {
          "first_name": "Petya",
          "second_name": "Pupkin",
          "avatar": "/path/to/avatar.jpg",
          "email": "my@email.com",
          "login": "userLogin",
          "phone": "8(911)-222-33-22"
        },
        "time": "2020-01-02T14:22:22.000Z",
        "content": "this is message content"
      }
    },
    {
        "id": 1234,
        "title": "my-chat-2",
        "avatar": "/123/avatar2.jpg",
        "unread_count": 55,
        "last_message": {
          "user": {
            "first_name": "Vasya",
            "second_name": "Terkin",
            "avatar": "/path/to/avatar.jpg",
            "email": "vt@email.com",
            "login": "vtLogin",
            "phone": "8(922)-333-44-33"
          },
        //   "time": "2020-03-01T14:22:22.000Z",
          "time": "1 мар 2020",
          "content": "Друзья, у меня для вас особенный выпуск новостей! Во-первых лалала"
        }
    }
  ]
}

const chatList = Handlebars.compile(chatListComponent)(apiResponseChatList)

// const apiResponseSelectedChat = {}
const apiResponseSelectedChat = {
    "id": 123,
    "title": "my-chat",
    "avatar": "/123/avatar1.jpg",
    "unread_count": 15,
    "last_message": {
      "user": {
        "first_name": "Petya",
        "second_name": "Pupkin",
        "avatar": "/path/to/avatar.jpg",
        "email": "my@email.com",
        "login": "userLogin",
        "phone": "8(911)-222-33-22"
      },
      "time": "2020-01-02T14:22:22.000Z",
      "content": "this is message content"
    }
}

 /**
  * Не нешёл описание api для ленты сообщений в Swagger (https://ya-praktikum.tech/api/v2/swagger/#/)
  * Придумал свой json.
  */
const apiResponseMessages = {
  chat_id: 123,
  messages: [
    {
      time: "2020-01-02T14:22:22.000Z",
      content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

      Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
      is_my: false,
    },
    {
      time: "2020-01-02T14:22:23.000Z",
      content: {image: './path/to/image.jpg'},
      is_my: false,
    },
    {
      time: "2020-01-03T14:23:12.000Z",
      content: "круто!",
      is_my: true,
    }
  ]
}

const listMessage = apiResponseMessages.messages.map((msg, index, array) => {
  const datetime = new Date(Date.parse(msg.time))
  const day = datetime.getDate()
  const month = datetime.getMonth()

  let resultDate = '';
  if (index - 1 < 0) {
    resultDate = msg.time
  } else {
    const prevDatetime = new Date(Date.parse(array[index - 1].time))
    const prevDay = prevDatetime.getDate()
    if (day != prevDay) {
      resultDate = msg.time
    }
  }

  return Handlebars.compile(message)({
    msg,
    isImage: msg.content.image ? true : false,
    isMy: msg.is_my,
    date: resultDate
  })
}).join('')

const menuDotHeader = Handlebars.compile(menuDotHeaderComponent)

const mainHTML = Handlebars.compile(main)({
    inputSearch,
    chatList,
    selectedChat: Object.keys(apiResponseSelectedChat).length > 0 ? apiResponseSelectedChat : false,
    messages: listMessage,
    IconAttachSvg,
    IconSendSvg,
    menuDotHeader,
})

export default mainHTML
