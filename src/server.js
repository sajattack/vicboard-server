import koa from 'koa'
import cors from 'koa-cors'
import qs from 'koa-qs'

import config from './config'
import routes from './routes'
import elasticClient from './elasticClient'

const app = koa()
qs(app)
const elasticsSarchClient = new elasticClient()
const router = routes(elasticsSarchClient)

/* set usage parms */
app.use(cors())

/*load in routes */
app.use(router.routes())
app.use(router.allowedMethods())

/* START THE MOTHER FUCKER */
app.listen(appEnv.port, '0.0.0.0', () => console.log(`Server cooking at localhost:${config.koa.port}`))
