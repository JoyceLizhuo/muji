import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './IndicatorSummary.css'
import Layout from '../../components/MainPageLayout/MainPageLayout'
import api from '../../api/config'

class IndicatorSummary extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
  }

  render () {
    return (
      <Layout className="indicator_summary">
        <div>

        </div>
      </Layout>
    )
  }
}

export default connect()(IndicatorSummary)
