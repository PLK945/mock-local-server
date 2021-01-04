const {mode,port,host,dataPath,contextPath} = require('../settings')
const util = require('../utils/util')
const {resolve} = require('path')
const fs = require('fs')
const { start } = require('repl')
const { api } = require('.')

const template = (suffix) => {
    const apis = []
    const paths = util.getFilesPath(resolve(__dirname,`../${dataPath}`))
    paths.forEach(path=>{
        let api = path.substring(path.indexOf(dataPath.replace('/','\\'))+dataPath.length).replace('\\','/').replace(suffix,'').replace('\\','/')
        apis.push({api:`http:${host}:${port}${contextPath}`+api,href:`${contextPath}${api}`})
    })
    return apis
}

const readApiTemplateHtml = () =>{
    return fs.readFileSync(resolve(__dirname,'../public/index.html'),'utf-8')
}

const handler = {
    mock: () => {
        return template('.js')
    },
    file: () => {
        return template('.json')
    }
}

/**
 *  Index页面数据中间件
 * @param {*} req 
 * @param {*} resp 
 */
module.exports = (req,resp,next) => {
    if (req.url === `${contextPath}`) {
        const apis = handler[mode]()
        let html = readApiTemplateHtml()
        const params = util.parseStr(html) 
        let body = ''
        apis.forEach(item => {
            body += `<div><h3><a href='${item.href}'>${item.api}<h3></div>`
        })
        html = html.replace(params[0],body)
        resp.send(html)
    }else {
        next()
    }
}


