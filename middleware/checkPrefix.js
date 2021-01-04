const { contextPath } = require('../settings')
const util = require('../utils/util')

module.exports = (req,resp,next) => {
    if(req.url.indexOf(contextPath)===0) {
        next()
    }else{
        let res = util.error.ServerError(`请求路径不存在项目路径：${contextPath}`)
        resp.statusCode = res.code
        resp.json(res)
    }
}