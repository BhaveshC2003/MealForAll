import axios from "axios"

export const updateUser = (updatedData)=>async(dispatch)=>{
    try{
        dispatch({type:'UPDATE_PROFILE_REQUEST'})
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.put('/api/v1/me/update',updatedData,config)
        dispatch({type:'UPDATE_PROFILE_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'UPDATE_PROFILE_FAIL',payload:error.response.data.message})
    }
}  

export const updatePassword = (passwords)=>async(dispatch)=>{
    try{
        dispatch({type:'UPDATE_PASSWORD_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put('/api/v1/password/update',passwords,config)
        dispatch({type:'UPDATE_PASSWORD_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'UPDATE_PASSWORD_FAIL',payload:error.response.data.message})
    }

}