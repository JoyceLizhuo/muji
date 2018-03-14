/**
 *
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
    res.json(r.r_1)
  }, delay)
}
