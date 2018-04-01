import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import jQuery from 'jquery'
import { Modal } from 'antd'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import { createAction } from "redux-actions"
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import * as reducers from './reducers/index'
import axios from './service/axios'
import types from "./util/actionTypes"
import routerPath from './util/routerPath'
import NotFind from './routers/NotFind/NotFind'
import Help from './routers/Help/Help'
import IndicatorSummary from "./routers/IndicatorSummary/IndicatorSummary"
import LoginPage from "./routers/Login/LoginPage"
import DetailPage from './routers/DetailPage/DetailPage'

const api = require('./api/config')
window.$ = jQuery

const combinedReducer = combineReducers(reducers)
const store = createStore(
  combinedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // 开发环境下开启redux调试
)

let validateError = false
// 先鉴权
axios({
  url: api.validate,
})
  .catch((err) => {
    console.log('初始化鉴权接口出错：', err)
    validateError = true
    Modal.error({
      title: '初始化鉴权接口出错',
      content: '请刷新页面后重试',
      okText: '刷新',
      onOk () {
        window.location.reload()
      },
      onCancel () {
        window.location.reload()
      },
    })
  })
  .then((res) => {
    if (validateError) {
      return
    }
    ReactDOM.render((
      <Provider store={store}>
        <Router>
          <Switch>
            <Redirect exact from="/" to={routerPath.summary} />
            <Route exact path={routerPath.help} component={Help} />
            <Route exact path={routerPath.login} component={LoginPage} />
            <Route exact path={routerPath.summary} component={IndicatorSummary} />
            <Route exact path={`${routerPath.detail}/:detailId`} component={DetailPage} />
            <Route component={NotFind} />
          </Switch>
        </Router>
      </Provider>
    ), document.getElementById('root'))

    // 将鉴权返回的用户初始信息填入
    const setState = createAction(types.main_setState)
    const { data: { data: {
      bizList, // 业务列表
      dataSourceList, // 数据源列表
    } } } = res
    store.dispatch(setState({
      dataSourceList,
      bizList,
    }))

    // 开启serviceWorker
    registerServiceWorker()
  })
