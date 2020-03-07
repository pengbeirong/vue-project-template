import Home from 'src/pages/home'
import About from 'src/pages/about'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { needLogin: false }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { needLogin: false }
    }
]
