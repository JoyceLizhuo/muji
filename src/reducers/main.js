/**
 * 通用的state
 */
const defaultState = {
  bizId: '', // 当前选中的业务的id
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
