import React,{useEffect,useReducer,useState} from 'react'
import './EditOrder.css'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { orderDetails, updateOrder } from '../../../Reducers/orderReducer/orderReducerMiddleware'
import { useParams,useNavigate } from 'react-router-dom'
import { City,Country,State } from 'country-state-city/lib/cjs'
import Loading from '../../Loading/Loading'
import {Item} from '../../Cart/Item/Item'
import { useAlert } from 'react-alert'

const EditOrder = () => {
    const dispatch = useDispatch()
    const {order,loading,error,success,isUpdated} = useSelector(state=>state.order)
    const {id} = useParams()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [address,setAddress] = useState('')
    const [country,setCountry] = useState('')
    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [pinCode,setPinCode] = useState('')
    const [phoneNo,setPhoneNo] = useState('')
    const navigate = useNavigate()
    const alert = useAlert()
    const handleSave = (e)=>{
        e.preventDefault()
        const updatedData = {
            shippingInfo:{
                address,
                country,
                state,
                city,
                pinCode,
                phoneNo
            },
            user:{
                email,
                name
            }
        }
        dispatch(updateOrder(id,updatedData))
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }
        if(success === true){
            setName(order.user.name)
            setEmail(order.user.email)
            setAddress(order.shippingInfo.address)
            setCountry(order.shippingInfo.country)
            setState(order.shippingInfo.state)
            setCity(order.shippingInfo.city)
            setPhoneNo(order.shippingInfo.phoneNo)
            setPinCode(order.shippingInfo.pinCode)
        }
        if(isUpdated === true){
            alert.success("Order Updated Successfully")
            navigate('/admin/dashboard')
            dispatch({type:'UPDATE_ORDER_RESET'})
        }
    },[dispatch,error,id,success,isUpdated,alert])

    useEffect(()=>{
        dispatch(orderDetails(id))
    },[dispatch,id])

  return (
    <>
        {
            loading === true ? <Loading />:
            <form className='ecom__edit-order' onSubmit={handleSave}>
                <Typography>Edit Order</Typography> 
                 <div className='edit-order-details'>
                     <div>
                         <Typography>Name:</Typography>
                         <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                     </div>
                     <div>
                         <Typography>Email:</Typography>
                         <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                     </div>
                     <div>
                         <Typography>Address:</Typography>
                         <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
                     </div>
                     <div>
                         <Typography>Country:</Typography>
                         <select name="country" id="country" value={country} onChange={(e)=>setCountry(e.target.value)}>
                             {
                                 Country && Country.getAllCountries().map(c=><option key={c.isoCode} value={c.isoCode}>{c.name}</option>)
                             }
                         </select>
                     </div>
                     <div>
                         <Typography>State:</Typography>
                         <select name='state' id='state' value={state} onChange={(e)=>setState(e.target.value)}>
                             {
                                State && State.getStatesOfCountry(country).map(s=><option key={s.isoCode} value={s.isoCode}>{s.name}</option>)
                             }
                         </select>
                     </div>
                     <div>
                         <Typography>City:</Typography>
                         <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} />
                     </div>
                     <div>
                         <Typography>Pin Code:</Typography>
                         <input type="number" value={pinCode} onChange={(e)=>setPinCode(e.target.value)} />
                     </div>
                     <div>
                         <Typography>Phone Number:</Typography>
                         <input type="number" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
                     </div>
                 </div>
                 <div className='edit-order-payment'>
                     {
                        success && 
                        <>
                         <Typography>Payment Info:</Typography>
                             <div>
                                 <p>Payment Id:<b>{order.paymentInfo.id}</b></p>
                                 <p>Payment Status:<b className={order.paymentInfo.status==='succeeded' ? 'greenColor' : 'redColor'}>{order.paymentInfo.status}</b></p>
                             </div>
                        </>
                     }
                             
                </div>
                <div className='edit-order-container'>
                    <Typography>ITEMS:</Typography>
                    <div>
                        {
                             success && order.orderItems.map((item,i)=><Item key={i} item={item} showRemove={false} />)
                         }
                    </div>  
                    <button type='submit'>SAVE</button>     
                </div>

         
             </form>     
        }
    
    </>
  )
}

export default EditOrder