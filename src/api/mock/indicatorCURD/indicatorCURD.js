/**
 * --holder的CURD
 */

const delay = 500
function getList (num) {
  const r = []
  for (let i = num; i > 0; --i) {
    r.push({
      img: '',
      title: `我是标题${i}`,
      desc: `我是描述${i}`,
      address: `我是地址${i}`,
      price: `3000${i}`,
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
      data: [
        ...getList(5),
        {
          img: '',
          title: `我是标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题`,
          desc: `我是描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述`,
          address: `我是地址地址地址地址地址地址地址地址地址地址`,
          price: `30000000000000000000`,
        },
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
          indicatorSQL: 'select * from table xxxxxxx', // --holderSQL
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

          // 跟横坐标一一对应的具体--holder数据
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
          indicatorSQL: 'select * from table xxxxxxx', // --holderSQL
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
        if (indicatorId === undefined) { // 查全部
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
