const util = require('../utils/util')
const { contextPath } = require('../settings')
/**
 * 读取json文件中间件直接返回文件数据
 * @param {*} req 请求
 * @param {*} resp 响应
 */
module.exports = (req,resp) => {
    try{
        const url = req.url.substring(1)
        resp.json(util.getJsonByUrlPath(url))
    }catch(e) {
        let res = {}
        if (e.message.indexOf('Cannot find')>=0) {
            res = util.error.NotFound(`${contextPath}${req.url}`)
            resp.statusCode = res.code
            resp.json(res)
        }else{
            res = util.error.ServerError(`${contextPath}${req.url}`)
            resp.statusCode = res.code
            resp.json(res)
        }
    }
}