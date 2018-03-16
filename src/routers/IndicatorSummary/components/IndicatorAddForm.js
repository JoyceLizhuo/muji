/**
 * 添加指标的表单
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, Radio, Button } from 'antd'
import './IndicatorAddForm.css'
import config from '../../../util/config'

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
    console.log('form: ', this.props.form)
    this.check = this.check.bind(this)
    this.handleDataSourceChange = this.handleDataSourceChange.bind(this)
    this.handleIndicatorNameChange = this.handleIndicatorNameChange.bind(this)
    this.handleIndicatorIntroChange = this.handleIndicatorIntroChange.bind(this)
    this.handleIndicatorTypeChange = this.handleIndicatorTypeChange.bind(this)
    this.handleUnderBizChange = this.handleUnderBizChange.bind(this)
    this.handleIndicatorSQLChange = this.handleIndicatorSQLChange.bind(this)
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
      defaultValue: {
        indicatorName,
        indicatorIntro,
        dataSource,
        indicatorType,
        underBiz,
        indicatorSQL,
      },
    } = this.props
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
          table
        </div>
      </div>
    )
  }
}

IndicatorAdd.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.shape({
    indicatorName: PropTypes.string,
    indicatorIntro: PropTypes.string,
    dataSource: PropTypes.string,
    indicatorSQL: PropTypes.string,
  }),
  bizList: PropTypes.arrayOf(PropTypes.shape({
    bizId: PropTypes.string,
    bizName: PropTypes.string,
  })).isRequired,
  dataSourceList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
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

function mapStateToProps ({ main: { dataSourceList, indicatorTypeList, bizList } }) {
  return {
    bizList,
    dataSourceList,
  }
}

export default withRouter(connect(mapStateToProps)(Form.create()(IndicatorAdd)))
