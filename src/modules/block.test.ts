import Block from './block'
import Handlebars from 'handlebars'

class Component extends Block {}

describe('Block', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Creating an instance of the Component', () => {
    it('The _init method is executed.', () => {
      const _initEventsSpy = jest.spyOn(Component.prototype as any, '_init')
      new Component()
      expect(_initEventsSpy).toHaveBeenCalledTimes(1)
    })

    describe('Inside the _init method.', () => {
      it('The _createDocumentElement method is executed.', () => {
        const _createDocumentElementEventsSpy =
          jest.spyOn(Component.prototype as any, '_createDocumentElement')
        new Component()
        expect(_createDocumentElementEventsSpy).toHaveBeenCalledTimes(1)
      })

      it('The element property is defined.', () => {
        const instance = new Component()
        expect(instance.element).toContainHTML('<div />')
      })

      it('The _render method is executed.', () => {
        const _renderEventsSpy = jest.spyOn(Component.prototype as any, '_render')
        new Component()
        expect(_renderEventsSpy).toHaveBeenCalledTimes(1)
      })

      it('the render method is executed.', () => {
        const renderSpy = jest.spyOn(Component.prototype, 'render')
        new Component()
        expect(renderSpy).toHaveBeenCalledTimes(1)
      })

      it('The _removeEvents method is executed.', () => {
        const _removeEventsSpy = jest.spyOn(Component.prototype as any, '_removeEvents')
        new Component()
        expect(_removeEventsSpy).toHaveBeenCalledTimes(1)
      })

      it('The _setAttributes method is executed.', () => {
        const _setAttributesSpy = jest.spyOn(Component.prototype as any, '_setAttributes')
        new Component()
        expect(_setAttributesSpy).toHaveBeenCalledTimes(1)
      })

      it('The _addEvents method is executed.', () => {
        const _addEventsSpy = jest.spyOn(Component.prototype as any, '_addEvents')
        new Component()
        expect(_addEventsSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Hook componentDidMount.', () => {
    it('The dispatchComponentDidMount method runs the _componentDidMount method.', () => {
      const _componentDidMountSpy = jest.spyOn(Component.prototype as any, '_componentDidMount')
      const instance = new Component()
      instance.dispatchComponentDidMount()
      expect(_componentDidMountSpy).toHaveBeenCalledTimes(1)
    })

    describe('Inside the _componentDidMount method.', () => {
      it('The componentDidMount method is executed.', () => {
        const componentDidMountSpy = jest.spyOn(Component.prototype, 'componentDidMount')
        const instance = new Component()
        instance.dispatchComponentDidMount()
        expect(componentDidMountSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('The setProps method.', () => {
    it('When setProps is run, the _makePropsProxy method is executed.', () => {
      const _makePropsProxySpy = jest.spyOn(Component.prototype as any, '_makePropsProxy')
      const instance = new Component()
      instance.setProps({ a: 1 })

      expect(_makePropsProxySpy).toHaveBeenCalledTimes(1)
    })

    it('The render method is executed if oldValue is not equal to newValue.', () => {
      const instance = new Component()
      const renderSpy = jest.spyOn(instance, 'render')

      instance.setProps({ a: 1 })

      expect(renderSpy).toHaveBeenCalledTimes(1)
    })

    it('The render method does not execute if oldValue is equal to newValue.', () => {
      const instance = new Component()
      const renderSpy = jest.spyOn(instance, 'render')

      instance.setProps({ a: 1 })
      instance.setProps({ a: 1 })

      expect(renderSpy).toHaveBeenCalledTimes(1)
    })

    it('The render method is executed twice if two new values are passed.', () => {
      const instance = new Component()
      const renderSpy = jest.spyOn(instance, 'render')

      instance.setProps({ a: 1 })
      instance.setProps({ a: 2 })

      expect(renderSpy).toHaveBeenCalledTimes(2)
    })
  })
})

describe('Handlebars.', () => {
  describe('Display incoming properies.', () => {
    it('One property.', () => {
      const template = '<div>{{ property }}</div>'
      const props = { property: 'some value of property' }
      const result = Handlebars.compile(template)(props)
      expect(result).toBe(`<div>${props.property}</div>`)
    })

    it('Several properties.', () => {
      const template = '<div id="{{ id }}">{{ property }}</div>'
      const props = { property: 'some value of property', id: 'some_id' }
      const result = Handlebars.compile(template)(props)
      expect(result).toBe(`<div id="${props.id}">${props.property}</div>`)
    })
  })

  describe('Operator if (else).', () => {
    it('isDisplay is true.', () => {
      const template = `
        <div class="some-block {{# if isDisplay }}some-block_display{{/ if}}">
          {{ property }}
        </div>`
      const props = { property: 'some value of property', isDisplay: true }
      const result = Handlebars.compile(template)(props)
      expect(result.replace(/^\s+|\s+$/gm, '').replace(/\n/gm, ''))
        .toBe(`<div class="some-block some-block_display">${props.property}</div>`)
    })

    it('isDisplay is false.', () => {
      const template = `
        <div class="some-block{{# if isDisplay }}some-block_display{{/ if}}">
          {{ property }}
        </div>`
      const props = { property: 'some value of property', isDisplay: false }
      const result = Handlebars.compile(template)(props)
      expect(result.replace(/^\s+|\s+$/gm, '').replace(/\n/gm, ''))
        .toBe(`<div class="some-block">${props.property}</div>`)
    })

    it('if ... else ...', () => {
      const template = `
        <div>
          {{# if name }}
            {{ name }}
          {{ else }}
            {{ login }}
          {{/ if}}
        </div>`
      const props = { name: '', login: 'someLogin' }
      const result = Handlebars.compile(template)(props)
      expect(result.replace(/^\s+|\s+$/gm, '').replace(/\n/gm, ''))
        .toBe(`<div>${props.login}</div>`)
    })
  })

  describe('Operator each.', () => {
    it('Each.', () => {
      const template = `
        <ul>
          {{# each data }}
            <li>{{ this.task }}</li>
          {{/ each }}
        </ul>`
      const props = { data: [{ task: 'task 1' }, { task: 'task 2' }] }
      const result = Handlebars.compile(template)(props)
      expect(result.replace(/^\s+|\s+$/gm, '').replace(/\n/gm, ''))
        .toBe(`<ul><li>${props.data[0].task}</li><li>${props.data[1].task}</li></ul>`)
    })
  })
})
