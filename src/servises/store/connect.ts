import store from '.'
import Block from '../../modules/block'
import { isEqual } from '../../utils/helpers'
import { State, StoreEvents } from './store'

export default function connect<T>(mapStateToProps: (state: State) => {[key: string]: unknown}) {
  return function(Component: T) {
    return class extends (Component as typeof Block) {
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
    } as T
  }
}
