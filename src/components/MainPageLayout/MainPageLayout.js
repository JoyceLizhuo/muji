/**
 * 业务页面的layout
 */

import React from 'react'
import NavHeader from '../../components/NavHeader/NavHeader'
import './MainPageLayout.css'
import PropTypes from "prop-types";


function MainPageLayout ({ className, children }) {
  return (
    <div className={`${className} main_page_layout`}>
      <NavHeader className="main_page_layout-header"/>
      <div className="main_page_layout-body">
        {children}
      </div>
    </div>
  )
}

MainPageLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
}

MainPageLayout.defaultPtops = {
  className: '',
}

export default MainPageLayout
