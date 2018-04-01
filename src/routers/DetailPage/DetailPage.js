import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Spin, Table } from 'antd'
import './DetailPage.css'
import types from '../../util/actionTypes'
import getIndicatorDetailData from '../../service/indicatorCURD'
import ChartDetail from './components/ChartDetail'
import config from '../../util/config'
import Layout from '../../components/MainPageLayout/MainPageLayout'

class DetailPage extends PureComponent {
  componentDidMount () {
    const { match: {
        params: {
          detailId,
        },
      },
      handleGetIndicatorDetailData,
    } = this.props
    handleGetIndicatorDetailData(detailId)
  }

  componentWillUnmount () {
    this.props.handleClearIndicatorDetailData()
  }

  render () {
    const {
      loading,
      detailData: {
        indicatorData, // --holder数据
        base, // 此条--holder的基本信息
      },
    } = this.props
    let chartResult = null
    if (indicatorData) {
      if (Array.isArray(indicatorData.xAxis)) { // 有横坐标就画图
        chartResult = <ChartDetail className="chart_result" data={indicatorData} />
      } else if (typeof indicatorData.value === 'string') { // 有value就是单值情况
        chartResult = (
          <div className="chart_result chart_result-value">
            <p className="label">{indicatorData.label}</p>
            <p className="value">{indicatorData.value}</p>
          </div>
        )
      }
    }
    let baseInfo = null
    if (base) {
      baseInfo = (
        <Table
          className="base-info alignCenter"
          bordered
          rowKey="indicatorId"
          dataSource={[base]}
          columns={config.indicatorTableColumns}
          pagination={false}
        />
      )
    }
    return (
      <Layout className="detail-page">
        <Spin spinning={loading}>
          <div className="detail-page-base-wrap">
            {baseInfo}
          </div>
          <div className="detail-page-result-wrap">
            {chartResult}
          </div>
        </Spin>
      </Layout>
    )
  }
}

DetailPage.propTypes = {
  handleGetIndicatorDetailData: PropTypes.func.isRequired,
  handleClearIndicatorDetailData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  detailData: PropTypes.shape({
    // --holder的基本信息
    base: PropTypes.shape({}),

    // --holder数据
    indicatorData: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({}),
    ]),
  }).isRequired,
}

function mapStateToProps ({ indicatorDetail: { loading, detailData } }) {
  return {
    loading,
    detailData,
  }
}

function mapDispatchToProps (dispatch) {
  const setState = createAction(types.indicatorDetail_setState)
  return {
    async handleGetIndicatorDetailData (indicatorId) {
      try {
        dispatch(setState({
          loading: true,
        }))
        const { data: { data: detailData } } = await getIndicatorDetailData(indicatorId)
        dispatch(setState({
          loading: false,
          detailData,
        }))
      } catch (e) {
        dispatch(setState({
          loading: false,
        }))
        console.log('获取详情信息失败：', indicatorId, e)
      }
    },

    // 清空详情页信息
    handleClearIndicatorDetailData () {
      dispatch(setState({
        loading: false,
        detailData: {
          indicatorData: null, // --holder数据
          base: null, // 此条--holder的基本信息
        },
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
