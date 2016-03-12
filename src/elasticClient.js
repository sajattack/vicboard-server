import { Client as elasticClient } from 'elasticsearch'
import config from './config'

const host = `http://${config.elasticsearch.username}:${config.elasticsearch.password}@${config.elasticsearch.host}`



export default class elasticSearchAbstraction extends elasticClient {
    constructor() {
        super({ host })
    }
}
