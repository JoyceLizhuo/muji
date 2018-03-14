import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Home extends PureComponent {
  render () {
    return (
      <div>
        not find
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    foo: 'foo'
  }
}

export default connect(mapStateToProps)(Home)
