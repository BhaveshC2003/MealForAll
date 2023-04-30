import React from 'react'
import './Orders.css'
import { useEffect } from 'react'
import {DataGrid} from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { myOrders } from '../../Reducers/orderReducer/orderReducerMiddleware'
import {MdLaunch} from 'react-icons/md'
import { Link } from 'react-router-dom'

const Orders = () => {
    const dispatch = useDispatch()
    const {error,loading,orders} = useSelector(state=>state.orders)
    const alert = useAlert()
    const columns = [
        {
            field:'id',
            headerName:'ID',
            flex:1

        },{
            field:'status',
            headerName:'Status',
            flex:1,
            cellClassName:(params)=>{
                return(
                    params.getValue(params.id,"status") === 'Delivered' ? "greenColor" : "redColor"
                )
            }
        },{
            field:'quantity',
            headerName:'Quantity',
            type:'number',
            flex:1
        },{
            field:'amount',
            headerName:'Amount',
            type:'number',
            flex:1
        }/*{
            field:'actions',
            headerName:'Actions',
            type:'number',
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Link to={`/order/${params.getValue(params.id,"id")}`} ><MdLaunch size={window.innerWidth > 900 ? 25 : 18}/></Link>
                )
            }*/
        
    ]
    const ordersData =[]
    orders && orders.forEach(order=>{
        ordersData.push({
            id:order._id,
            quantity:order.orderItems.length,
            amount:order.totalPrice,
            status:order.orderStatus
        })
    })

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'ERRORS_CLEAR'})
        }
        dispatch(myOrders)

    },[dispatch,error,alert])

  return (
    <div className='ecom__orders'>
        <DataGrid
        columns={columns}
        rows={ordersData}
        pageSize={6}
        />

    </div>
  )
}

export default Orders