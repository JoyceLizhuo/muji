import axios from './axios'
import api from '../api/config'

// 获取所有业务下的所有的指标
export function getAllIndicators () {
  return axios({
    url: api.getIndicator,
  })
}

// 删除指标
export function deleteIndicator ({ indicatorId }) {
  return axios({
    url: api.deleteIndicator,
    method: 'delete',
    data: {
      indicatorId,
    }
  })
}
