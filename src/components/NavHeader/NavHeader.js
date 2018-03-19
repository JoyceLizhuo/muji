/**
 * todo 菜单跟产品决定
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import UserButton from '../UserButton/UserButton'
import './NavHeader.css'

const { SubMenu, ItemGroup: MenuItemGroup } = Menu

class NavHeader extends PureComponent {
  render () {
    const { className } = this.props
    return (
      <div className={`${className} main_page-nav_header`}>
        <div className="main_page-nav">
          <Menu
            mode="horizontal"
            className="main_page-nav-list"
          >
            <Menu.Item key="mail">
              <Icon type="table" />指标列表
            </Menu.Item>
            <Menu.Item key="app">
              <Icon type="appstore" />操作
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />更新历史</span>}>
              <MenuItemGroup title="发布增删">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="修改历史">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <Icon type="search" />搜索
            </Menu.Item>
          </Menu>
        </div>
        <UserButton />
      </div>
    )
  }
}

NavHeader.propTypes = {
  className: PropTypes.string,
}

NavHeader.defaultPtops = {
  className: '',
}

function mapStateToProps (state) {
  return {
    foo: 'foo'
  }
}

export default withRouter(connect(mapStateToProps)(NavHeader))
