import axios from 'axios';

//To fetch data from backend
//Getting all products for homepage
export const getAllProducts = (keyword='',currentPage=1,price=[0,10000],category,ratings=0)=>async(dispatch,getState)=>{
    try {
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lte]=${price[1]}`
        if (ratings != 0) {
            link = link + `&rating=${ratings}`
        }
        if (category) {
            link = link + `&category=${category}`
        }

        dispatch({type:'ALL_PRODUCT_REQUEST'})
        const {data} = await axios.get(link);
        dispatch({type:'ALL_PRODUCT_SUCCESS',payload:data})
    } catch (error) {
        dispatch({
            type:'ALL_PRODUCT_FAIL',
            payload:error.response.data.message
    });
    }
}

//Clearing alert errors
export const clearErrors = async(dispatch)=>{
    dispatch({
        type:'CLEAR_ERRORS',
        error:null
    });
}

//Getting single product details
export const getProductDetails = id=>async(dispatch,getState)=>{
    try{
        dispatch({type:'PRODUCT_DETAILS_REQUEST'});
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:'PRODUCT_DETAILS_SUCCESS',
            payload: data
        });

    }catch(error){
        dispatch({
            type:'PRODUCT_DETAILS_FAIL',
            payload: error.response.data.message 
        });
    }
}

export const addReview = (reviewData)=>async(dispatch)=>{
    try{
        dispatch({type:'ADD_REVIEW_REQUEST'})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.put('/api/v1/review',reviewData,config)
        dispatch({type:'ADD_REVIEW_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'ADD_REVIEW_FAIL'})
    }
}


//Getting all products --Admin
export const getAdminProducts = async(dispatch)=>{
    try{
        dispatch({type:'ADMIN_PRODUCT_REQUEST'})
        const {data} = await axios.get('/api/v1/admin/products')
        dispatch({type:'ADMIN_PRODUCT_SUCCESS',payload:data.products})
    }catch(error){
        dispatch({type:'ADMIN_PRODUCT_FAIL',payload:error.response.data.message})
    }
}

//Adding new product --Admin
export const addNewProduct = (productData)=>async(dispatch)=>{
    try{
        dispatch({type:'NEW_PRODUCT_REQUEST'})
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.post("/api/v1/admin/product/new",productData,config)
        dispatch({type:'NEW_PRODUCT_SUCCESS',payload:data})
    }catch(error){
        dispatch({type:'NEW_PRODUCT_FAIL',payload:error.response.data.message})
    }
}

//Deleting product --Admin

export const deleteProduct = (id)=>async(dispatch)=>{
    try{
        dispatch({type:'DELETE_PRODUCT_REQUEST'})
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch({type:'DELETE_PRODUCT_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'DELETE_PRODUCT_FAIL'})
    }
}

//Update product --Admin
export const updateProduct = (id,updatedData)=>async(dispatch)=>{
    try{
        dispatch({type:'UPDATE_PRODUCT_REQUEST'})
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.put(`/api/v1/admin/product/${id}`,updatedData,config)
        dispatch({type:'UPDATE_PRODUCT_SUCCESS',payload:data.success})
    }catch(error){
        dispatch({type:'UPDATE_PRODUCT_FAIL'})
    }
}