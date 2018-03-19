/**
 * 用于mock的服务
 */

const PORT = 3001
const express = require('express')
const bodyParser = require('body-parser')
const api = require('../config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 登录
app.all(api.login, require('./login/login'))

// 鉴权
app.all(api.validate, require('./validate/validate'))

// 获取指标
app.all(api.getIndicator, require('./mainPage/getIndicator'))

// 删除指标
app.all(api.deleteIndicator, require('./mainPage/deleteIndicator'))

// 获取指标详情
app.all(`${api.indicatorDetailData}/:indicatorId`, require('./detailPage/indicatorDetailData'))

// 启动mock
app.listen(PORT, () => {
  console.log(`mock server is listening on http://localhost:${PORT}`)
})

