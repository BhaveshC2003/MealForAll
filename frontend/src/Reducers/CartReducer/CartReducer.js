import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingDetails: localStorage.getItem("shippingDetails") ? JSON.parse(localStorage.getItem("shippingDetails")) : {}
}

export const cartReducer = createReducer(initialState,{
    'ADD_TO_CART':(state,{payload})=>{
        const isItemExist = state.cartItems.find(item=>item.productId === payload.productId)
        if(isItemExist){
            return{
                ...state,
                cartItems: state.cartItems.map(item=>item.productId===payload.productId ? payload : item)
            }
        }else{
            return{
                ...state,
                cartItems: [...state.cartItems,payload]
            }
        }
    },
    'REMOVE_CART_ITEM':(state,action)=>{
        return{
            ...state,
            cartItems:action.payload
        }
    },
    'SAVE_SHIPPING_DETAILS':(state,action)=>{
        return{
            ...state,
            shippingDetails:action.payload
        }
    }
})