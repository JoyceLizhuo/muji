/**
 * 封装好的axios，用法跟axios一致
 * 统一封装了接口鉴权逻辑、超时逻辑
 */
import React from 'react'
import axios from 'axios'
import { message, Modal } from 'antd'

export default function (inputedArgs) {
  function errModalContent ({ title = '网络请求错误', url = inputedArgs.url, sub = (<p>请检查您的网络并稍后重试</p>) }) {
    return {
      title,
      content: (
        <div style={{ wordWrap: 'break-word' }}>
          <p>地址：<span>{url}</span></p>
          {sub !== false && sub}
        </div>
      ),
    }
  }
  const args = {
    ...inputedArgs,
    timeout: 10000, // 超时时间
  }
  return new Promise((resolve, reject) => {
    axios(args)
      .then((res) => {
        /**
         * @data 前后端约定的格式：
         * {
         *    ok: true, // <bool>【必须】 true：接口将返回正常的信息；false：接口将返回非正常信息
	            errMsg: '', // <string>【可选，ok为false时才需要】ok为false时的错误信息（用于在页面上展示发生了什么错误，所以请将错误信息的文案配置的合理）
	            errCode: '', // <string> 【可选，ok为false时才需要】前后端统一定制的错误编码 ？？
	            data: {}, // <obj/array>【可选，ok为true时才需要】ok为true时返回的信息
         * }
         */
        const { data: { ok, errMsg } } = res
        if (ok === 'true' || ok === true) { // 兼容接口json格式
          resolve(res)
        } else { // 这里可以统一处理 ok: false 时的所有错误信息
          message.error((
            <div className="alignLeft">
              <span className="dangerColor">{errMsg || '网络出现错误'}</span>
              <p>接口：{inputedArgs.url}</p>
            </div>
          ))
          reject(res)
        }
      })
      .catch((err) => { // 这里可以统一处理接口status非200时的错误
        if (err.response === undefined) { // 超时，请求被取消
          Modal.error(errModalContent({
            title: '网络请求超时',
          }))
        } else {
          switch (err.response.status) {
            case 502:
            case 500:
              Modal.error(errModalContent({
                title: '网络服务器出错',
                sub: false,
              }))
              break
            case 404:
              Modal.error(errModalContent({
                title: '网络地址不存在',
                sub: false,
              }))
              break
            case 403: // 无权限访问此接口
              Modal.error(errModalContent({
                title: '您无访问此接口的权限',
                sub: (<p>您可以向您的管理员询问上述接口的权限是否开通</p>),
              }))
              break
            case 401: // 未登录
              message.error('请先登录')
              break
            default:
              reject(err)
          }
        }
        reject(err)
      })
  })
}
