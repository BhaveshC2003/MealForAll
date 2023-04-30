import React from 'react'
import './DashboardMenu.css'
import {TreeView,TreeItem} from '@material-ui/lab'
import {MdExpandLess,MdExpandMore,MdPostAdd,MdDashboard,MdListAlt,MdOutlineRateReview} from 'react-icons/md'
import {BiAddToQueue} from 'react-icons/bi'
import {FaUserFriends} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {default as logo} from '../../../../images/logo.png'

const DashboardMenu = () => {
  return (
    <div className='dashboard-menu'>
        <Link className='dashboard-menu-links' to='/'>
            <img src={logo} alt="Logo" />
        </Link>
        <Link className='dashboard-menu-links' to='/admin/dashboard'>
            <MdDashboard />
            <p>Dashboard</p>
        </Link>

        <div className='dashboard-menu-tree'>
        <TreeView defaultCollapseIcon={<MdExpandLess />} defaultExpandIcon={<MdExpandMore />} >
           <TreeItem  nodeId='1' label='Products'>
                <Link to='/admin/products'>
                    <TreeItem nodeId='2' label='All' icon={<MdPostAdd />} />
                </Link>
                <Link to='/admin/product'>
                    <TreeItem nodeId='3' label='Create' icon={<BiAddToQueue />} />
                </Link>   
            </TreeItem>   
        </TreeView>
        </div>
        
        <Link className='dashboard-menu-links' to='/admin/orders'>
            <MdListAlt />
            <p>Orders</p>
        </Link>
        <Link className='dashboard-menu-links' to='/admin/users'>
            <FaUserFriends />
            <p>Users</p>
        </Link>
        <Link className='dashboard-menu-links' to='/admin/reviews'>
            <MdOutlineRateReview />
            <p>Reviews</p>
        </Link>

    </div>
  )
}

export default DashboardMenu