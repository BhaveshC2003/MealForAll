import axios from "axios";


//Placing Order
export const newOrder = (orderData)=>async(dispatch,getState)=>{
    try{   
        dispatch({type:'PLACE_ORDER_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post('/api/v1/order/new',orderData,config)
        dispatch({type:'PLACE_ORDER_SUCCESS',payload:data.order})
    }catch(error){
        dispatch({type:'PLACE_ORDER_FAIL',payload:error.response.data.message})
    }
}

//Scheduled pickup
export const scheduledPickup = async(dispatch)=>{
    try{
        dispatch({type:"SCHEDULED_PICKUP_REQUEST"})
        const {data} = await axios.post("api/v1/order/pickup",{},{headers:{"Content-Type":"application/json"}})
        dispatch({type:"SCHEDULED_PICKUP_SUCCESS",payload:true})
    }catch(err){
        dispatch({type:"SCHEDULED_PICKUP_FAIL",payload:err.response.data.message})
    }
}

//Getting all orders
export const myOrders = async(dispatch)=>{
    try{
        dispatch({type:'MY_ORDERS_REQUEST'})
        const {data} = await axios.get('/api/v1/orders/me')
        dispatch({type:'MY_ORDERS_SUCCESS',payload:data.orders})
    }catch(error){ 
        dispatch({type:'MY_ORDERS_FAIL',payload:error.response.data.message})
    }
}

//Getting Order Details
export const orderDetails = (id)=>async(dispatch)=>{
   try{
        dispatch({type:'ORDER_DETAILS_REQUEST'})
        const {data} = await axios.get(`/api/v1/order/${id}`)
        dispatch({type:'ORDER_DETAILS_SUCCESS',payload:data})
   }catch(error){
        dispatch({type:'ORDER_DETAILS_FAIL',payload:error.response.data.message})
   }
}

//Getting all orders --Admin
export const getAllOrders = async(dispatch)=>{
    try{
        dispatch({type:'ALL_ORDERS_REQUEST'})
        const {data} = await axios.get('/api/v1/admin/orders')
        dispatch({type:'ALL_ORDERS_SUCCESS',payload:data.orders})
    }catch(error){
        dispatch({type:'ALL_ORDERS_FAIL',payload:error.response.data.message})
    }
}

//Updating orders --Admin
export const updateOrder = (id,updatedData)=>async(dispatch)=>{
    try{
        dispatch({type:'UPDATE_ORDER_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put(`/api/v1/admin/order/${id}`,updatedData,config)
        dispatch({type:'UPDATE_ORDER_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'UPDATE_ORDER_FAIL',payload:error.response.data.message})
    }   
}

//Delete order --Admin
export const deleteOrder = (id)=>async(dispatch)=>{
    try{
        dispatch({type:'DELETE_ORDER_REQUEST'})
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({type:'DELETE_ORDER_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'DELETE_ORDER_FAIL',payload:error.response.data.message})
    }
}