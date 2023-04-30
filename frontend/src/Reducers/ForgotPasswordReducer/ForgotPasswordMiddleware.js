import axios from "axios"
export const forgotPassword = (email)=>async(dispatch)=>{

    try{
        dispatch({type:'FORGOT_PASSWORD_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post('/api/v1/forgot/password',{email},config)
        dispatch({type:'FORGOT_PASSWORD_SUCCESS',payload:data.success})

    }catch(error){
        dispatch({type:'FORGOT_PASSWORD_FAIL',payload:error.response.data.message})
    }
}