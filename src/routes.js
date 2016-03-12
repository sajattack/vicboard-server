import koaRouter from 'koa-router'
import koaBody from 'koa-body'

const router = koaRouter()


export default function(elasticsSarchClient) {
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
        const { user, text, catagory, cords, image } = this.request.body




    })



    /* Comments */

    router.post('/comment', koaBody, function*(next) {
        const { user, comment, threadID } = this.request.body


    })



    return router
}
