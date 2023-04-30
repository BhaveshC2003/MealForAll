import React from 'react'
import './PaymentSuccess.css'
import {FcPaid} from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const PaymentSuccess = () => {
  return (
    <div className='ecom__order-success'>
        <FcPaid size={window.innerWidth > 900 ? 60 : 40} />
        <Typography>Your Order Has Been Placed</Typography>
        <Link to='/orders'>View Orders</Link>
    </div>
  )
}

export default PaymentSuccess