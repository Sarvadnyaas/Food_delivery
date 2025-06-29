import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/Add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/List' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p> List Item</p>
        </NavLink>
        <NavLink to='/Orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders Item</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar