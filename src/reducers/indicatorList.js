/**
 * 指标列表
 */
const defaultState = {
  indicatorList: [],
  loading: false,
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case 'setState':
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}
