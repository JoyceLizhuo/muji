import React, { PureComponent } from 'react'
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

function mapStateToProps () {
  return {
    foo: 'foo'
  }
}

export default connect(mapStateToProps)(Home)
