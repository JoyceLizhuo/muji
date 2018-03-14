import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Table, Menu, Dropdown, Icon, Popconfirm } from 'antd'
import config from '../../../util/config'

import './IndicatorTable.css'

function getEditMenu ({ indicatorName }) {
  return (
    <Menu>
      <Menu.Item>
        <Icon type="edit" /> 修改
      </Menu.Item>
      <Menu.Item>
        <Icon type="clock-circle-o" /> 查看历史记录
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          title={(<p>确定删除 <span className="bold">{indicatorName}</span>？</p>)}
          onConfirm={() => {}}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <div className="dangerColor">
            <Icon type="delete" /> 删除
          </div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )
}

const columns = [{
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
  render (text) {
    return (
      <span>
          {(new Date(+text)).toLocaleString()}
        </span>
    )
  },
}, {
  title: '指标版本',
  dataIndex: 'indicatorVersion',
  key: 'indicatorVersion',
}, {
  title: '指标操作',
  dataIndex: 'edit',
  key: 'edit',
  render (text, record) {
    return (
      <div className="link">
        <span>查看</span>
        <Dropdown
          placement="bottomCenter"
          overlay={getEditMenu(record)}
        >
            <span className="dropdownBtn">
              <Icon type="down" />
            </span>
        </Dropdown>
      </div>
    )
  }
}]

class IndicatorTable extends PureComponent {
  render () {
    const { className, indicatorList, loading } = this.props
    return (
      <div className={`${className} indicatorTable-wrap`}>
        <Table
          loading={loading}
          rowKey="indicatorName"
          className="indicatorTable-table"
          bordered
          dataSource={indicatorList}
          columns={columns}
          pagination={config.pagination}
        />
      </div>
    )
  }
}

IndicatorTable.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,

  // table的dataSource
  indicatorList: PropTypes.arrayOf(PropTypes.shape({
    indicatorName: PropTypes.string, // 指标名称
    indicatorIntro: PropTypes.string, // 指标说明
    indicatorType: PropTypes.string, // 指标类型
    dataSource: PropTypes.string, // 数据来源
    indicatorStatus: PropTypes.string, // 指标状态
    underBiz: PropTypes.string, // 所属业务
    createdBy: PropTypes.string, // 创建者
    createdAt: PropTypes.string, // 创建日期的时间戳
    indicatorVersion: PropTypes.string, // 指标版本
  })).isRequired,
}

IndicatorTable.defaultProps = {
  className: '',
}

const mapStateToProps = ({ indicatorList: { indicatorList, loading } }) => {
  return {
    indicatorList,
    loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndicatorTable))
