/**
 * 添加指标的表单
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Input, Select, Radio, Button, Table } from 'antd'
import './IndicatorAddForm.css'
import config from '../../../util/config'
import Search from './Search'
import routerPath from "../../../util/routerPath";

const { Item: FormItem } = Form
const { Group: RadioGroup } = Radio
const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

class IndicatorAdd extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchedValue: '',
    }
    this.check = this.check.bind(this)
    this.handleDataSourceChange = this.handleDataSourceChange.bind(this)
    this.handleIndicatorNameChange = this.handleIndicatorNameChange.bind(this)
    this.handleIndicatorIntroChange = this.handleIndicatorIntroChange.bind(this)
    this.handleIndicatorTypeChange = this.handleIndicatorTypeChange.bind(this)
    this.handleUnderBizChange = this.handleUnderBizChange.bind(this)
    this.handleIndicatorSQLChange = this.handleIndicatorSQLChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (searchedValue) {
    this.setState({
      searchedValue,
    })
  }

  // 检查表单
  check () {
    const { validateFieldsAndScroll, getFieldsValue } = this.props.form
    validateFieldsAndScroll(
      (err) => {
        if (!err) {
          this.props.onSuccess(getFieldsValue())
        }
      },
    );
  }

  handleIndicatorNameChange (value) {
    this.props.form.setFieldsValue({
      indicatorName: value,
    })
  }

  handleIndicatorIntroChange (value) {
    this.props.form.setFieldsValue({
      indicatorIntro: value,
    })
  }

  // change 数据来源
  handleDataSourceChange (e) {
    this.props.form.setFieldsValue({
      dataSource: e.target.value,
    })
  }

  handleIndicatorTypeChange (e) {
    this.props.form.setFieldsValue({
      indicatorType: e.target.value,
    })
  }

  handleUnderBizChange (value) {
    this.props.form.setFieldsValue({
      underBiz: value,
    })
  }

  handleIndicatorSQLChange (value) {
    this.props.form.setFieldsValue({
      indicatorSQL: value,
    })
  }

  render () {
    const {
      form: {
        getFieldDecorator,
      },
      className,
      bizList,
      dataSourceList,
      indicatorList,
      defaultValue: {
        indicatorName,
        indicatorIntro,
        dataSource,
        indicatorType,
        underBiz,
        indicatorSQL,
      },
    } = this.props
    const columns = [{
      title: '指标名称',
      dataIndex: 'indicatorName',
      key: 'indicatorName',
    }, {
      title: '指标说明',
      dataIndex: 'indicatorIntro',
      key: 'indicatorIntro',
    }, {
      title: '所属业务',
      dataIndex: 'underBiz',
      key: 'underBiz',
    }, {
      title: '创建者',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      title: '指标操作',
      dataIndex: 'edit',
      key: 'edit',
      render (text, record) {
        return (
          <div className="link alignCenter">
            <Link to={`${routerPath.detail}/${record.indicatorId}`} target="_blank">查看</Link>
          </div>
        )
      }
    }]
    const tableDatasource = indicatorList.filter(({ indicatorName }) => (indicatorName.toLowerCase().includes(this.state.searchedValue.toLowerCase())))
    return (
      <div className={`${className} indicatorAddForm`}>
        <div className="indicatorAddForm-form_wrap">
          <FormItem {...formItemLayout} label="指标名称">
            {getFieldDecorator('indicatorName', {
              initialValue: indicatorName,
              rules: [{
                required: true,
                message: '请输入指标名称',
              }],
            })(
              <Input
                placeholder="请输入指标名称"
                onChange={this.handleIndicatorNameChange}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="指标说明">
            {getFieldDecorator('indicatorIntro', {
              initialValue: indicatorIntro,
              rules: [{
                required: true,
                message: '请输入指标说明',
              }],
            })(
              <Input
                placeholder="请输入指标说明"
                onChange={this.handleIndicatorIntroChange}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="指标类型">
            {getFieldDecorator('indicatorType', {
              initialValue: indicatorType,
              rules: [{
                required: true,
                message: '请输入指标类型',
              }],
            })(
              <RadioGroup
                options={ config.indicatorTypeArray }
                onChange={this.handleDataSourceChange}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="数据来源">
            {getFieldDecorator('dataSource', {
              initialValue: dataSource || dataSourceList[0].name,
              rules: [{
                required: true,
                message: '请选择数据来源',
              }],
            })(
              <RadioGroup
                options={ dataSourceList.map(({ name }) => ({ label: name, value: name })) }
                onChange={this.handleDataSourceChange}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属业务">
            {getFieldDecorator('underBiz', {
              initialValue: underBiz || bizList[0].bizId,
              rules: [{
                required: true,
                message: '请选择所属业务',
              }],
            })(
              <Select onChange={this.handleUnderBizChange} style={{ width: 120 }}>
                {
                  bizList.map(({ bizId, bizName }) => (
                    <Option key={bizId} value={bizId}>{bizName}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="指标SQL">
            {getFieldDecorator('indicatorSQL', {
              initialValue: indicatorSQL,
              rules: [{
                required: true,
                message: '请输入指标SQL',
              }],
            })(
              <TextArea
                placeholder="请输入指标SQL"
                rows={6}
                onChange={this.handleIndicatorSQLChange}
              />
            )}
          </FormItem>
          <div className="alignCenter">
            <Button type="primary" onClick={this.check}>
              提交
            </Button>
          </div>
        </div>
        <div className="indicatorAddForm-indicators_table">
          <Search className="search" onSearch={this.handleSearch} />
          <Table
            bordered
            rowKey="indicatorId"
            dataSource={tableDatasource}
            columns={columns}
            pagination={{
              ...config.pagination,
              pageSize: 10,
            }}
          />
        </div>
      </div>
    )
  }
}

IndicatorAdd.propTypes = {
  className: PropTypes.string,

  indicatorList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // 表单的默认值
  defaultValue: PropTypes.shape({
    indicatorName: PropTypes.string,
    indicatorIntro: PropTypes.string,
    dataSource: PropTypes.string,
    indicatorSQL: PropTypes.string,
  }),

  // 业务列表，connect传入
  bizList: PropTypes.arrayOf(PropTypes.shape({
    bizId: PropTypes.string,
    bizName: PropTypes.string,
  })).isRequired,

  // 数据来源，connect传入
  dataSourceList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,

  // 点击"提交"且验证成功之后的回调，参数：表单内容的JSON
  onSuccess: PropTypes.func.isRequired,
}

IndicatorAdd.defaultProps = {
  className: '',
  defaultValue: {
    indicatorName: '',
    indicatorIntro: '',
    dataSource: '',
    indicatorSQL: '',
  },
}

function mapStateToProps ({ main: { dataSourceList, indicatorTypeList, bizList }, indicatorSummary: { indicatorList } }) {
  return {
    bizList,
    dataSourceList,
    indicatorList,
  }
}

export default withRouter(connect(mapStateToProps)(Form.create()(IndicatorAdd)))
