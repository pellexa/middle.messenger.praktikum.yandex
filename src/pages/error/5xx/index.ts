import TheError from '../../../components/theError'

const error500HTML = new TheError(
  'main',
  {
    tagAttrs: {
      class: 'error-box',
    },
    error: {
      status: 500,
      text: 'мы уже фиксим',
      back: {
        link: '#',
        text: 'назад к чатам',
      },
    },
  }
)

export default error500HTML
