import { Client as elasticClient } from 'elasticsearch'
import config from './config'

const host = config.elasticsearch.host //`http://${config.elasticsearch.username}:${config.elasticsearch.password}@${config.elasticsearch.host}`

console.log(elasticClient)

export default class elasticSearchAbstraction extends elasticClient {
    constructor() {
        super({ host })

        this.initIndexs(false)
    }

    initIndexs = (overwrite = false) => {
        const indexs = ['users', 'threads', 'comments', ]

    };
}
