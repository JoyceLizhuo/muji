import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './IndicatorSummary.css'
import Layout from '../../components/MainPageLayout/MainPageLayout'

class IndicatorSummary extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    const $ = window.$
    console.log($('#rootId'))
  }

  render () {
    return (
      <Layout className="indicator_summary">
        <div id="rootId">
          <div className="btn">
            <button className="more">加载更多</button>
          </div>
            <ul className="lists">
                <li className="item">
                    <img src="" alt="" className="itemImg"/>
                    <div className="itemContent">
                      <p className="itemTitle">标题</p>
                      <p className="itemDesc">内容</p>
                      <p className="itemAddress">
                          <label htmlFor="" className="itemAddressName">南十里居</label>
                          <label htmlFor="" className="itemAddressCode">3000</label>
                      </p>
                    </div>
                </li>
            </ul>
            <div className="loadMore">
              <button className="loadMoreBtn">加载更多</button>
            </div>
        </div>
      </Layout>
    )
  }
}

export default connect()(IndicatorSummary)
