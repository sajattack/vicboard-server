import koaRouter from 'koa-router'
import parse from 'co-body'
import { v4 as uuid } from 'node-uuid'

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

        const query = this.query

        this.body = yield elasticsSarchClient.search({
            index: 'thread',
            body: {
                query: {
                    match: {
                        ...query
                    }
                }
            }
        })
    })

    router.post('/threads', function*(next) {

        const body = yield parse(this)

        const { username = 'anonymous', title = '', text = '', emoji = 'issue', cords = [null, null], images = [] } = body

        this.body = yield elasticsSarchClient.create({
            index: 'thread',
            type: emoji,
            id: uuid(),
            body: {
                username,
                title,
                text,
                emoji,
                cords,
                images,
                comments: []
            }
        })
    })



    /* Comments */

    router.post('/comment', function*(next) {
        const body = yield parse(this)


    })

    return router
}
