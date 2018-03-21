/**
 * 指标的增删改查
 */

import axios from './axios'
import api from '../api/config'

// 获取所有业务下的所有的指标
export function getAllIndicators () {
  return axios({
    url: `${api.curdIndicator}`,
  })
}

// 获取指标 @indicatorId
export default function getIndicatorDetailData (indicatorId) {
  return axios({
    url: `${api.curdIndicator}/${indicatorId}`,
  })
}

// 删除指标
export function deleteIndicator ({ indicatorId }) {
  return axios({
    url: `${api.curdIndicator}/${indicatorId}`,
    method: 'delete',
  })
}

// 添加指标
export function addIndicator ({ data }) {
  return axios({
    url: api.curdIndicator,
    method: 'post',
    data,
  })
}

// 修改指标
export function modifyIndicator ({ indicatorId, data }) {
  return axios({
    url: `${api.curdIndicator}/${indicatorId}`,
    method: 'put',
    data,
  })
}
