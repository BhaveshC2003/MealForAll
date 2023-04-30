import React from 'react'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../../Reducers/CartReducer/CartReducerMiddleware'
import './Item.css'
import { useAlert } from 'react-alert'

export const Item = ({item,showRemove=true}) => {
    const {name,price,quantity,stock,image,productId} = item
    const dispatch = useDispatch()
    const alert = useAlert()
    const removeItem = ()=>{
        dispatch(removeItemFromCart(productId))
        alert.success("Item Remove From Cart")
    }
  return (
    <div className='ecom__cart-item'>
        <div className='item-left'>
            <div className='item-image'>
                <img src={image} alt={name} />
            </div>
            <div className='item-details'>
                <p>{name}</p>
                <p>Rs {price}</p>
                {
                    showRemove && <p onClick={removeItem}>Remove</p>
                }
                
            </div>
        </div>
        <div className='item-middle'>
            <p>{quantity}</p>
        </div>
        <div className='item-right'>
            <p>Rs {price*quantity}</p>
        </div>
    </div>  
  )
}
