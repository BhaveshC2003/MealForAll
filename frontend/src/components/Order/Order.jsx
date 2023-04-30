import React, { useEffect } from 'react'
import './Order.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { orderDetails } from '../../Reducers/orderReducer/orderReducerMiddleware'
import Loading from '../Loading/Loading'
import { Typography } from '@mui/material'
import { Item } from '../Cart/Item/Item'

const Order = () => {
    const dispatch = useDispatch()
    const {loading,error,order} = useSelector(state=>state.order)
    const {user} = useSelector(state=>state.loginReducer)
    const alert = useAlert()
    const {id} = useParams()

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch({type:'CLEAR_ERRORS'})
      }
      dispatch(orderDetails(id))

    },[dispatch,error,alert])

  return (
      loading===true ? <Loading /> :
      <div className='ecom__order'>
        {
          order.shippingInfo && 
          <div className='ecom__order-details-container'>
          <Typography>Order Details</Typography>
          <div className='order-details-shipping-details'>
            <p>NAME:</p>
            <span>{user.name}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>ADDRESS:</p>
            <span>{order.shippingInfo.address}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>CITY:</p>
            <span>{order.shippingInfo.city}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>STATE:</p>
            <span>{order.shippingInfo.state}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>COUNTRY:</p>
            <span>{order.shippingInfo.country}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>Pin Code:</p>
            <span>{order.shippingInfo.pinCode}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>Phone Number:</p>
            <span>{order.shippingInfo.phoneNo}</span>
          </div>
          <div className='order-details-shipping-details'>
            <p>Order Status:</p>
            <span>{order.orderStatus}</span>
          </div>
      </div>
        }

       {
         order.orderItems && 
         <div className='order-items'>
         {
           order.orderItems.map(item=><Item item={item} showRemove={false}/>)
         }
        </div>
       }

      </div>
  )
}

export default Order