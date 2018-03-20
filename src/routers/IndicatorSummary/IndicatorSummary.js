import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Button, Modal } from 'antd'
import types from '../../util/actionTypes'
import './IndicatorSummary.css'
import Layout from '../../components/MainPageLayout/MainPageLayout'
import { getAllIndicators } from '../../service/IndicatorOperate'

import Search from './components/Search'
import IndicatorTable from './components/IndicatorTable'
import IndicatorAddForm from './components/IndicatorAddForm'

class IndicatorSummary extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchedValue: '',
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount () {
    // 获取所有的指标
    this.props.getIndicatorList()
  }

  handleSearch (searchedValue) {
    this.setState({
      searchedValue,
    })
  }

  render () {
    const { showModal, handleShowModal, handleCancleModal, indicatorList } = this.props
    const tableDatasource = indicatorList.filter(({ indicatorName }) => (indicatorName.toLowerCase().includes(this.state.searchedValue.toLowerCase())))
    return (
      <Layout className="indicator_summary">
        <div className="operate-wrap">
          <div className="left">
            <Search className="search" onSearch={this.handleSearch} />
          </div>
          <div className="indicatorAdd">
            <Button
              onClick={handleShowModal}
              type="primary"
              icon="plus"
            >
              创建指标
            </Button>
            <Modal
              title="添加指标"
              visible={showModal}
              onCancel={handleCancleModal}
              footer={null}
              width="70vw"
              style={{
                minWidth: '1000px',
                maxWidth: '1400px',
              }}
            >
              <IndicatorAddForm
                defaultValue={ {
                  indicatorName: 'KP_xxx',
                  indicatorIntro: '说明',
                  dataSource: 'Hive',
                  indicatorSQL: 'asdfasdf',
                  underBiz: '',
                } }
                onSuccess={(value) => { console.log('onSuccess: ', value) }}
              />
            </Modal>
          </div>
        </div>
        <div className="table-wrap">
          <IndicatorTable datasource={tableDatasource} />
        </div>
      </Layout>
    )
  }
}

IndicatorSummary.propTypes = {
  getIndicatorList: PropTypes.func.isRequired,
  handleShowModal: PropTypes.func.isRequired,
  handleCancleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  indicatorList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps ({ indicatorSummary: { showModal, indicatorList } }) {
  return {
    showModal,
    indicatorList,
  }
}

function mapDispatchToProps (dispatch) {
  const setState = createAction(types.indicatorSummary_setState)
  return {
    async getIndicatorList () {
      try {
        dispatch(setState({
          loading: true,
        }))
        const { data: { data: indicatorList } } = await getAllIndicators() // 获取指标列表
        dispatch(setState({
          indicatorList,
          loading: false,
        }))
      } catch (e) {
        dispatch(setState({
          loading: false,
        }))
      }
    },
    handleShowModal () {
      dispatch(setState({
        showModal: true,
      }))
    },
    handleCancleModal () {
      dispatch(setState({
        showModal: false,
      }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorSummary)
