import store from '.'
import Block from '../../modules/block'
import { isEqual } from '../../utils/helpers'
import { State, StoreEvents } from './store'

export default function connect(mapStateToProps: (state: State) => State) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(tag: string, props = {}) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState())

        super(tag, { ...props, ...state })

        // подписываемся на событие
        store.on(StoreEvents.UPDATED, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState())

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          // не забываем сохранить новое состояние
          state = newState
        })
      }
    }
  }
}
