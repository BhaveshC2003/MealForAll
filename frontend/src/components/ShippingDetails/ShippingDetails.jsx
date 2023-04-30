import React from 'react'
import './ShippingDetails.css'
import {FaAddressBook,FaCity,FaGlobeAsia} from 'react-icons/fa'
import {MdLocationOn,MdTransferWithinAStation} from 'react-icons/md'
import {BsTelephoneFill} from 'react-icons/bs'
import {Country,State,City} from 'country-state-city'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Steps from '../layout/Steps/Steps'
import { useNavigate } from 'react-router-dom'
import { saveShippingDetails } from '../../Reducers/CartReducer/CartReducerMiddleware'

const ShippingDetails = () => {
    const dispatch = useDispatch()
    const {shippingDetails} = useSelector(state=>state.cart)
    const [country,setCountry] = useState(shippingDetails.country)
    const [state,setState] = useState(shippingDetails.state)
    const [address,setAddress] = useState(shippingDetails.address)
    const [city,setCity] = useState(shippingDetails.city)
    const [pinCode,setPinCode] = useState(shippingDetails.pinCode)
    const [phoneNo,setPhoneNo] = useState(shippingDetails.phoneNo)
    const alert = useAlert()
    const navigate = useNavigate()

    const handleContinue = (e)=>{
        e.preventDefault()
        if(phoneNo.length < 10 || phoneNo.length > 10){
            alert.error('Invaild Phone Number')
            return
        }
        dispatch(saveShippingDetails({country,state,address,city,pinCode,phoneNo}))
        navigate('/order/confirm')
        
    }


  return (
    <>
    <Steps activeStep={0} />
    <div className='ecom__shipping'>
        <h2>Shipping Details</h2>
        <form className='shipping-container' onSubmit={handleContinue} >
            <div>
                <FaAddressBook size={window.innerWidth > 900 ? 30 : 20 } className='shipping-icons' />
                <input placeholder='Address' value={address} type="text" onChange={(e)=>setAddress(e.target.value)} />
            </div>
            <div>
                <FaCity size={window.innerWidth > 900 ? 30 : 20 } className='shipping-icons' />
                <input placeholder='City' value={city} type="text" onChange={(e)=>setCity(e.target.value)} />
            </div>
            <div>
                <MdLocationOn size={window.innerWidth > 900 ? 30 : 20 } className='shipping-icons' />
                <input placeholder='PinCode' value={pinCode} type="number" onChange={(e)=>setPinCode(e.target.value)} />
            </div>
            <div>
                <BsTelephoneFill size={window.innerWidth > 900 ? 30 : 20 } className='shipping-icons' />
                <input placeholder='Phone Number' value={phoneNo} type="number" onChange={(e)=>setPhoneNo(e.target.value)} />
            </div>
            <div>
                <FaGlobeAsia size={window.innerWidth > 900 ? 30 : 20 } className='shipping-icons' />
                <select placeholder='Country' value={country} onChange={(e)=>setCountry(e.target.value)}>
                    {
                        Country && Country.getAllCountries().map(c=><option key={c.isoCode} value={c.isoCode} >{c.name}</option>)
                    }
                </select>
            </div>
            <div>
                <MdTransferWithinAStation size={window.innerWidth > 900 ? 30 : 20 } className='shipping-icons' />
                <select placeholder='State' value={state} onChange={(e)=>setState(e.target.value)}>
                    {
                        State && State.getStatesOfCountry(country).map(s=><option key={s.isoCode} value={s.isoCode} >{s.name}</option>)
                    }
                </select>
            </div>
            <button type='submit' disabled={state ? false : true} >Continue</button>
        </form>
    </div>
    </>                
  )
}

export default ShippingDetails