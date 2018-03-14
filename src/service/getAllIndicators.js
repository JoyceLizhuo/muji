import axios from './axios'
import api from '../api/config'

// 获取所有业务下的所有的指标
export default function () {
  return axios({
    url: api.getIndicator,
  })
}
