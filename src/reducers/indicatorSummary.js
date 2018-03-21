/**
 * 指标首页
 */
import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  indicatorList: [], // 一次性加载的所有指标的列表
  loading: false,
  showAddModal: false,

  showEditModal: false,

  // 当前修改的那一条的数据
  edittingRecord: {},
}


export default handleActions({
  [types.indicatorSummary_setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [types.indicatorSummary_indicatorDelete] (state, { payload: { deletedIndicatorId } }) {
    const { indicatorList } = state
    return {
      ...state,
      indicatorList: indicatorList.filter(({ indicatorId }) => (indicatorId !== deletedIndicatorId))
    }
  },
}, defaultState)
