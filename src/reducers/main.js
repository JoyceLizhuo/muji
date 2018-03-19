/**
 * 通用的state
 */
import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  bizId: '', // 当前选中的业务的id
  bizList: [], // 业务列表
  dataSourceList: [], // 数据来源列表
}

export default handleActions({
  [types.main_setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState)
