/**
 * 跟用户相关的state
 */
import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  name: '', // 中文名
  enName: '', // 英文名
}

export default handleActions({
  [types.user_setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState)

