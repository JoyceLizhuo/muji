import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Input } from 'antd'

import './Search.css'

function Search ({ className }) {
  return (
    <div className={`${className} search`}>
      <Input.Search
        placeholder="请输入指标的关键字"
        onSearch={value => console.log(value)}
        enterButton
      />
    </div>
  )
}

Search.propTypes = {
  className: PropTypes.string,
}

Search.defaultProps = {
  className: '',
}

const mapStateToProps = (rootState) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
