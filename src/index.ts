import '../static/reset.css'
import './index.scss'
import signin from './pages/signin'
import registration from './pages/registration'
import error404 from './pages/error/404'
import error500 from './pages/error/5xx'
import main from './pages/main'
import profileDetailed from './pages/profile/profileDetailed'
import profileEdit from './pages/profile/profileEdit'
import profilePasswordEdit from './pages/profile/profilePasswordEdit'
import profileUploadAvatar from './pages/profile/profileUploadAvatar'

const app = document.getElementById('app')

if (!app) {
  throw Error('There is no element in index.html with id="app".')
}

const routes = {
  '/singin': signin,
  '/': registration,
  '/registration': registration,
  '/chat': main,
  '/profile/detailed': profileDetailed,
  '/profile/edit': profileEdit,
  '/profile/password/edit': profilePasswordEdit,
  '/404': error404,
  '/500': error500,
}

app.innerHTML = routes[window.location.pathname]

const pagesHTML = `
<nav class="tmp-nav">
  <ul class="tmp-pages">
    <li><a href="/singin">Singin</a></li>
    <li><a href="/registration">Registration</a></li>
    <li><a href="/chat">Chat</a></li>
    <li><a href="/profile/detailed">Profile detailed</a></li>
    <li><a href="/profile/edit">Profile edit</a></li>
    <li><a href="/profile/password/edit">Profile password edit</a></li>
    <li><a href="/404">404</a></li>
    <li><a href="/500">500</a></li>
  </ul>
</nav>
`

app.innerHTML += pagesHTML
