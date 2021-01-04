const {contextPath} = require('../settings')

module.exports = (req,resp,next) => {
    req.url = req.url.substring(contextPath.length)
    next()
}