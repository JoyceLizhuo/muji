import axios from './axios'
import api from '../api/config'

export function getAllIndicators () {
  return axios({
    url: `${api.curdIndicator}`,
  })
}

export default function getIndicatorDetailData (indicatorId) {
  return axios({
    url: `${api.curdIndicator}/${indicatorId}`,
  })
}

export function deleteIndicator ({ indicatorId }) {
  return axios({
    url: `${api.curdIndicator}/${indicatorId}`,
    method: 'delete',
  })
}

export function addIndicator ({ data }) {
  return axios({
    url: api.curdIndicator,
    method: 'post',
    data,
  })
}

export function modifyIndicator ({ indicatorId, data }) {
  return axios({
    url: `${api.curdIndicator}/${indicatorId}`,
    method: 'put',
    data,
  })
}
