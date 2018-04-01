import React from 'react'
import dateFormat from "./methods/dateFormat";

/**
 * 通用配置
 */
const indicatorType = {
  basic: {
    label: '基本--holder',
    value: 'basic',
  },
  normal: {
    label: '普通--holder',
    value: 'normal',
  },
  compound: {
    label: '复合--holder',
    value: 'compound',
  },
}
const config = {
  // --holder类型
  indicatorType,

  // --holder信息table的columns
  indicatorTableColumns: [{
    title: '--holder名称',
    dataIndex: 'indicatorName',
    key: 'indicatorName',
  }, {
    title: '--holder说明',
    dataIndex: 'indicatorIntro',
    key: 'indicatorIntro',
  }, {
    title: '--holder类型',
    dataIndex: 'indicatorType',
    key: 'indicatorType',
    render (text) {
      const indicatorTypeItem = Object.values(indicatorType).filter(({ value }) => (value === text))[0]
      let r = ''
      if (indicatorTypeItem) {
        r = indicatorTypeItem.label
      }
      return r
    },
  }, {
    title: '数据来源',
    dataIndex: 'dataSource',
    key: 'dataSource',
  }, {
    title: '--holder状态',
    dataIndex: 'indicatorStatus',
    key: 'indicatorStatus',
  }, {
    title: '所属业务',
    dataIndex: 'underBiz',
    key: 'underBiz',
  }, {
    title: '创建者',
    dataIndex: 'createdBy',
    key: 'createdBy',
  }, {
    title: '创建日期',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => (
      <span>
        {dateFormat(text)}
      </span>
    )
  }, {
    title: '--holder版本',
    dataIndex: 'indicatorVersion',
    key: 'indicatorVersion',
  }],

  // 所有table分页的通用配置
  pagination: {
    pageSize: 20,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal (total, range) {
      return `第${range[0]}-${range[1]}条 | 共${total} 条`
    },
  }
}

// 将@indicatorType map成数组的格式：
config.indicatorTypeArray = Object.keys(config.indicatorType).map((key) => ({ label: config.indicatorType[key].label, value: config.indicatorType[key].value }))

export default config
