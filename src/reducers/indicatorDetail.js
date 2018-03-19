/**
 * 指标首页
 */
import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  loading: false,
  detailData: {
    indicatorData: null, // 指标数据
    base: null, // 此条指标的基本信息
  },
}


export default handleActions({
  [types.indicatorDetail_setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState)
