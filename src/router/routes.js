import TabBarView from 'src/components/TabBarView'
import Home from 'src/pages/home'
import About from 'src/pages/about'

export default [
    {
        path: '/',
        name: 'TabBarView',
        component: TabBarView,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home,
                meta: {
                    needLogin: false
                }
            },
            {
                path: '/about',
                name: 'About',
                component: About,
                meta: {
                    needLogin: false
                }
            }
        ]
    }
]
