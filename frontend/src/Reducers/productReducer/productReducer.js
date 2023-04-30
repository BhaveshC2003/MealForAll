import {createReducer} from '@reduxjs/toolkit';

//Product reducer for getting products on page load
export const productReducer = createReducer({},{
    ALL_PRODUCT_REQUEST: (state={products:[]},action)=>{
        return{
            loading:true,
            products:[]
        }
    },
    ALL_PRODUCT_SUCCESS: (state,action)=>{
        return{
            loading:false,
            products:action.payload.products,
            totalProducts:action.payload.totalProducts,
            productsPerPage:action.payload.productsPerPage,
            filteredProductCount:action.payload.filteredProductCount
        }
    },
    ALL_PRODUCT_FAIL: (state,action)=>{
        return{
            loading:false,
            error:action.payload
        }
    },
    ADMIN_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    ADMIN_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            products:action.payload
        }
    },
    ADMIN_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    CLEAR_ERRORS: (state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    DELETE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    DELETE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload
        }
    },
    DELETE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
            isDeleted:false
        }
    },
    DELETE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false
        }
    }
});


//Product details reducer
export const productDetailsReducer = createReducer({},{
    PRODUCT_DETAILS_REQUEST: (state={product:{}},action)=>{
        return{
            loading:true,
            product:{}
        }
    },
    PRODUCT_DETAILS_SUCCESS:(state,action)=>{
        return{
            loading:false,
            product:action.payload.product,
            distance:action.payload.distance
            }
        },
    PRODUCT_DETAILS_FAIL: (state,action)=>{
        return{
            loading:false,
            error:action.payload,
            distance:0
        }
    },
    UPDATE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload
        }
    },
    UPDATE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:false,
            error:action.payload
        }
    },
    UPDATE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false
        }
    }
 
});

//Adding review
export const addReviewReducer = createReducer({},{
    ADD_REVIEW_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    ADD_REVIEW_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:action.payload
        }
    },
    ADD_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:false,
            reviewError:action.payload
        }
    },
    ADD_REVIEW_RESET:(state,action)=>{
        return{
            ...state,
            success:false
        }
    }
})

//Adding new product --Admin
export const newProductReducer = createReducer({},{
    NEW_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    NEW_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            product:action.payload.product,
            success:action.payload.success
        }
    },
    NEW_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
            success:false
        }
    },
    NEW_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            success:false
        }
    }
})




