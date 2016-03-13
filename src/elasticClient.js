import { Client as elasticClient } from 'elasticsearch'
import config from './config'

const host = config.elasticsearch.host //`http://${config.elasticsearch.username}:${config.elasticsearch.password}@${config.elasticsearch.host}`

export default class elasticSearchAbstraction extends elasticClient {
    constructor() {
        super({ host })

        this.check()
            .then(() => {
                console.log(`Established Connection to ElasticSearch @ ${host}`)
                this.initIndexs()
            })
            .catch(error => console.error(`Elastic Search is DOWNNNNNNN`, error))
    }

    check = () => new Promise((resolve, reject) => this.ping({
        requestTimeout: 30000,
        hello: "elasticsearch"
    }, error => error ? reject(error) : resolve()));

    initIndexs = (overwrite = false) => {
        const indices = ['thread', 'comments']

        indices.forEach(index => this.indices.exists({ index }, (err, exsist) => {
            if (!exsist) {
                this.indices.create({ index })
            } else if (overwrite) {
                this.indices.delete({ index }, () => this.indices.create({ index }))
            }
        }))
    };


    /*Threads*/

    getThreads(id, type) {

    }

    saveThread({ type, id, body }) {
        return new Promise((resolve, reject) => this.create({
            index: 'thread',
            type,
            id,
            body
        }, (error, response) => {
            if (error) return reject(error)
                
            resolve()
        }))
    }


    /* Comments */

    saveComment(threadID, thread, comment) {
        return new Promise((resolve, reject) => {
            this.update({
                index: 'thread',
                type: thread.type,
                id: thread.id,
                body: {
                    script: 'ctx._source.comments += comment',
                    params: { comment }
                }
            }, (error, response) => {
                console.log(error, response)
            });
        })
    }
}
