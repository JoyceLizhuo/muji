import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Table, Menu, Dropdown, Icon, Popconfirm } from 'antd'
import { createAction } from 'redux-actions'
import types from '../../../util/actionTypes'
import config from '../../../util/config'
import dateFormat from '../../../util/methods/dateFormat'
import { deleteIndicator } from '../../../service/IndicatorOperate'
import './IndicatorTable.css'

class IndicatorTable extends PureComponent {
  constructor (props) {
    super(props)
    this.getColumns = this.getColumns.bind(this)
    this.getEditMenu = this.getEditMenu.bind(this)
    this.getFilterList = this.getFilterList.bind(this)
  }

  // 生成table的filter菜单
  getFilterList (name) {
    const r = []
    this.props.indicatorList.forEach((item) => {
      const itemValue = item[name]
      if (!r.find(({ value }) => ( value === itemValue ))) {
        const filterItem = {
          text: itemValue,
          value: itemValue,
        }
        if (name === 'createdAt') {
          filterItem.text = dateFormat(itemValue)
        }
        r.push(filterItem)
      }
    })
    return r
  }

  // 生成table的编辑菜单
  getEditMenu ({ indicatorName, indicatorId }) {
    const { handleDeleteIndicator } = this.props
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
            onConfirm={() => { handleDeleteIndicator(indicatorId) }}
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

  // 生成table的column
  getColumns () {
    const that = this
    const columns = [{
      title: '指标名称',
      dataIndex: 'indicatorName',
      key: 'indicatorName',
      sorter: (a, b) => (a.indicatorName > b.indicatorName ? 1 : -1),
    }, {
      title: '指标说明',
      dataIndex: 'indicatorIntro',
      key: 'indicatorIntro',
    }, {
      title: '指标类型',
      dataIndex: 'indicatorType',
      key: 'indicatorType',
      filters: this.getFilterList('indicatorType'),
      onFilter (value, { indicatorType }) {
        return value === indicatorType
      },
    }, {
      title: '数据来源',
      dataIndex: 'dataSource',
      key: 'dataSource',
      filters: this.getFilterList('dataSource'),
      onFilter (value, { dataSource }) {
        return value === dataSource
      },
    }, {
      title: '指标状态',
      dataIndex: 'indicatorStatus',
      key: 'indicatorStatus',
      filters: this.getFilterList('indicatorStatus'),
      onFilter (value, { indicatorStatus }) {
        return value === indicatorStatus
      },
    }, {
      title: '所属业务',
      dataIndex: 'underBiz',
      key: 'underBiz',
      filters: this.getFilterList('underBiz'),
      onFilter (value, { underBiz }) {
        return value === underBiz
      },
    }, {
      title: '创建者',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
      filters: this.getFilterList('createdAt'),
      onFilter (value, { createdAt }) {
        return value === createdAt
      },
      sorter: (a, b) => (+a.createdAt > +b.createdAt ? 1 : -1),
      render (text) {
        return (
          <span>
            {dateFormat(text)}
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
              overlay={that.getEditMenu(record)}
            >
              <span className="dropdownBtn">
                <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        )
      }
    }]
    return columns
  }
  render () {
    const { className, indicatorList, loading } = this.props
    return (
      <div className={`${className} indicatorTable-wrap`}>
        <Table
          loading={loading}
          className="indicatorTable-table"
          bordered
          rowKey="indicatorId"
          dataSource={indicatorList}
          columns={this.getColumns(indicatorList)}
          pagination={config.pagination}
        />
      </div>
    )
  }
}

IndicatorTable.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleDeleteIndicator: PropTypes.func.isRequired,

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

const mapStateToProps = ({ indicatorSummary: { indicatorList, loading } }) => {
  return {
    indicatorList,
    loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 删除一条指标
    async handleDeleteIndicator (indicatorId) {
      const deleteAction = createAction(types.indicatorDelete)
      try {
        await deleteIndicator({ indicatorId })
        dispatch(deleteAction({
          deletedIndicatorId: indicatorId,
        }))
      } catch (e) {
        console.log('删除指标失败：', indicatorId)
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndicatorTable))
