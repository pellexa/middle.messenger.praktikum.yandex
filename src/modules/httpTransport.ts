enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export type OptionsProps = {
  method?: METHODS
  headers?: Record<string, string>
  data?: XMLHttpRequestBodyInit
  timeout?: number
}

type HTTPMethod = (url: string, options?: OptionsProps) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  public get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET })
  }

  public put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT })
  }

  public post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST })
  }

  public delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE })
  }

  public request = (url: string, options: OptionsProps): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.timeout = options.timeout ? options.timeout : 5000

      if (!options.method) {
        options.method === METHODS.GET
      }

      if (options.method === METHODS.GET && options.data) {
        url += this.queryStringify(options.data)
        xhr.open(options.method, url)
        xhr.withCredentials = true
        this.setHeaders(xhr, options)
        xhr.send()
      } else {
        xhr.open(options.method!, url)
        xhr.withCredentials = true
        this.setHeaders(xhr, options)
        xhr.send(options.data)
      }

      xhr.onload = () => resolve(xhr)

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject
    })
  }

  public queryStringify(data: XMLHttpRequestBodyInit) {
    const entries = Object.entries(data)
    return entries.reduce((acc, [key, value]) => acc + `${key}=${value}&`, '?').slice(0, -1)
  }

  public setHeaders(xhr: XMLHttpRequest, options: OptionsProps) {
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })
    }
  }
}
