import '../static/reset.css'
import './index.scss'
import signin from './pages/signin'
import registration from './pages/registration'
import error404 from './pages/error/404'
import error500 from './pages/error/5xx'
// import main from './pages/main'
import profileDetailed from './pages/profile/profileDetailed'
import profileEdit from './pages/profile/profileEdit'
import profilePasswordEdit from './pages/profile/profilePasswordEdit'
// import profileUploadAvatar from './pages/profile/profileUploadAvatar'
import { render } from './utils/renderDOM'
import Block from './modules/block'
import nav from './components/nav'

const app = document.getElementById('app')

if (!app) {
  throw Error('There is no element in index.html with id="app".')
}

const routes: Record<string, Block> = {
  '/signin': signin,
  '/': registration,
  '/registration': registration,
  // '/chat': main,
  '/profile/detailed': profileDetailed,
  '/profile/edit': profileEdit,
  '/profile/password/edit': profilePasswordEdit,
  '/404': error404,
  '/500': error500,
}

const root = render('#app', routes[window.location.pathname])
root!.append(nav.getContent())
