import koaRouter from 'koa-router'
import koaBody from 'koa-body'

const router = koaRouter()


const threadTemplate = {
    title: 'Awesome Thread',
    image: 'imgur url', //generated from within render code
    text: '...',
    cords: [123, 271], //lang , long
    username: 'optional' //defaults to annon

}


export default elasticsSarchClient => {
    /* index */

    router.get('/', function*(next) {
        this.body = 'Your drunk. Go home.'
    })

    /*Threads */

    router.get('/threads', function*(next) {
        this.body = yield elasticsSarchClient.count({
            index: config.appname
        })
    })

    router.get('/thread', function*(next) {
        this.body = yield elasticsSarchClient.count({
            index: config.appname
        })
    })

    router.post('/thread', koaBody, function*(next) {
        const { username = 'annon', text = '', catagory = 'issues', cords = [null, null], image = 'https://www.dinafem.org/static/images/site/no-photo.jpg' } = this.request.body




    })



    /* Comments */

    router.post('/comment', koaBody, function*(next) {
        const { user, comment, threadID } = this.request.body


    })

    return router
}
