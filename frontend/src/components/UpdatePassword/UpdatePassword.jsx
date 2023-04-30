import React from 'react'
import './UpdatePassword.css'
import {BiLockOpen,BiLock} from 'react-icons/bi'
import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Loading from '../Loading/Loading'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { updatePassword } from '../../Reducers/profileReducer/profileMiddleware'

const UpdatePassword = () => {
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const {loading,error,isUpdated} = useSelector(state=>state.profileReducer)
    const alert = useAlert()
    const navigate = useNavigate()

    const handlePasswordSubmit = (e)=>{
        e.preventDefault()
        const passwords = new FormData()
        passwords.set("oldPassword",oldPassword)
        passwords.set("newPassword",newPassword)
        passwords.set("confirmPassword",confirmPassword)
        dispatch(updatePassword(passwords))
        
    }

    useEffect(()=>{
        if(isUpdated){
            alert.success('Password Updated')
            dispatch({type:'UPDATE_PASSWORD_RESET'})
            navigate('/account')
        }
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }

    },[alert,error,dispatch,isUpdated,navigate])

  return (
    loading ? <Loading /> :
    <form onSubmit={handlePasswordSubmit} className='ecom__update-password'>
        <h3>Change Password</h3>
        <div>
            <BiLockOpen size={23} className='update-password-icons' />
            <input value={oldPassword} placeholder='Enter Old Password' type="password" onChange={(e)=>setOldPassword(e.target.value)} />
        </div>
        <div>
            <BiLock size={23} className='update-password-icons' />
            <input value={newPassword} placeholder='Enter New Password' type="password" onChange={(e)=>setNewPassword(e.target.value)} />
        </div>
        <div>
            <BiLock size={23} className='update-password-icons' />
            <input value={confirmPassword} placeholder='Enter Confirm Password' type="password" onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Update</button>
    </form>
  )
}

export default UpdatePassword