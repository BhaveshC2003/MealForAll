import React, { useReducer,useState,useEffect } from 'react'
import './Login.css'
import {FiMail} from 'react-icons/fi'
import {RiLockPasswordLine} from 'react-icons/ri'
import {MdOutlineFace} from 'react-icons/md'
import { useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import {loginUser, registerUser} from '../../Reducers/userReducer/userMiddleware'
import { useAlert } from 'react-alert'
import { useNavigate,Link,useLocation } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const {loading,error,isAuthenticated} = useSelector((state)=>state.loginReducer)
    const alert = useAlert()
    const navigate = useNavigate()
    const [role,setRole] = useState("user")
    const reducer = (state,{type,payload})=>{
        switch(type){
            case 'EMAIL':
                return{...state,email:payload}
            case 'PASSWORD':
                return{...state,password:payload}
            case 'NAME':
                return{...state,name:payload}
            case 'LATITUDE':
                return{...state,latitude:payload}
            case 'LONGITUDE':
                return{...state,longitude:payload}

            default: return state
        }
            
    }

    const [user,userDispatch] = useReducer(reducer,{name:"",email:"",password:""})
    let {name,email,password,longitude,latitude} = user
    const[avatar,setAvatar] = useState(null)
    const getLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            userDispatch({type:"LATITUDE",payload:position.coords.latitude})
            userDispatch({type:"LONGITUDE",payload:position.coords.longitude})
        })
    }

    const handleLoginSubmit = (e)=>{
        e.preventDefault()
        dispatch(loginUser({email,password,longitude,latitude}))
        
    }

    const handleRegisterSubmit = (e)=>{
        e.preventDefault();
        const userData = new FormData()
        userData.set("name",name)
        userData.set("email",email)
        userData.set("password",password)
        userData.set("avatar",avatar)
        userData.set("latitude",latitude)
        userData.set("longitude",longitude)
        userData.set("role",role)
        dispatch(registerUser(userData))
    }

    const loadAvatar = (e)=>{
        const reader = new FileReader()
        reader.onload = ()=>{
            if(reader.readyState===2)
            setAvatar(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }


    
    const handleClass = (e,type)=>{
        if(type==="register"){
            spanElement.current.classList.add('shiftSpanToLeft')
            registerElement.current.classList.add('showRegister')
            loginElement.current.classList.add('removeLogin')
            
        }else{
            spanElement.current.classList.remove('shiftSpanToLeft')
            loginElement.current.classList.remove('removeLogin')
            registerElement.current.classList.remove('showRegister')
        }
    }

    const spanElement = useRef(null)
    const registerElement = useRef(null)
    const loginElement = useRef(null)
    const location = useLocation()
    const redirect = location.search ? `/${location.search.split("=")[1]}` : '/account'

    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        
        if(isAuthenticated)
        navigate(redirect)

    },[dispatch,error,alert,isAuthenticated,navigate])

    useEffect(()=>{
        getLocation()
    },[])

  return (
   loading ? <Loading /> :
   <div className='ecom__login-sign'>
        
   <div className='ecom__login-sign-container'>
       <div className='ecom__login-sign-switch'>
           <p onClick={(e)=>handleClass(e,"login")}>LOGIN</p>
           <p onClick={(e)=>handleClass(e,"register")}>REGISTER</p>
           <span ref={spanElement}></span>
       </div>
       <form ref={loginElement} className='ecom__login-container' onSubmit={handleLoginSubmit}>
           <div className='ecom__login-email'>
               <FiMail size={23} className='login-icons' />
               <input placeholder='Email' type="email" value={email} onChange={(e)=>userDispatch({type:'EMAIL',payload:e.target.value})}  />
           </div>
           <div className='ecom__login-password'>
               <RiLockPasswordLine size={23} className='login-icons' />
               <input placeholder='Password' type="password" value={password} onChange={(e)=>userDispatch({type:'PASSWORD',payload:e.target.value})}  />
           </div>
           <div className='ecom__login-btn'>
               <Link to='/password/forgot'>Forgot Password</Link>
               <button type="submit">Log In</button>
           </div>
       </form>
       
       <form ref={registerElement} encType="multipart/form-data" className='ecom__register-container' onSubmit={handleRegisterSubmit}>
           <div className='ecom__register-name'>
               <MdOutlineFace size={23} className='register-icons' />
               <input value={name} placeholder='Name' type="text" onChange={(e)=>userDispatch({type:'NAME',payload:e.target.value})} />
           </div>
           <div className='ecom__register-email'>
               <FiMail size={23} className='register-icons'/>
               <input value={email} placeholder='Email' type="email" onChange={(e)=>userDispatch({type:'EMAIL',payload:e.target.value})} />
           </div>

           <div className='ecom__register-password'>
               <RiLockPasswordLine size={23} className='register-icons'  />
               <input value={password} placeholder='Password' type="password" onChange={(e)=>userDispatch({type:'PASSWORD',payload:e.target.value})} />
           </div>
            <div>
                <label htmlFor="">Role</label>
                <select onChange={(e)=>setRole(e.target.value)}>
                    <option value="user">Recipient</option>
                    <option value="admin">Donor</option>
                </select>
            </div>
           <div className='ecom__register-avatar'>
               <img src={avatar} alt="profile" />
               <input type="file" accept="image/*" onChange={loadAvatar} />
           </div>
           <div className='ecom__register-btn'>
               <button type="submit">Register</button>
           </div>
       </form>



  </div>
</div>
  )
}

export default Login