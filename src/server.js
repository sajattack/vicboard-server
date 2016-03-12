import koa from 'koa'
import servceStatic from 'koa-static'
import cors from 'koa-cors'

import config from './config'
import routes from './routes'
import elasticClient from './elasticClient'

const app = koa()
const elasticsSarchClient = new elasticClient()
const router = routes(elasticsSarchClient)

/* set usage parms */
app.use(servceStatic(__dirname + '/public'))
app.use(cors())

/*load in routes */
app.use(router.routes())
app.use(router.allowedMethods())

/* START THE MOTHER FUCKER */
app.listen(config.koa.port, () => console.log(`Server cooking at localhost:${config.koa.port}`))
