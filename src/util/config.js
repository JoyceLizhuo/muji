import React from 'react'
import dateFormat from "./methods/dateFormat";

/**
 * 通用配置
 */
const config = {
  // 指标类型
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

  // 指标信息table的columns
  indicatorTableColumns: [{
    title: '指标名称',
    dataIndex: 'indicatorName',
    key: 'indicatorName',
  }, {
    title: '指标说明',
    dataIndex: 'indicatorIntro',
    key: 'indicatorIntro',
  }, {
    title: '指标类型',
    dataIndex: 'indicatorType',
    key: 'indicatorType',
  }, {
    title: '数据来源',
    dataIndex: 'dataSource',
    key: 'dataSource',
  }, {
    title: '指标状态',
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
    title: '指标版本',
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
