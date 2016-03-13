import cfenv from 'cfenv'


export default {
    koa: {
        port: cfenv.port || 4000
        url: cfenv.url || `http://localhost:${(cfenv.port || 4000)}`
    },
    elasticsearch: {
        host: 'https://search-hackvictoria-l5svhzy24drpsgt2jshws4zzei.us-west-2.es.amazonaws.com'
    }
}
