import React,{useEffect} from 'react'
import './OrderList.css'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Loading/Loading'
import { deleteOrder, getAllOrders } from '../../../Reducers/orderReducer/orderReducerMiddleware'
import { clearErrors } from '../../../Reducers/productReducer/actions'
import { useAlert } from 'react-alert'

const OrderList = () => {
    const {orders,error,loading,isDeleted} = useSelector(state=>state.allOrders)
    const dispatch = useDispatch()
    const alert = useAlert()
    const handleDelete = (id)=>{
        dispatch(deleteOrder(id))
    }

    const cols = [
        {
            field:'id',
            headerName:'Order Id',
            flex:1
        },{
            field:'status',
            headerName:'Status',
            flex:1,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status") === "Delivered" ? "greenColor" : "redColor" 
            }
        },{
            field:'quantity',
            headerName:'Quantity',
            type:'number',
            flex:0.3
        },{
            field:'amount',
            headerName:'Amount',
            type:'number',
            flex:0.3
        },{
            field:'actions',
            headerName:'Actions',
            flex:0.5,
            renderCell: (params)=>{
                return(
               <>
                    <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                        <FiEdit size={window.innerWidth > 900 ? 20 : 15} cursor="pointer" />
                    </Link>
                    <AiOutlineDelete onClick={()=>handleDelete(params.getValue(params.id,"id"))} size={window.innerWidth > 900 ? 20 : 15} style={{margin:'auto'}} cursor="pointer" />
               </>
               )
            }
        }
    ]
    const rows =[]
    orders && orders.forEach(order=>{
        rows.push({
            id:order._id,
            status:order.orderStatus,
            quantity:order.orderItems.length,
            amount:order.totalPrice
        })
    })

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }
        if(isDeleted===true){
            dispatch({type:'DELETE_ORDER_RESET'})
            alert.success("Order Deleted Successfully")
        }
        dispatch(getAllOrders)
    },[dispatch,error,alert,isDeleted])


  return (
    <>
        {
            loading === true ? <Loading />:
            <div className='ecom__order-list'>
            <DataGrid
                columns={cols}
                rows={rows}
                pageSize={10}
            />
    
        </div>
        }
    
    </>
  )
}

export default OrderList