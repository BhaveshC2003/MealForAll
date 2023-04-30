import React,{useEffect} from 'react'
import './UserList.css'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch,useSelector } from 'react-redux'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../../Reducers/userReducer/userMiddleware'
import { useAlert } from 'react-alert'
import Loading from '../../Loading/Loading'

const UserList = () => {
    const dispatch = useDispatch()
    const {users,loading,error} = useSelector(state=>state.allUsers)
    const alert = useAlert()
    const cols = [
        {
            field:"id",
            headerName:"Id",
            flex:1
        },{
            field:"name",
            headerName:"Name",
            flex:1
        },{
            field:"role",
            headerName:"Role",
            flex:0.5
        },{
            field:"actions",
            headerName:"Actions",
            flex:0.5,
            renderCell:(params)=>{
                return(
                <>
                    <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                        <FiEdit size={window.innerWidth > 900 ? 18 : 15} cursor="pointer" />
                    </Link>
                    <AiOutlineDelete
                    size={window.innerWidth > 900 ? 18 : 15} 
                    cursor="pointer"
                    style={{margin:"auto"}}
                    />
                </>
                )
            }
        }
    ]
    let rows = []
    users && users.forEach((user=>{
        rows.push({
            id:user._id,
            name:user.name,
            role:user.role
        })
    }))
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }
        dispatch(getAllUsers)
    },[dispatch,alert,error])

  return (
    loading === true ? <Loading />:
    <div className='ecom__user-list'>
        <DataGrid 
        columns={cols}
        rows={rows}
        pageSize={15}
        />
    </div>
  )
}

export default UserList