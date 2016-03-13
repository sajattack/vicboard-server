import koaRouter from 'koa-router'
import parse from 'co-body'
import { v4 as uuid } from 'node-uuid'
import emojis from './emojiUtil'

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

        let query = this.query
        
        this.set('Access-Control-Allow-Origin', '*')
        this.set('Access-Control-Allow-Methods', 'GET')
        this.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

        if (Object.keys(query).length === 0) {
            console.log('wildcard!')
            return this.body = yield elasticsSarchClient.search({
                index: 'thread',
                q: '*:*'
            })
        }

        if (query.emoji)
            query.emoji = emojis(query.emoji)

        this.body = yield elasticsSarchClient.search({
            index: 'thread',
            body: {
                query: {
                    match: query
                }
            }
        })
    })

    router.post('/threads', function*(next) {

        const body = yield parse(this)

        const { username = 'anonymous', title = '', text = '', emoji = '😄', cords = [null, null], images = [] } = body
        const emoji_string = emojis(emoji)
        const id = uuid()


        this.body = yield elasticsSarchClient.create({
            index: 'thread',
            type: emoji_string,
            id,
            body: {
                username,
                title,
                text,
                id,
                emoji_string,
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
