import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Help extends PureComponent {
  render () {
    return (
      <div>
        帮助文档正在完善中...
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    foo: 'foo'
  }
}

export default connect(mapStateToProps)(Help)
