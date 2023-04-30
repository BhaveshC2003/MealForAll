import React, { useRef } from 'react'
import './Payment.css'
import Steps from '../layout/Steps/Steps'
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from '@stripe/react-stripe-js'
import {GoCreditCard} from 'react-icons/go'
import {BsCalendar2Event} from 'react-icons/bs'
import {MdVpnKey} from 'react-icons/md'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { newOrder } from '../../Reducers/orderReducer/orderReducerMiddleware'
import { useEffect } from 'react'

const Payment = () => {
    const {shippingDetails,cartItems} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.loginReducer)
    const dispatch = useDispatch()
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const stripe = useStripe()
    const elements = useElements()
    const paymentEl = useRef(null)
    const alert = useAlert()
    const paymentData = {amount: Math.round(orderInfo.total)*100}
    const navigate = useNavigate()
    const {error} = useSelector(state=>state.newOrder)

    const orderData = {
        shippingInfo: shippingDetails,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.total,
        user: user._id
    }

    const handlePayment = async(e)=>{
        e.preventDefault()
        paymentEl.current.disabled = true
        try{
            const config = {headers:{"Content-Type":"application/json"}}
            const {data} = await axios.post('/api/v1/payment/process',paymentData,config)
        
            if(!stripe || !elements)
            return
            const result = await stripe.confirmCardPayment(data.client_secret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address:{
                            line1: shippingDetails.address,
                            city: shippingDetails.city,
                            state: shippingDetails.state,
                            postal_code: shippingDetails.pinCode,
                            country: shippingDetails.country
                        }
                }
            }
        })
        if(result.error){
            paymentEl.current.disabled = false
            alert.error(result.error.message)
        }else if(result.paymentIntent.status === "succeeded"){
            orderData.paymentInfo = {
                id:result.paymentIntent.id,
                status: result.paymentIntent.status
            }
            dispatch(newOrder(orderData))
            navigate('/success')
        }else{
            alert.error("There seem's to be some issue while proccessing the payment.")
        }

        }catch(error){
            paymentEl.current.disabled = false
            alert.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
        }

    },[dispatch,error])

  return (
    <>
        <Steps activeStep={2} />
        <div className='ecom__payment'>
            <Typography>Credit Card Details</Typography>
            <form onSubmit={handlePayment}>
                <div>
                    <Typography>Credit Card Number</Typography>
                    <GoCreditCard size={window.innerWidth > 900? 25 : 20} className='payment-icon' />
                    <CardNumberElement className='payment-input' />
                </div>
                <div>
                <Typography>Credit Card Expiry Date</Typography>
                    <BsCalendar2Event size={window.innerWidth > 900? 25 : 20} className='payment-icon' />
                    <CardExpiryElement className='payment-input' />
                </div>
                <div>
                    <Typography>CCV</Typography>
                    <MdVpnKey size={window.innerWidth > 900? 25 : 20} className='payment-icon' />
                    <CardCvcElement className='payment-input' />
                </div>
                <button ref={paymentEl} type="submit">{`Pay $${orderInfo.total}`}</button>
            </form>
        </div>
    
    </>
  )
}

export default Payment