import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateUser } from '../../Reducers/profileReducer/profileMiddleware'
import './UpdateProfile.css'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { loadUser } from '../../Reducers/userReducer/userMiddleware'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.loginReducer)
    const {loading,isUpdated,error} = useSelector(state=>state.profileReducer)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState("")
    const alert = useAlert()
    const navigate = useNavigate()

    const handleConfirmEditSubmit = (e)=>{
        e.preventDefault()
        const updatedData = new FormData()
        updatedData.set("name",name)
        updatedData.set("email",email)
        updatedData.set("avatar",avatar)
        dispatch(updateUser(updatedData))
    }

    const loadAvatar = (e)=>{
        const reader = new FileReader()
        reader.onload = ()=>{
            if(reader.readyState === 2){
                setAvatar(reader.result)
            }

        }
        reader.readAsDataURL(e.target.files[0])
    }


    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
        }
        if(isUpdated){
            alert.success('SUCCESSFULLY UPDATED THE DETAILS')
            dispatch({type:'UPDATE_PROFILE_RESET'})
            dispatch(loadUser)
            navigate('/account')
        }
        if(error){
            alert.error(error)
        }

    },[dispatch,error,alert,navigate,isUpdated])

  return (
    loading ? <Loading /> :
    <form className='ecom__profile' encType="multipart/form-data" onSubmit={handleConfirmEditSubmit}>
    <div className='profile-left-container'>
        <div className='profile-image'>
            <img src={user.avatar.url} alt="profile" />
        </div>
        <div>
            <input type="file" accept="image/*" className='profile-edit-image' onChange={loadAvatar}/>
        </div>
    </div>
    <div className='profile-right-container'>
        <div className='profile-details'>
            <div>
                <h4>Name:</h4>
                <input value={name} className='update-profile-input' type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <h4>Email:</h4>
                <input value={email} className='update-profile-input' type="email" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <h4>Joined At:</h4>
                <p>{user.createdAt.slice(0,10)}</p>
            </div>
        </div>
        <div className='update-profile-right-btn'>
            <button type='submit'>Confirm Edit</button>
        </div>
    </div>
</form>

    
  )
}

export default UpdateProfile