export default class BaseAPI {
  public static host = 'https://ya-praktikum.tech'
  public static headers = {
    'Content-Type': 'application/json',
  }

  create() {
    throw new Error('Not implemented')
  }

  request() {
    throw new Error('Not implemented')
  }

  update() {
    throw new Error('Not implemented')
  }

  delete() {
    throw new Error('Not implemented')
  }
}
