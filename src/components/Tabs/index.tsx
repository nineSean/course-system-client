import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons'
import './index.less'

const Tabs = () => {
  return (
    <footer>
      <NavLink exact to='/'>
        <HomeOutlined/>
        <span>首页</span>
      </NavLink>
      <NavLink to='/mine'>
        <ShoppingCartOutlined/>
        <span>课程</span>
      </NavLink>
      <NavLink to='/profile'>
        <UserOutlined/>
        <span>我的</span>
      </NavLink>
    </footer>
  )
}

export default withRouter(Tabs)
