const express = require('express')
const middleware = require('./middleware/index')
const {mode,port,host,contextPath} = require('./settings')
const server = express()

middleware.install(server)

server.use(middleware[mode])

server.listen(port,()=>{
    console.log('mock data server start ...')
    console.log(`baseUrl：http://${host}:${port}${contextPath?contextPath:''}`)
})