import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Button, Modal, message } from 'antd'
import types from '../../util/actionTypes'
import './IndicatorSummary.css'
import Layout from '../../components/MainPageLayout/MainPageLayout'
import { getAllIndicators, addIndicator } from '../../service/indicatorCURD'

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
    this.handleAdd = this.handleAdd.bind(this)
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

  handleAdd (formData) {
    // todo 判断重复做完善一些
    const { indicatorName, indicatorSQL } = formData
    const { indicatorList } = this.props
    if (
      indicatorList.find(({ indicatorName: indicatorNameInList }) => (indicatorNameInList === indicatorName))
    ) {
      message.error(`存在重名的指标: ${indicatorName}`)
      return
    } else if (
      indicatorList.find(({ indicatorSQL: indicatorSQLInList }) => (indicatorSQLInList === indicatorSQL))
    ) {
      message.error(`存在重名的指标: ${indicatorSQL}`)
      return
    }
    this.props.handleAdd(formData)
  }

  render () {
    const { showAddModal, handleCancleModal, indicatorList, handleShowAddModal } = this.props
    const tableDatasource = indicatorList.filter(({ indicatorName }) => (indicatorName.toLowerCase().includes(this.state.searchedValue.toLowerCase())))
    return (
      <Layout className="indicator_summary">
        <div className="operate-wrap">
          <div className="left">
            <Search className="search" onSearch={this.handleSearch} />
          </div>
          <div className="indicatorAdd">
            <Button
              onClick={handleShowAddModal}
              type="primary"
              icon="plus"
            >
              创建指标
            </Button>
            <Modal
              title="添加指标"
              visible={showAddModal}
              onCancel={handleCancleModal}
              footer={null}
              width="70vw"
              style={{
                minWidth: '1000px',
                maxWidth: '1400px',
              }}
            >
              <IndicatorAddForm
                onSuccess={this.handleAdd}
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
  handleShowAddModal: PropTypes.func.isRequired,
  handleCancleModal: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  showAddModal: PropTypes.bool.isRequired,
  indicatorList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  defaultFormValue: PropTypes.shape({
    indicatorName: PropTypes.string,
    indicatorIntro: PropTypes.string,
    dataSource: PropTypes.string,
    indicatorSQL: PropTypes.string,
  })
}

function mapStateToProps ({ indicatorSummary: { showAddModal, indicatorList } }) {
  return {
    showAddModal,
    indicatorList,
  }
}

function mapDispatchToProps (dispatch) {
  const setState = createAction(types.indicatorSummary_setState)
  const addAction = createAction(types.indicatorSummary_indicatorAdd)
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

    // 新增一条指标
    async handleAdd (formData) {
      try {
        const { data: { data: newItem } } = await addIndicator({
          data: formData
        })
        message.success('添加指标成功')
        dispatch(setState({
          showAddModal: false,
        }))

        dispatch(addAction({
          newItem,
        }))
      } catch (e) {
        console.log('新增指标接口出错', e)
        message.error('新增指失败')
      }
    },
    handleShowAddModal () {
      dispatch(setState({
        showAddModal: true,
      }))
    },
    handleCancleModal () {
      dispatch(setState({
        showAddModal: false,
      }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorSummary)
