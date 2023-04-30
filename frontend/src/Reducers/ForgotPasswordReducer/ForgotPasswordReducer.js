import { createReducer } from "@reduxjs/toolkit";

export const forgotPasswordReducer = createReducer({},{
    FORGOT_PASSWORD_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    FORGOT_PASSWORD_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:action.payload
        }
    },
    FORGOT_PASSWORD_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:false
        }
    },
    FORGOT_PASSWORD_RESET:(state,action)=>{
        return{
            ...state,
            success:null
        }
    }
})