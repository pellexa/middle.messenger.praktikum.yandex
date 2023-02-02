enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type OptionsProps = {
  method?: METHODS
  headers?: Record<string, string>
  data?: XMLHttpRequestBodyInit
  timeout?: number
}

class HTTPTransport {
  public get = (url: string, options: OptionsProps = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  }

  public put = (url: string, options: OptionsProps = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  }

  public post = (url: string, options: OptionsProps = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  }

  public delete = (url: string, options: OptionsProps = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  }

  public request = (url: string, options: OptionsProps, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.timeout = timeout

      if (!options.method) {
        options.method === METHODS.GET
      }

      if (options.method === METHODS.GET && options.data) {
        url += this.queryStringify(options.data)
        xhr.open(options.method, url)
        this.setHeaders(xhr, options)
        xhr.send()
      } else {
        xhr.open(options.method!, url)
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
