import _ from 'lodash'
import emojis from './emojis'

export default emoji => {
    let emoji_name = undefined
    _.forEach(emojis, (e, name) => {
        if (e === emoji) emoji_name = name
    })
    return emoji_name
}
