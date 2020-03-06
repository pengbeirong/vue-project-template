import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { checkTokenId } from 'src/api/token'

Vue.use(VueRouter)

const router = new VueRouter({
    base: __dirname,
    routes: routes
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '商城'
    }
    let needLogin = to.meta.needLogin
    if (needLogin === undefined) needLogin = true
    if (needLogin) {
        checkTokenId().then((exit) => {
            if (exit) {
                next()
                return
            }
        })
    } else {
        next()
    }
})

export default router