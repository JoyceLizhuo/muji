import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
import './LoginPage.css'

const { Item: FormItem } = Form
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePwdChange = this.handlePwdChange.bind(this)
    this.check = this.check.bind(this)
  }

  handleUserNameChange () {}
  handlePwdChange () {}

  // 检查表单
  check () {
    const { validateFieldsAndScroll, getFieldsValue } = this.props.form
    validateFieldsAndScroll(
      (err) => {
        if (!err) {
          console.log('form json: ', getFieldsValue())
        }
      },
    );
  }

  render () {
    const {
            form: {
              getFieldDecorator,
            },
          } = this.props
    return (
      <div className="login-page">
        <h1 className="login-page-title">--holder管理平台</h1>
        <div className="login-page-form-wrap">
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('userName', {
              rules: [{
                required: true,
                message: '请输入用户名',
              }],
            })(
              <Input
                placeholder="请输入用户名"
                onChange={this.handleUserNameChange}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('pwd', {
              rules: [{
                required: true,
                message: '请输入密码',
              }],
            })(
              <Input
                placeholder="请输入密码"
                onChange={this.handlePwdChange}
              />
            )}
          </FormItem>
          <div className="alignCenter">
            <Button type="primary" onClick={this.check}>
              登录
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
