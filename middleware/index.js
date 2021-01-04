const mock = require('./mock')
const file = require('./file')
const api = require('./api')
const checkPrefix = require('./checkPrefix')
const formatUrl = require('./formatUrl')

module.exports = {
    mock,
    file,
    api,
    checkPrefix,
    formatUrl,
    install: (app) =>{
        // 检查项目根路径
        app.use(checkPrefix)
        // 查看api路径
        app.use(api)
        app.use(formatUrl)
    }
}