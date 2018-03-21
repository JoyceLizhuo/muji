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
  [types.indicatorSummary_indicatorModify] (state, { payload: { indicatorId, submitData } }) {
    const { indicatorList } = state
    const len = indicatorList.length
    const newIndicatorList = []
    for (let i = 0; i < len; ++i) {
      const itemi = indicatorList[i]
      if (itemi.indicatorId === indicatorId) {
        newIndicatorList.push(submitData)
      } else {
        newIndicatorList.push(itemi)
      }
    }
    return {
      ...state,
      indicatorList: newIndicatorList,
    }
  },
  [types.indicatorSummary_indicatorAdd] (state, { payload: { newItem } }) {
    const { indicatorList } = state
    return {
      ...state,
      indicatorList: [
        ...indicatorList,
        newItem,
      ]
    }
  },
}, defaultState)
