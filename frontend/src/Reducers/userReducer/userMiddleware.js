import axios from "axios";


export const loginUser = (details)=>async(dispatch)=>{
    try{
        dispatch({type:'LOGIN_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post('/api/v1/login',details,config)
        dispatch({type:'LOGIN_SUCCESS',payload:data.user})
    }catch(error){
        dispatch({type:'LOGIN_FAIL',payload:error.response.data.message})
    }
}

export const registerUser = (userData)=>async(dispatch)=>{
    try{
        dispatch({type:'REGISTER_REQUEST'})
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.post('/api/v1/register',userData,config)
        dispatch({type:'REGISTER_SUCCESS',payload:data.user})
    }catch(error){
        dispatch({type:'REGISTER_FAIL',payload:error.response.data.message})
    }
}

export const loadUser = async(dispatch)=>{
    try{
        dispatch({type:'LOAD_USER_REQUEST'})
        const {data} = await axios.get('/api/v1/me')
        dispatch({type:'LOAD_USER_SUCCESS',payload:data.user})

    }catch(error){
        dispatch({type:'LOAD_USER_FAIL',payload:error.response.data.message})
    }
}

export const logout = async(dispatch)=>{
    try{
        await axios.get('api/v1/logout')
        dispatch({type:'LOGOUT_SUCCESS'})
    }catch(error){
        dispatch({type:'LOGOUT_FAIL',payload:error.response.data.message})
    }
}

//Getting all users --Admin
export const getAllUsers = async(dispatch)=>{
    try{    
        dispatch({type:'ALL_USERS_REQUEST'})
        const {data} = await axios.get("/api/v1/admin/users")
        dispatch({type:'ALL_USERS_SUCCESS',payload:data.users})
    }catch(error){
        dispatch({type:'ALL_USERS_FAIL',payload:error.response.data.message})
    }
}

//Getting single user details --Admin
export const getUserDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type:'USER_DETAILS_REQUEST'})
        const {data} = await axios.get(`/api/v1/admin/user/${id}`)
        dispatch({type:'USER_DETAILS_SUCCESS',payload:data.user})
    }catch(error){
        dispatch({type:'USER_DETAILS_FAIL',payload:error.response.data.message})
    }
}

//Updating user --Admin
export const updateUser = (id,updatedData)=>async(dispatch)=>{
    try{
        dispatch({type:'UPDATE_USER_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put(`/api/v1/admin/user/${id}`,updatedData,config)
        dispatch({type:'UPDATE_USER_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'UPDATE_USER_FAIL',payload:error.response.data.message})
    }
}