/**
 * 获取指标详情
 */

const delay = 500
module.exports = (req, res) => {
  const { indicatorId } = req.params
  const r = {
    // 返回值为时间区间
    r_1: {
      ok: true,
      data: {
        // 基本信息：
        base: {
          indicatorName: 'KP101',
          indicatorIntro: '介绍',
          indicatorType: '基本指标',
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

    // 返回值为某一个单纯的具体数据
    r_2: {
      ok: true,
      data: {
        // 基本信息：
        base: {
          indicatorName: 'KP101',
          indicatorIntro: '介绍',
          indicatorType: '基本指标',
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
    // res.json(r.r_1)
    // res.json(r.r_err)
    if (indicatorId == 'id__1') {
      res.json(r.r_1)
    } else {
      res.json(r.r_2)
    }
  }, delay)
}
