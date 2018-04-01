/**
 * --holder的CURD
 */

const delay = 500
function getList (num) {
  const r = []
  const imgs = [
    'https://pic1.ajkimg.com/display/hj/a26b62555344a58fe67fa795ed137562/240x180m.jpg?t=1',
    'https://pic1.ajkimg.com/display/hj/8e27595e1b72c74de4f0a67c321e421b/240x180m.jpg?t=1',
    'https://pic1.ajkimg.com/display/hj/7668bd95c5757c05b7aaebf9ec55a3bd/240x180m.jpg?t=1',
    'https://pic1.ajkimg.com/display/hj/625e3bde01becfc3d144f2ab3debe86d/240x180m.jpg?t=1',
    'https://pic1.ajkimg.com/display/hj/78014816e0b8b9ebc812c42d80057f90/240x180m.jpg?t=1',
    'https://pic1.ajkimg.com/display/hj/704853b2417b34bd4a1687af117ac10b/240x180m.jpg?t=1',
  ]
  for (let i = num; i > 0; --i) {
    r.push({
      img: imgs[i],
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
          img: 'https://pic1.ajkimg.com/display/hj/43ec9732850870b192d7bad8b0734250/240x180m.jpg?t=1',
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
