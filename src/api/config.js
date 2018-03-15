/**
 * 接口地址，配置方法：
 * `${api}/login`,         // 使用 '/api' 作为prefix
 * `${mockPrefix}/login`,  // 使用 '/api-mock' 作为prefix
 * `${localPrefix}/login`, // 在开发环境下使用'/api-mock' 作为prefix。打包压缩的代码（即线上）使用 '/api' 作为prefix
 */
const mockPrefix = '/api-mock' // mock代理的prefix
const apiPrefix = '/api' // 线上地址
let localPrefix = mockPrefix //

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== 'development') {
  localPrefix = apiPrefix
}

module.exports = {
  login       : `${localPrefix}/login`,
  validate    : `${localPrefix}/validate`,
  getIndicator: `${localPrefix}/getIndicator`, // 获取指标列表
  deleteIndicator: `${localPrefix}/deleteIndicator`, // 获取指标列表
}
