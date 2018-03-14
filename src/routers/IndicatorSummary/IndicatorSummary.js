import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './IndicatorSummary.css'
import Layout from '../../components/MainPageLayout/MainPageLayout'
import getAllIndicators from '../../service/getAllIndicators'

import Search from './components/Search'
import IndicatorAdd from './components/IndicatorAdd'
import IndicatorTable from './components/IndicatorTable'

class IndicatorSummary extends PureComponent {
  componentDidMount () {
    // 获取所有的指标
    this.props.getIndicatorList()
  }

  render () {
    return (
      <Layout className="indicator_summary">
        <div className="operate-wrap">
          <div className="left">
            <Search className="search" />
          </div>
          <IndicatorAdd />
        </div>
        <div className="table-wrap">
          <IndicatorTable />
        </div>
      </Layout>
    )
  }
}

IndicatorSummary.propTypes = {
  getIndicatorList: PropTypes.func.isRequired,
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    async getIndicatorList () {
      try {
        dispatch({
          type   : 'setState',
          payload: {
            loading: true,
          },
        })
        const { data: { data: indicatorList } } = await getAllIndicators()
        dispatch({
          type   : 'setState',
          payload: {
            indicatorList,
            loading: false,
          },
        })
      } catch (e) {
        dispatch({
          type   : 'setState',
          payload: {
            loading: false,
          },
        })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorSummary)
