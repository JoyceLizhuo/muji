import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './BizSelect.css'

function BizSelect ({ className }) {
  return (
    <div className={`${className} bizSelect`}>
      BizSelect
    </div>
  )
}

BizSelect.propTypes = {
  className: PropTypes.string,
}

BizSelect.defaultProps = {
  className: '',
}

const mapStateToProps = (rootState) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BizSelect))
