# 指标管理平台

## 框架
creat-react-app生成的框架(ejected)加自定义的配置和包  

## 包管理
- 统一用npm源  
- 利用npm@>5版本生成的package-lock.json统一依赖包的版本，虽然creat-react-app默认使用yarn管理，但是此工程中使用npm管理。

## 构建
webpack

## css预处理
post-css + css-next

## js
- 请使用ES2015及以上技术
- 异步处理：请使用asyc + promise
- 用Immutable.js解决js引用类型防篡改
- 用Flow.js解决js动态类型的静态化

## react工具链
- react
- redux
- react-router-redux
- Flow
- Immutable
- antd

## lint
eslint、stylelint做代码审查，可以**适量**添加自定义规范  
开发及构建时都做lint，请保证所有代码都通过lint的审查，否则无法构建

## code-split
按router做code-split

## 环境
- node: >= 8.x  
- npm: >= 5.x

## 开发
项目初始时或有包更新／新引入时需要执行：  
```
$ npm i
```
然后按照package.json中的scripts内定义的脚本启动开发server或构建等

## 说明与注意
- 请写良好的注释及todo
- 不要出现hard-code（重复的字符串添加到src/util/config中、重复的css值添加到src/stylesheet/vars中）
- 接口文档： [指标管理平台前后端接口文档](http://wiki.yxapp.in/pages/viewpage.action?pageId=40572530)

## 目录结构
|目录|内容|
|----|----|
|src/config/|存放构建配置|
|src/scripts/|存放构建脚本|
|src/public/|存放静态文件（如图片、字体）|
|src/api/|存放接口地址|
|src/components/|存放通用的组件|
|src/routers/|存放页面|
|src/stylesheets|存放通用的css代码，如全局变量、reset等|
|src/util/config|存放全局的配置|
|src/reducers/|按类别或页面划分reducer|
|src/services/|/axios.js：封装好的axios请求方法，统一封装了接口返回错误时的处理逻辑。  <br />  /其他文件：按页面分组的接口方法|
