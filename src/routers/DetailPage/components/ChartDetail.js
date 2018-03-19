/**
 * 以图形形式绘制的指标详情
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import './ChartDetail.css'
import dateFormat from '../../../util/methods/dateFormat'

class ChartDetail extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
    this.echartNode = null
    this.echart = null // echart实例
    this.drawEchart = this.drawEchart.bind(this)
  }

  componentDidMount () {
    this.echart = echarts.init(this.echartNode)
    this.drawEchart()
  }

  componentWillReceiveProps ({ data }) {
    this.setState({
      data,
    }, () => {
      this.drawEchart()
    })
  }

  // 绘制echart
  drawEchart () {
    const { data } = this.state
    const {
      xAxis,
      yAxis: {
        unit,
      },
      seriesData,
    } = data
    this.echart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      xAxis: { // x坐标，将时间戳转换为日期的格式
        data: xAxis.map((ts) => dateFormat(ts)),
      },
      yAxis: [{
        type : 'value',
        axisLabel : {
          formatter: `{value} ${unit}`,
        }
      }],
      series: [{
        type: 'line',
        data: seriesData,
      }]
    })
  }

  componentWillUnmount () {
    this.echart.dispose()
  }

  render () {
    const { className } = this.props
    return (
      <div
        className={`${className} chart_detail-comp`}
        ref={(node) => { this.echartNode = node }}
      >
        charts
      </div>
    )
  }
}

ChartDetail.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({}).isRequired,
}

ChartDetail.defaultProps = {
  className: '',
}

export default ChartDetail
