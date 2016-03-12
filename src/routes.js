import koaRouter from 'koa-router'

const router = koaRouter()


export default function(elasticsSarchClient) {
    router.get('/', function*(next) {
        this.body = 'Your drunk. Go home.'
    })

    router.get('/threads', function*(next) {
        this.body = yield elasticsSarchClient.count({
            index: config.appname
        })
    })

    return router
}
