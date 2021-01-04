const util = require('../utils/util')
const { contextPath } = require('../settings')
/**
 * 模拟数据中间件
 */
module.exports = (req,resp) => {
    try{
        // 获取url地址
        const url = req.url.substring(1)
        // 获取文件数据
        const obj = util.requireJsData(url)
        // 解析模拟数据
        const mockData = util.parseMockData(obj)
        resp.json(mockData)
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