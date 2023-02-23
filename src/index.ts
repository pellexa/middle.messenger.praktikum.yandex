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
import Router from './modules/Router'

const app = document.getElementById('app')

if (!app) {
  throw Error('There is no element in index.html with id="app".')
}

const router = Router.getInstance('#app')

router
  .use('/', signin)
  .use('/sign-up', registration)
  .use('/messanger', main)
  .use('/settings', profileDetailed)
  .use('/settings/edit', profileEdit)
  .use('/settings/password/edit', profilePasswordEdit)
  .use('/404', error404)
  .use('/500', error500)
  .start()
