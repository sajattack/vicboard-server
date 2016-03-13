import { Client as elasticClient } from 'elasticsearch'
import config from './config'

const host = config.elasticsearch.host //`http://${config.elasticsearch.username}:${config.elasticsearch.password}@${config.elasticsearch.host}`

console.log(elasticClient)

export default class elasticSearchAbstraction extends elasticClient {
    constructor() {
        super({ host })

        this.initIndexs(false)
    }

    check = () => this.ping({
        requestTimeout: 30000,
        hello: "elasticsearch"
    }, error => error ? console.error('elasticsearch cluster is down!') : console.log('All is well'));

    initIndexs = (overwrite = false) => {
        const indexs = ['users', 'threads', 'comments', ]

    };
}
