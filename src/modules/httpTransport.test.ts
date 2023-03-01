import HTTPTransport, { OptionsProps } from '../modules/httpTransport'

const xhrMock: Partial<XMLHttpRequest> = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
}

describe('RoutHTTPTransporter', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('request is executed after the call:', () => {
    const requestMock = jest.fn()
    const instance = new HTTPTransport()
    instance.request = requestMock

    it('get', () => {
      instance.get('/')
      expect(requestMock).toHaveBeenCalledTimes(1)
    })

    it('put', () => {
      instance.put('/')
      expect(requestMock).toHaveBeenCalledTimes(1)
    })

    it('post', () => {
      instance.put('/')
      expect(requestMock).toHaveBeenCalledTimes(1)
    })

    it('delete', () => {
      instance.put('/')
      expect(requestMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('request method calls the following:', () => {
    const instance = new HTTPTransport()
    const headers = { 'Accept': 'application/json' }

    beforeEach(() => {
      jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest)
    })

    it('get', () => {
      instance.request('/', { headers } as OptionsProps)
      expect(xhrMock.timeout).toBe(5000)
      expect(xhrMock.open).toBeCalledWith('GET', '/')
      expect(xhrMock.withCredentials).toBe(true)
      expect(xhrMock.setRequestHeader).toBeCalledWith('Accept', 'application/json')
      expect(xhrMock.send).toHaveBeenCalledTimes(1)
    })

    it('post', () => {
      const data = '{ name: "John" }'
      instance.request('/', { method: 'POST', headers, data } as OptionsProps)
      expect(xhrMock.timeout).toBe(5000)
      expect(xhrMock.open).toBeCalledWith('POST', '/')
      expect(xhrMock.withCredentials).toBe(true)
      expect(xhrMock.setRequestHeader).toBeCalledWith('Accept', 'application/json')
      expect(xhrMock.send).toBeCalledWith(data)
    })
  })
})
