/**
 *
 */

const delay = 500

module.exports = (req, res) => {
  const r = {
    r_1: {
      ok: true,

      // 返回跟用户有关的初始化信息（业务权限等信息）
      data: {
        // 业务列表：
        bizList: [{
          bizId: 'id_yiosou',
          bizName: '姨搜',
        }, {
          bizId: 'id_ywB',
          bizName: '业务B',
        }, {
          bizId: 'id_ywC',
          bizName: '业务C',
        }],
        // 数据来源列表
        dataSourceList: [{
          name: 'mySQL'
        }, {
          name: 'Hive',
        }]
      }
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
