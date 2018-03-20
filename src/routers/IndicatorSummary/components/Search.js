import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Input, AutoComplete, Button, Icon } from 'antd'
import './Search.css'

const { Option } = AutoComplete

class Search extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      inputedValue: '',
    }
    this.getOption = this.getOption.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleInput (value) {
    this.setState({
      inputedValue: value,
    }, () => {
      this.handleSearch()
    })
  }

  handleSelect (value) {
    this.setState({
      inputedValue: this.props.indicatorList.filter(({indicatorId}) => (indicatorId === value))[0].indicatorName
    }, () => {
      this.handleSearch()
    })
  }

  handleSearch () {
    this.props.onSearch(this.state.inputedValue)
  }

  getOption () {
    const { indicatorList } = this.props
    const { inputedValue } = this.state
    return indicatorList.filter(({ indicatorName }) => (indicatorName.toLowerCase().includes(inputedValue.toLowerCase()))).map(({
      indicatorId,
      indicatorName,
    }) => {
      return (
        <Option key={indicatorId} text={indicatorName}>
          {indicatorName}
        </Option>
      )
    })
  }

  render () {
    const { className } = this.props
    return (
      <div className={`${className} search`}>
        <AutoComplete
          style={{ width: '300px' }}
          dataSource={this.getOption()}
          onSelect={this.handleSelect}
          onSearch={this.handleInput}
          placeholder="请输入指标关键字"
        >
          <Input
            onPressEnter={this.handleSearch}
            suffix={(
              <Button type="primary" onClick={this.handleSearch}>
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    )
  }
}

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  indicatorList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

Search.defaultProps = {
  className: '',
}

const mapStateToProps = ({ indicatorSummary: { indicatorList } }) => {
  return {
    indicatorList,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
