/**
 * 获取指标
 */

const delay = 500
function getList (num) {
  const r = []
  for (let i = num; i > 0; --i) {
    r.push({
      indicatorName: `KP${i}`, // 指标名称
      indicatorIntro: '介绍', // 指标说明
      indicatorType: '基本指标', // 指标类型
      dataSource: 'MySQL', // 数据来源
      indicatorStatus: '有效', // 指标状态
      underBiz: '业务A', // 所属业务
      createdBy: 'wyh', // 创建者
      createdAt: '1520998254713', // 创建日期的时间戳
      indicatorVersion: 'V1', // 指标版本
    })
  }
  return r
}

module.exports = (req, res) => {
  const r = {
    r_1: {
      ok: true,
      data: [{ // 指标列表:
        indicatorName: 'KP101', // 指标名称
        indicatorIntro: '介绍', // 指标说明
        indicatorType: '基本指标', // 指标类型
        dataSource: 'MySQL', // 数据来源
        indicatorStatus: '有效', // 指标状态
        underBiz: '业务A', // 所属业务
        createdBy: 'wyh', // 创建者
        createdAt: '1520998254713', // 创建日期的时间戳
        indicatorVersion: 'V1', // 指标版本
      }],
    },
    r_2: {
      ok: true,
      data: getList(120),
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
    res.json(r.r_2)
    // res.json(r.r_err)
  }, delay)
}
