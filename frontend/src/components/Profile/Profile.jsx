import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useEffect } from 'react'
import {BiMap} from "react-icons/bi"

const Profile = () => {
    const {loading,user,isAuthenticated} = useSelector(state=>state.loginReducer)
    const navigate = useNavigate()
    useEffect(()=>{
        if(isAuthenticated === false)
        navigate('/login')
    },[isAuthenticated])


  return (
    loading ? <Loading /> : 
    <div className='ecom__profile'>
    <div className='profile-left-container'>
        <div className='profile-image'>
            <img src={user.avatar.url} alt="profile" />
        </div>
        <div>
            <Link to='/me/update'><button className='profile-edit-btn'>Edit Profile</button></Link>
        </div>
    </div>
    <div className='profile-right-container'>
        <div className='profile-details'>
            <div>
                <h4>Name:</h4>
                <p>{user.name}</p>
            </div>
            <div>
                <h4>Email:</h4>
                <p>{user.email}</p>
            </div>
            <div>
                <h4>Joined At:</h4>
                <p>{user.createdAt.slice(0,10)}</p>
            </div>
            <div>
                <BiMap cursor={"pointer"} size={40} onClick={()=>window.open(`https://maps.google.com/maps?q=${user.latitude} ,${user.longitude}`,"_blank")}/>
            </div>
        </div>
        <div className='right-btn'>
            <Link to='/password/update'><button>Change Password</button></Link>
            <Link to='/orders'><button>Orders</button></Link>
        </div>
    </div>
</div>
  )
}

export default Profile