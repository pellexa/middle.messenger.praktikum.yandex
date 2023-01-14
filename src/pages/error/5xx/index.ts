import theError from '../../../components/theError';
import Handlebars from 'handlebars';

const error500 = Handlebars.compile(theError)({
    error: {
        status: '500',
        text: 'мы уже фиксим',
        back: {
            link: '#',
            text: 'назад к чатам'
        },
    }
})

export default error500
