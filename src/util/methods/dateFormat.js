/**
 * 输出特定格式的日期
 * 以统一页面上的日期展示格式
 */

export default function (ts) {
  return (new Date(+ts)).toLocaleString()
}
