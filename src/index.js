import '../static/reset.css'
import './index.scss'
import signinHTML from './pages/signin/'
import registration from './pages/registration/index.js'
import error404 from './pages/error/404'
import error500 from './pages/error/5xx'
import main from './pages/main'
import profileDetailed from './pages/profile/profileDetailed/index.js'
import profileEdit from './pages/profile/profileEdit/index.js'
import profilePasswordEdit from './pages/profile/profilePasswordEdit/index.js'
import profileUploadAvatar from './pages/profile/profileUploadAvatar/index.js'

const app = document.getElementById('app');
// app.innerHTML = signinHTML
// app.innerHTML = registration
// app.innerHTML = error404
// app.innerHTML = error500
// app.innerHTML = main
// app.innerHTML = profileDetailed
// app.innerHTML = profileEdit
// app.innerHTML = profilePasswordEdit


const routes = {
    '/singin': signinHTML,
    '/': registration,
    '/registration': registration,
    '/chat': main,
    '/profile/detailed': profileDetailed,
    '/profile/edit': profileEdit,
    '/profile/password/edit': profilePasswordEdit,
    '/404': error404,
    '/500': error500,
};

app.innerHTML = routes[window.location.pathname]

const pagesHTML = `
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
`

app.innerHTML += pagesHTML
