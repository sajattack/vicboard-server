import koaRouter from 'koa-router'
import koaBody from 'koa-body'
import { v4 as uuid } from 'node-uuid'

const router = koaRouter()
const bodyParser = koaBody()

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

        this.body = 'test'
    })

    router.post('/thread', bodyParser, function*(next) {


        return this.body = JSON.stringify(this)


        const { username = 'anonymous', title = '', text = '', emoji = 'issue', cords = [null, null], images = [] } = this.request.body

        const id = uuid()

        const parms = {
            comments: [],
            cords,
            text,
            emoji,
            images,
            title,
            username
        }

        elasticsSarchClient.saveThread(parms, id)
            .then(() => {
                this.body = JSON.stringify({
                    status: 'ok',
                    id
                })
            })
    })



    /* Comments */

    router.post('/comment', koaBody, function*(next) {
        const { user, comment, threadID } = this.request.body


    })

    return router
}
