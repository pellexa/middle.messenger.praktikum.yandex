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
      this._onRoute(window.location.pathname)
    }

    this._onRoute(window.location.pathname)
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
