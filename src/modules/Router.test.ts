import signin from '../pages/signin'
import Router from './Router'

document.body.innerHTML = '<div id="app"></div>'

const router = Router.getInstance('#app')
router.use('/', signin)

describe('Router', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('start', () => {
    const _checkAuth = jest.spyOn((Router.prototype as any), '_checkAuth')
    router.start()
    expect(_checkAuth).toHaveBeenCalledTimes(1)
  })

  it('go', () => {
    const go = jest.spyOn(Router.prototype, 'go')
    const pushState = jest.spyOn(window.history, 'pushState')
    router.go('/')
    expect(go).toHaveBeenCalledTimes(1)
    expect(pushState).toHaveBeenCalledTimes(1)
  })

  it('When 404 route is not registered.', () => {
    const go = jest.spyOn(Router.prototype, 'go')
    const pushState = jest.spyOn(window.history, 'pushState')
    try {
      router.go('/not-exist-page')
    } catch (e) {
      expect(go).toHaveBeenCalledTimes(1)
      expect(pushState).toHaveBeenCalledTimes(1)
      expect(e)
        .toHaveProperty('message', 'The "/404" route must be registered with router.use(...).')
    }
  })

  it('back', () => {
    const back = jest.spyOn(Router.prototype, 'back')
    const windowBack = jest.spyOn(window.history, 'back')
    router.back()
    expect(back).toHaveBeenCalledTimes(1)
    expect(windowBack).toHaveBeenCalledTimes(1)
  })

  it('forward', () => {
    const forward = jest.spyOn(Router.prototype, 'forward')
    const windowForward = jest.spyOn(window.history, 'forward')
    router.forward()
    expect(forward).toHaveBeenCalledTimes(1)
    expect(windowForward).toHaveBeenCalledTimes(1)
  })
})
