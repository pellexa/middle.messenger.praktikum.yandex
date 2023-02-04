import TheError from '../../../components/theError'

const error404HTML = new TheError(
  'main',
  {
    tagAttrs: {
      class: 'error-box',
    },
    error: {
      status: 404,
      text: 'не туда попали',
      back: {
        link: '#',
        text: 'назад к чатам',
      },
    },
  }
)

export default error404HTML
