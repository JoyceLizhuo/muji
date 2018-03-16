/**
 * 通用配置
 */
const config = {
  indicatorType: {
    basic: {
      label: '基本指标',
      value: 'basic',
    },
    normal: {
      label: '普通指标',
      value: 'normal',
    },
    compound: {
      label: '复合指标',
      value: 'compound',
    },
  },

  // table分页的通用配置
  pagination: {
    pageSize: 20,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal (total, range) {
      return `第${range[0]}-${range[1]}条 | 共${total} 条`
    },
  }
}

config.indicatorTypeArray = Object.keys(config.indicatorType).map((key) => ({ label: config.indicatorType[key].label, value: config.indicatorType[key].value }))

export default config
