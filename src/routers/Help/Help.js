import React, { PureComponent } from 'react'
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

function mapStateToProps () {
  return {
    foo: 'foo'
  }
}

export default connect(mapStateToProps)(Help)
