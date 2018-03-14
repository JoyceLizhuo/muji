// 接口地址
const localPrefix = '/api-mock' // 本地mock
const apiPrefix = '/api' // 线上地址
module.exports = {
  login       : `${localPrefix}/login`,
  validate    : `${localPrefix}/validate`,
  getIndicator: `${localPrefix}/getIndicator`, // 获取指标列表
}
