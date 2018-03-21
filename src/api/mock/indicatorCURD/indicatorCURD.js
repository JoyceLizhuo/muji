/**
 * 指标的CURD
 */

const delay = 500
function getList (num) {
  const r = []
  for (let i = num; i > 0; --i) {
    r.push({
      indicatorName: `KP${i}`, // 指标名称
      indicatorIntro: '介绍', // 指标说明
      indicatorType: 'basic', // 指标类型
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
  const { params: { indicatorId } } = req
  console.log('indicatorId: ', indicatorId)
  const r = {
    delete: {
      ok: true,
    },
    add: {
      ok: true,
    },
    modify: {
      ok: true,
    },
    getAll: {
      ok: true,
      data: [{
        indicatorName: 'KP101-1',
        indicatorIntro: '介绍',
        indicatorType: 'basic',
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
        indicatorType: 'compound',
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
        indicatorType: 'normal',
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
    getChart: {
      ok: true,
      data: {
        // 基本信息：
        base: {
          indicatorName: 'KP101',
          indicatorIntro: '介绍',
          indicatorType: 'basic',
          dataSource: 'MySQL',
          indicatorStatus: '有效',
          underBiz: '业务B',
          createdBy: 'wyh',
          createdAt: '1520997254713',
          indicatorVersion: 'V1',
          indicatorSQL: 'select * from table xxxxxxx', // 指标SQL
          indicatorId,
        },

        // 具体信息：
        indicatorData: {
          // 横坐标的坐标点 <int>Array，即时间戳
          xAxis: [1521523765586, 1521524765586, 1521525765586, 1521526765586, 1521527765586, 1521528765586, 1521529765586],

          // 纵坐标的配置
          yAxis: {
            unit: '件', // 纵坐标的单位
          },

          // 跟横坐标一一对应的具体指标数据
          seriesData: [5, 20, 3600, 10, 10, 20, 120],
        },
      },
    },
    getValue: {
      ok: true,
      data: {
        // 基本信息：
        base: {
          indicatorName: 'KP101',
          indicatorIntro: '介绍',
          indicatorType: 'basic',
          dataSource: 'MySQL',
          indicatorStatus: '有效',
          underBiz: '业务B',
          createdBy: 'wyh',
          createdAt: '1520997254713',
          indicatorVersion: 'V1',
          indicatorSQL: 'select * from table xxxxxxx', // 指标SQL
          indicatorId,
        },

        indicatorData: {
          label: '今日平台进件总数',
          value: '3000件',
        },
      },
    },
    err: {
      ok: false,
      errMsg: '接口超时，请稍后再试',
    },
  }

  setTimeout(() => {
    switch (req.method.toLowerCase()) {
      case 'delete': // 删
        res.json(r.delete)
        break
      case 'post': // 增
        res.json(r.add)
        // res.json(r.err)
        break
      case 'put': // 改
        res.json(r.modify)
        break
      case 'get': // 查
        if (indicatorId === 'all') { // 查全部
          res.json(r.getAll)
        } else { // 查一条
          if (indicatorId === 'id__1') { // 返回数据图
            res.json(r.getChart)
          } else { // 返回value
            res.json(r.getValue)
          }
        }
        break
      default:
    }
  }, delay)
}
