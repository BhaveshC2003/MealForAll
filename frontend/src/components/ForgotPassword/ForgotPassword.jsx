import React from 'react'
import './ForgotPassword.css'
import {MdOutlineMailOutline} from 'react-icons/md'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../Reducers/ForgotPasswordReducer/ForgotPasswordMiddleware'
import Loading from '../Loading/Loading'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const {error,loading,success} = useSelector(state=>state.forgotPasswordReducer)
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const alert = useAlert()
    const navigate = useNavigate()

    const handleForgotPasswordSubmit = (e)=>{
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    useEffect(()=>{
        if(success === true){
            alert.success('Reset email sent')
            dispatch({type:'FORGOT_PASSWORD_RESET'})
            navigate('/')
        }
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }

    },[error,alert,dispatch,success])

    return (
    loading ? <Loading /> :
    <form className='ecom__forgot-password' onSubmit={handleForgotPasswordSubmit}>
        <div>
            <h2>
                Reset Password
            </h2>
            <div className='forgot-password-input'>
                <MdOutlineMailOutline className='forgot-password-icon' size={25} />
                <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <button type='submit'>Confirm</button>
        </div>

    </form>
  )
}

export default ForgotPassword