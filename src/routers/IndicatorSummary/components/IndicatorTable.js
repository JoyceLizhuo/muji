/**
 * todo table中的日期filter做成日历范围选择器
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Table, Menu, Dropdown, Icon, Popconfirm, message } from 'antd'
import { createAction } from 'redux-actions'
import types from '../../../util/actionTypes'
import config from '../../../util/config'
import dateFormat from '../../../util/methods/dateFormat'
import { deleteIndicator } from '../../../service/IndicatorOperate'
import './IndicatorTable.css'
import routerPath from '../../../util/routerPath'

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
    this.props.datasource.forEach((item) => {
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
            onConfirm={() => { handleDeleteIndicator(indicatorId, indicatorName) }}
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
    const columns = config.indicatorTableColumns.map((item) => {
      const { dataIndex } = item
      const r = {
        ...item,
      }
      switch (dataIndex) {
        case 'indicatorName':
          r.sorter = (a, b) => (a.indicatorName > b.indicatorName ? 1 : -1)
          break
        case 'indicatorType':
          r.filters = this.getFilterList('indicatorType')
          r.onFilter = (value, { indicatorType }) => (value === indicatorType)
          break
        case 'dataSource':
          r.filters = this.getFilterList('dataSource')
          r.onFilter = (value, { dataSource }) => (value === dataSource)
          break
        case 'indicatorStatus':
          r.filters = this.getFilterList('indicatorStatus')
          r.onFilter = (value, { indicatorStatus }) => (value === indicatorStatus)
          break
        case 'underBiz':
          r.filters = this.getFilterList('underBiz')
          r.onFilter = (value, { underBiz }) => (value === underBiz)
          break
        case 'createdAt':
          r.filters = this.getFilterList('createdAt')
          r.onFilter = (value, { createdAt }) => (value === createdAt)
          r.sorter = (a, b) => (+a.createdAt > +b.createdAt ? 1 : -1)
          break
        default:
      }
      return r
    })
    columns.push({
      title: '指标操作',
      dataIndex: 'edit',
      key: 'edit',
      render (text, record) {
        return (
          <div className="link">
            <Link to={`${routerPath.detail}/${record.indicatorId}`}>查看</Link>
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
    })
    return columns
  }
  render () {
    const { className, datasource, loading } = this.props
    return (
      <div className={`${className} indicatorTable-wrap`}>
        <Table
          loading={loading}
          className="indicatorTable-table"
          bordered
          rowKey="indicatorId"
          dataSource={datasource}
          columns={this.getColumns(datasource)}
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
  datasource: PropTypes.arrayOf(PropTypes.shape({
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

const mapStateToProps = ({ indicatorSummary: { loading } }) => {
  return {
    loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 删除一条指标
    async handleDeleteIndicator (indicatorId, indicatorName) {
      const deleteAction = createAction(types.indicatorSummary_indicatorDelete)
      try {
        await deleteIndicator({ indicatorId })
        dispatch(deleteAction({
          deletedIndicatorId: indicatorId,
        }))
        message.success(`成功删除指标：${indicatorName}`)
      } catch (e) {
        console.log('删除指标失败：', indicatorId, indicatorName)
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndicatorTable))
