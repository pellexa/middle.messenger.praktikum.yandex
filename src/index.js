import '../static/reset.css'
import './index.scss'
import signin from './pages/signin/index.js'
import registration from './pages/registration/index.js'
import error404 from './pages/error/404'
import error500 from './pages/error/5xx'
import main from './pages/main'

const app = document.getElementById('app');
// app.innerHTML = signin
// app.innerHTML = registration
// app.innerHTML = error404
// app.innerHTML = error500
app.innerHTML = main
