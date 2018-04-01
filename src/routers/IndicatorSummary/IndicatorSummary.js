import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './IndicatorSummary.css'
import Layout from '../../components/MainPageLayout/MainPageLayout'
import api from '../../api/config'

class IndicatorSummary extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    const $ = window.$
    const getList = () => {
      $.ajax({
          url: api.curdIndicator,
          success ({data}) {
              if (data && data.length > 0){
                  data.map(item => {
                      $("#lists").append("<li class=\"item\">\n" +
                          "                    <img src=\"" + item.img + "\" alt=\"\" class=\"itemImg\"/>\n" +
                          "                    <div class=\"itemContent\">\n" +
                          "                      <p class=\"itemTitle\">" + item.title + "</p>\n" +
                          "                      <p class=\"itemDesc\">" + item.desc + "</p>\n" +
                          "                      <p class=\"itemAddress\">\n" +
                          "                          <label class=\"itemAddressName\">" + item.address+ "</label>\n" +
                          "                          <label class=\"itemAddressCode\">" + item.price+ "元</label>\n" +
                          "                      </p>\n" +
                          "                    </div>\n" +
                          "                </li>")
                  })
              } else {
                  $("#loadMore").innerHTML('没有更多了')
              }
          }
      })
    }
    $(".moreBtn").click(function () {
      getList()
    })
    getList()
  }
  render () {
    return (
      <Layout className="indicator_summary">
        <div id="rootId">
          <div className="btn">
            <button className="more moreBtn" >加载更多</button>
          </div>
            <ul className="lists" id="lists">
                {/*<li className="item">*/}
                    {/*<img src="" alt="" className="itemImg"/>*/}
                    {/*<div className="itemContent">*/}
                      {/*<p className="itemTitle">标题</p>*/}
                      {/*<p className="itemDesc">内容</p>*/}
                      {/*<p className="itemAddress">*/}
                          {/*<label htmlFor="" className="itemAddressName">南十里居</label>*/}
                          {/*<label htmlFor="" className="itemAddressCode">3000</label>*/}
                      {/*</p>*/}
                    {/*</div>*/}
                {/*</li>*/}
            </ul>
            <div id="loadMore" className="moreBtn loadMore">
              加载更多
            </div>
        </div>
      </Layout>
    )
  }
}

export default connect()(IndicatorSummary)
