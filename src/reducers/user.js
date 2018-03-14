/**
 * 跟用户相关的state
 */
const defaultState = {
  name: '', // 中文名
  enName: '', // 英文名
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
