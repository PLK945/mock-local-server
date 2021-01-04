const config = {
    mock: {
        dataPath: 'data/mockData', // 数据存放路径
        mode: 'mock'
    },
    file: {
        dataPath: 'data/jsonData', // 数据存放路径
        mode: 'file'
    }
}['file'] // 获取模式为 mock的配置文件

module.exports = {
    // 启动端口配置
    port: 9878,
    // 主机地址
    host: '127.0.0.1',
    // 项目根目录
    contextPath: '/blog',
    // 上面基础配置映射
    ...config
}