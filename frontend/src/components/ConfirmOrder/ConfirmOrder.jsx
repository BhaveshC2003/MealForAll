import React from 'react'
import './ConfirmOrder.css'
import { useSelector } from 'react-redux'
import { Item } from '../Cart/Item/Item'
import Steps from '../layout/Steps/Steps'
import { Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const {cartItems,shippingDetails} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.loginReducer)
    const navigate = useNavigate()

    const subtotal = cartItems.reduce((total,item)=>total+item.quantity*item.price,0)
    const shippingCharges = subtotal > 1000 ? 300 : 0
    const tax = subtotal*0.20
    const address = shippingDetails.address + " "+ shippingDetails.city +" " + shippingDetails.state + " " + shippingDetails.country
    const total = subtotal + shippingCharges + tax

    const handleProceed = ()=>{
        const data = {
            subtotal,
            shippingCharges,
            tax,
            total
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data))
        navigate('/payment/process')
    }

  return (
    <>
        <Steps activeStep={1} />   
        <div className='ecom__confirm-order'>
            <div className='confirm-order-details'>
                <div className='confirm-order-left'>
                    <Typography className='confirm-order-typo'>Shipping Details</Typography>
                    <div>
                        <p>Name:</p>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <p>Address:</p>
                        <span>{address}</span>
                    </div>
                    <div>
                        <p>Phone Number:</p>
                        <span>{shippingDetails.phoneNo}</span>
                    </div>
                </div>
                <div className='confirm-order-right'>
                    <Typography className='confirm-order-typo'>Order Summary</Typography>
                    <div>
                        <p> Subtotal:</p>
                        <span>{subtotal}</span>  
                    </div>
                    <div>
                        <p>Shipping Charges:</p>
                        <span>{shippingCharges}</span>
                    </div>
                    <div>
                        <p>Tax:</p>
                        <span>{tax}</span>
                    </div>
                    <b>Total:${total}</b>
                </div>
            </div>
            <div className='confirm-order-items'>
                <Typography className='confirm-order-typo'>ORDER</Typography>
                {
                    cartItems.map((item,i)=>
                        <Item item={item} />
                    )
                }
            </div>
            <button onClick={handleProceed}>Proceed To Payment</button>
        </div>
    </>
  )
}

export default ConfirmOrder