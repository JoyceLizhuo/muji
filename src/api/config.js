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
  login       : `${localPrefix}/login`, // 登录
  validate    : `${localPrefix}/validate`, // 鉴权
  curdIndicator: `${localPrefix}/indicator`, // 增删改查
}
