/**
 * 指标列表
 */
import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  indicatorList: [],
  loading: false,
}


export default handleActions({
  [types.setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState)
