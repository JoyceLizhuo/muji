/**
 * 输出特定格式的日期
 * 以统一页面上的日期展示格式
 */

export default function (ts) {
  const date = new Date(+ts)
  const fullYear = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const format1 = `${fullYear}-${month}-${day} ${hour}:${minute}:${second}`
  // const formatLocale = date.toLocaleString()
  return format1
}
