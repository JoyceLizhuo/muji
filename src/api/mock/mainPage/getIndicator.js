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
      createdAt: `152099825471${i}`, // 创建日期的时间戳
      indicatorVersion: 'V1', // 指标版本
      indicatorSQL: 'select * from table xxxxxxx', // 指标SQL
      indicatorId: `id_${i}`,
    })
  }
  return r
}

module.exports = (req, res) => {
  const r = {
    r_2: {
      ok: true,
      data: [{
        indicatorName: 'KP101-1',
        indicatorIntro: '介绍',
        indicatorType: '基本指标',
        dataSource: 'MySQL',
        indicatorStatus: '有效',
        underBiz: '业务B',
        createdBy: 'wyh',
        createdAt: '1520997254713',
        indicatorVersion: 'V1',
        indicatorSQL: 'select * from table xxxxxxx', // 指标SQL
        indicatorId: 'id__1',
      }, {
        indicatorName: 'KP102-2',
        indicatorIntro: '介绍',
        indicatorType: '复合指标',
        dataSource: 'MySQL',
        indicatorStatus: '有效',
        underBiz: '业务B',
        createdBy: 'wyh',
        createdAt: '1520995254713',
        indicatorVersion: 'V1',
        indicatorSQL: 'select * from table xxxxxxx', // 指标SQL
        indicatorId: 'id__2',
      }, {
        indicatorName: 'KP101-3',
        indicatorIntro: '介绍',
        indicatorType: '普通指标',
        dataSource: 'MySQL',
        indicatorStatus: '有效',
        underBiz: '业务C',
        createdBy: 'wyh',
        createdAt: '1520938254713',
        indicatorVersion: 'V1',
        indicatorSQL: 'select * from table xxxxxxx', // 指标SQL
        indicatorId: 'id__3',
      },
        ...getList(5)
      ],
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
