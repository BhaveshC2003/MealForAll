import axios from "axios";

//Adding item to cart
export const addToCart = (id,quantity)=>async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type:'ADD_TO_CART',
        payload:{
            productId: data.product._id,
            name:data.product.name,
            stock:data.product.Stock,
            price:data.product.price,
            image:data.product.images[0].url,
            quantity
        }
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

//removing item from cart
export const removeItemFromCart = (id)=>(dispatch,getState)=>{
    const updatedCart = getState().cart.cartItems.filter(item=>item.productId!==id)
    dispatch({type:'REMOVE_CART_ITEM',payload:updatedCart})
    localStorage.setItem("cartItems",JSON.stringify(updatedCart))
}

//Saving shipping details

export const saveShippingDetails = (data)=>async(dispatch)=>{
    dispatch({type:'SAVE_SHIPPING_DETAILS',payload:data})
    localStorage.setItem("shippingDetails",JSON.stringify(data))
}