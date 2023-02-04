import Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid'

import EventBus from './eventBus'

import {
  ComponentEvent,
  PropsObject,
  Meta,
  IBlock,
} from './types'

export default abstract class Block implements IBlock {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  }

  private _element: HTMLElement

  private _meta: Meta

  public props: PropsObject

  private _id: string

  private _eventHandlers: ComponentEvent = {}

  private eventBus: Function

  private _children: Record<string, IBlock | IBlock[]>

  constructor(tagName = 'div', props = {}) {
    const { children, ownProps } = this._getChildren(props)

    this._children = children

    const eventBusInstanse = new EventBus()
    this._meta = {
      tagName,
      ownProps,
    }

    this._id = makeUUID()

    this.props = this._makePropsProxy({ ...ownProps })

    this.eventBus = (): EventBus => eventBusInstanse

    this._registerEvents()
    this.eventBus().emit(Block.EVENTS.INIT)
  }

  public get element(): HTMLElement {
    return this._element
  }

  public get id(): string {
    return this._id
  }

  private _getChildren(props: PropsObject): {
      children: Record<string, IBlock | IBlock[]>,
      ownProps: PropsObject
    } {
    const children: Record<string, IBlock | IBlock[]> = {}
    const ownProps: PropsObject = {}

    Object.entries(props).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else if (Array.isArray(value)) {
        const childrenArr: Array<IBlock> = []
        const ownPropsArr: unknown[] = []

        value.forEach(item => {
          if (item instanceof Block) {
            childrenArr.push(item)
          } else {
            ownPropsArr.push(item)
          }
        })

        if (childrenArr.length) {
          children[key] = childrenArr
        }

        if (ownPropsArr.length) {
          ownProps[key] = ownPropsArr
        }
      }
      else {
        ownProps[key] = value
      }
    })

    return { children, ownProps }
  }

  public compile(template: string, props?: PropsObject): DocumentFragment {
    if (typeof props === 'undefined') {
      props = this.props
    }

    const propsAndStubs = { ...props }

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        child.forEach(item => {
          if (!propsAndStubs[key]) {
            propsAndStubs[key] = `<div data-id="${item.id}"></div>`
          } else {
            propsAndStubs[key] += `<div data-id="${item.id}"></div>`
          }
        })
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = document.createElement('template')
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this._children).forEach((child: IBlock) => {
      const stubs: Array<HTMLTemplateElement | null> = []
      if (Array.isArray(child)) {
        child.forEach(item => {
          if (item instanceof Block) {
            stubs.push(fragment.content.querySelector(`[data-id="${item.id}"]`))
          }
        })
      } else {
        stubs.push(fragment.content.querySelector(`[data-id="${child.id}"]`))
      }

      stubs.forEach(stub => {
        if (stub) {
          if (Array.isArray(child)) {
            child.forEach(item => {
              stub.before(item.getContent())
            })
          } else {
            stub.replaceWith(child.getContent())
          }
        }

        if (stub) stub.remove()
      })
    })

    return fragment.content
  }

  private _registerEvents(): void {
    this.eventBus().on(Block.EVENTS.INIT, this._init.bind(this))
    this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    this.eventBus().on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  /**
   * Create HTMLElement.
   */
  private _createDocumentElement(): HTMLElement {
    const { tagName } = this._meta
    this._element = document.createElement(tagName)
    return this._element
  }

  private _setAttributes(): void {
    const { tagAttrs = {} } = this._meta.ownProps

    Object.entries(tagAttrs).forEach(([key, value]) => {
      this._element.setAttribute(key, value)
    })
  }

  private _addEvents(): void {
    const { events = {} } = this.props

    Object.entries(events).forEach(([key, handler]) => {
      this._eventHandlers[key] = handler
      this._element.addEventListener(key, this._eventHandlers[key])
    })
  }

  private _removeEvents(eventHandlers: ComponentEvent): void {
    Object.entries(eventHandlers).forEach(([key, handler]) => {
      this._element.removeEventListener(key, handler)
    })
  }

  private _init(): void {
    this._createDocumentElement()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  /**
   * Used to register events outside of render().
   * Must call after appearing in the DOM either EVENTS.FLOW_CDM or dispatchComponentDidMount().
   */
  private _componentDidMount(): void {
    this.componentDidMount()

    Object.values(this._children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(item => item.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  // Can be overridden from client code.
  public componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: string, newProps: string): void {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  // Can be overridden from client code.
  public componentDidUpdate(oldProps: string, newProps: string): boolean {
    if (oldProps !== newProps) {
      return true
    }
    return false
  }

  public setProps(props: PropsObject): void {
    if (!props) {
      return
    }

    const { children, ownProps } = this._getChildren(props)
    Object.assign(this._children, children)
    Object.assign(this.props, ownProps)
  }

  private _render(): void {
    const block = this.render()

    this._removeEvents(this._eventHandlers)

    this._element.innerHTML = ''
    this._element.append(block)

    this._setAttributes()
    this._addEvents()
  }

  // Can be overridden from client code.
  public render(): DocumentFragment | string {
    return ''
  }

  public getContent(): HTMLElement {
    return this.element
  }

  private _makePropsProxy(props: PropsObject) {
    const self = this

    return new Proxy(props, {
      get(target: PropsObject, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error(`No access to get ${target[prop]}`)
        }

        return target[prop]
      },

      set(target: PropsObject, prop: string, newValue) {
        if (prop.startsWith('_')) {
          throw new Error(`No access to set ${target[prop]}`)
        }

        const oldValue = target[prop]
        target[prop] = newValue

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, newValue)
        return true
      },

      deleteProperty(target: PropsObject, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error(`No access to delete ${target[prop]}`)
        }
        return true
      },
    })
  }

  public show(): void {
    this.element.style.display = 'block'
  }

  public hide(): void {
    this.element.style.display = 'none'
  }
}
