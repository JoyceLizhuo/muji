/**
 * 指标首页
 */
import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  indicatorList: [],
  loading: false,
  showModal: false,
}


export default handleActions({
  [types.setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [types.indicatorDelete] (state, { payload: { deletedIndicatorId } }) {
    const { indicatorList } = state
    return {
      ...state,
      indicatorList: indicatorList.filter(({ indicatorId }) => (indicatorId !== deletedIndicatorId))
    }
  },
}, defaultState)
