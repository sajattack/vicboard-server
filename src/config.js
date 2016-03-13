import cfenv from 'cfenv'


export default {
    koa: {
        port: cfenv.port || 4000,
        url: cfenv.url || `http://localhost:${(cfenv.port || 4000)}`
    },
    elasticsearch: {
        host: 'http://keyser.reelgoodapp.com:9400'
    }
}
