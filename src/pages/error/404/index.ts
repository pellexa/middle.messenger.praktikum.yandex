import Handlebars from 'handlebars'
import theError from '../../../components/theError'

const error404 = Handlebars.compile(theError)({
  error: {
    status: '404',
    text: 'не туда попали',
    back: {
      link: '#',
      text: 'назад к чатам',
    },
  },
})

export default error404
