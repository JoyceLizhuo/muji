import { handleActions } from 'redux-actions'
import types from '../util/actionTypes'

const defaultState = {
  loading: false,
  detailData: {
    indicatorData: null,
    base: null,
  },
}


export default handleActions({
  [types.indicatorDetail_setState]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState)
