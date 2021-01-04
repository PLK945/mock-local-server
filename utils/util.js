const {resolve} = require('path')
const fs = require('fs')
const Mock = require('mockjs')
const {dataPath} = require('../settings')
/**
 * 
 * @param {url地址} url 
 */
exports.getDataByUrlPath = (url) => {
    return fs.readFileSync(resolve(__dirname,`../${dataPath}/${url}.json`),'utf-8')
}

/**
 * 读取js对象信息
 * @param {*} path 
 */
exports.requireJsData = (path) =>{
    return require(`../${dataPath}/${path}.js`)
}


/**
 * 
 * @param {字符串} str 
 */
exports.str2json = (str) => {
    return JSON.parse(str)
}

/**
 * 
 * @param {url地址} url 
 */
exports.getJsonByUrlPath= (url) => {
    const data = this.getDataByUrlPath(url)
    return this.str2json(data)
}
/**
 * 
 * @param {解析模拟数据} template 
 */
exports.parseMockData = (template) => {
    return Mock.mock(template)
}

/**
 * 遍历文件
 */
exports.walkSync = (currentDirPath, files) => {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = resolve(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            files.push({path:filePath,stat:stat})
        } else if (stat.isDirectory()) {
            walkSync(filePath, files);
        }
    });
}


exports.getFilesPath = (path) => {
    const files = [] 
    const paths = []
    this.walkSync(path,files)
    files.forEach(file=>{   
        paths.push(file.path)
    })
    return paths;
}

exports.parseStr = (str) => {
    const params = []
    let temp = str
    do{
        let start = temp.indexOf("${")
        let end = temp.indexOf("}")
        const flag = /\${(.*)}$/.test(temp.substring(start,end+1))
        if(flag){
            params.push('${'+RegExp.$1+'}')
        }else {
            break
        }
        temp = temp.substring(end+1)
    }while(temp.indexOf("${")>0&&temp.indexOf("}")>0)
    return params
} 


exports.error = {
    NotFound: (api) => {
        return {
            code:404,
            message:`没有找到请求地址：${api}`
        }
    },
    ServerError: (msg)=> {
        return {
            code: 500,
            message:`请检查服务端代码问题：${msg?msg:'Internal Server Error'}`
        }
    }   
}