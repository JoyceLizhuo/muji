/**
 * 获取指标
 */

const delay = 500
module.exports = (req, res) => {
  const r = {
    r_1: {
      ok: true,
    },
    r_err: {
      ok: false,
      errMsg: '接口超时，请稍后再试',
    },
  }

  setTimeout(() => {
    // res.status(401).end()
    // res.status(403).end()
    // res.status(500).end()
    // res.status(502).end()
    res.json(r.r_1)
    // res.json(r.r_err)
  }, delay)
}
