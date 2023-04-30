import React,{useEffect,useState} from 'react'
import './EditUser.css'
import { useDispatch,useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../../../Reducers/userReducer/userMiddleware'
import { useParams,useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Loading from '../../Loading/Loading'
import { Typography } from '@mui/material'

const EditUser = () => {
    const dispatch = useDispatch()
    const {user,loading,error,isUpdated} = useSelector(state=>state.user)
    const {id} = useParams()
    const alert = useAlert()
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')
    const handleSave = (e)=>{
        e.preventDefault()
        const updatedData = {name,email,role}
        dispatch(updateUser(id,updatedData))
    }

    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
    },[user])
    useEffect(()=>{
        if(isUpdated === true){
            navigate('/admin/dashboard')
            alert.success("User Updated Successfully")
        }
    },[isUpdated])
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }
        dispatch(getUserDetails(id))
    },[dispatch,id])
    
  return (
    loading === true ? <Loading />:
    <form className='ecom__edit-user' onSubmit={handleSave}>
        <div className='edit-user-image'>
            {
                user && <img src={user.avatar.url} alt="profilePic" />
            }
        </div>
        <div className='edit-user-container'>
            <Typography>Edit User Details:</Typography>
            <div>
                <Typography>Name:</Typography>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div>
                <Typography>Email:</Typography>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <Typography>Role:</Typography>
                <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} />
            </div>
            <div>
                <button type='submit'>Save</button>
            </div>
        </div>
        
    </form>
  )
}

export default EditUser