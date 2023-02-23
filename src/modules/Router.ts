import AuthAPI from '../api/auth-api'
import store from '../servises/store'
import Block from './block'
import Route from './Route'

interface IRouter {
  routes: Route[]
  history: History
  use(pathname: string, block: Block): IRouter
  start(): void
  go(pathname: string): void
  back(): void
  forward(): void
  getRoute(pathname: string): Route | undefined
}

export default class Router implements IRouter {
  private static instance: IRouter
  private static publicRoutes = ['/', '/sign-up']
  public routes: Route[]
  public history: History
  private _currentRoute: Route | undefined
  private _rootQueryElement: string

  private constructor(rootQueryElement: string) {
    this.routes = []
    this.history = window.history
    this._currentRoute = undefined
    this._rootQueryElement = rootQueryElement
  }

  public static getInstance(rootQueryElement: string = ''): IRouter {
    if (!Router.instance) {
      Router.instance = new Router(rootQueryElement)
    }
    return Router.instance
  }

  public use(pathname: string, block: Block): Router {
    const route = new Route(pathname, block, { rootQueryElement: this._rootQueryElement })
    this.routes.push(route)
    return this
  }

  public start(): void {
    window.onpopstate = () => {
      this._checkAuth()
    }

    this._checkAuth()
  }

  private async _checkAuth() {
    const pathname = window.location.pathname
    const responseAuth = await AuthAPI.user()

    if (responseAuth.status === 200) {
      store.set('auth.user', JSON.parse(responseAuth.responseText))

      if (Router.publicRoutes.includes(pathname)) {
        this.go('/messanger')
      } else {
        this._onRoute(pathname)
      }
    } else {
      if (Router.publicRoutes.includes(pathname)) {
        this._onRoute(pathname)
      } else {
        this.go('/')
      }
    }
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname)!

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back(): void {
    this.history.back()
  }

  public forward(): void {
    this.history.forward()
  }

  public getRoute(pathname: string): Route | undefined | never {
    let route = this.routes.find(route => route.match(pathname))

    if (!route) {
      route = this.routes.find(route => route.match('/404'))
    }

    if (!route) {
      throw Error('The "/404" route must be registered with router.use(...).')
    }

    return route
  }
}
