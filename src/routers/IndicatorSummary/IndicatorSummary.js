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
  componentDidMount () {
    // 获取所有的指标
    this.props.getIndicatorList()
  }

  render () {
    const { showModal, handleShowModal } = this.props
    return (
      <Layout className="indicator_summary">
        <div className="operate-wrap">
          <div className="left">
            <Search className="search" />
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
          <IndicatorTable />
        </div>
      </Layout>
    )
  }
}

IndicatorSummary.propTypes = {
  getIndicatorList: PropTypes.func.isRequired,
  handleShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

function mapStateToProps ({ indicatorSummary: { showModal } }) {
  return {
    showModal,
  }
}

function mapDispatchToProps (dispatch) {
  const setState = createAction(types.setState)
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorSummary)
