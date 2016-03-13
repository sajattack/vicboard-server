import cfenv from 'cfenv'

var appEnv = cfenv.getAppEnv();

export default {
    koa: {
        port: appEnv.port || 4000,
        ip: '0.0.0.0' || 'localhost',
        url: appEnv.url
    },
    elasticsearch: {
        host: 'http://keyser.reelgoodapp.com:9400/'
    }
}
