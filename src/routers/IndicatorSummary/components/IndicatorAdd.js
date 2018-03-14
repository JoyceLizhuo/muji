import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import './IndicatorAdd.css'

function IndicatorAdd ({ className }) {
  return (
    <div className={`${className} indicatorAdd`}>
      <Button
        type="primary"
        icon="plus"
      >
        创建指标
      </Button>
    </div>
  )
}

IndicatorAdd.propTypes = {
  className: PropTypes.string,
}

IndicatorAdd.defaultProps = {
  className: '',
}

const mapStateToProps = (rootState) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndicatorAdd))
