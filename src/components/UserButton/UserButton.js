import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'antd'
import './UserButton.css'

const { Item: MenuItem } = Menu

const menu = (
  <Menu>
    <MenuItem>
      用户管理
    </MenuItem>
    <MenuItem>
      退出
    </MenuItem>
  </Menu>
)

class UserPage extends PureComponent {
  render () {
    return (
      <div className="main_page-user_btn">
        <Dropdown
          overlay={menu}
          placement="bottomCenter"
        >
          <div className="user_btn">
            <Icon type="user" />
            <span className="name">yaohuiwang</span>
          </div>
        </Dropdown>
      </div>
    )
  }
}

function mapStateToProps () {
  return {
    foo: 'foo'
  }
}

export default withRouter(connect(mapStateToProps)(UserPage))
