const express = require('express')
const middleware = require('./middleware/index')
const {mode,port,host,contextPath} = require('./settings')
const server = express()

// 检查项目根路径
server.use(middleware['checkPrefix'])
// 查看api路径
server.use(middleware['api'])
server.use(middleware['formatUrl'])
server.use(middleware[mode])

server.listen(port,()=>{
    console.log('mock data server start ...')
    console.log(`baseUrl：http://${host}:${port}${contextPath?contextPath+'/':''}`)
})