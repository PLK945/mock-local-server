const config = {
    mock: {
        dataPath: 'data/mockData', // 数据存放路径
        mode: 'mock'
    },
    file: {
        dataPath: 'data/jsonData', // 数据存放路径
        mode: 'file'
    }
}['mock'] // 获取模式为 mock的配置文件


module.exports = {
    // 启动端口配置
    port: 9878,
    host: '127.0.0.1',
    // 接口根目录
    contextPath: '/api',
    // 上面基础配置映射
    ...config
    // 数据存放位置
    // dataPath: 'data',
    // mode: 'mock' // mock | file 当使用file时采用的static json 要用json导出api ;mock 采用的是 mock 解析模拟数据 要用js文件导出api 
}