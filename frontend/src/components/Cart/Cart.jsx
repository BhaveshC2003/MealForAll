import {React,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import { Item } from './Item/Item'
import {MdRemoveShoppingCart} from 'react-icons/md'
import { Link,useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { scheduledPickup } from '../../Reducers/orderReducer/orderReducerMiddleware'
import Loading from '../Loading/Loading'

const Cart = () => {
    const {cartItems} = useSelector(state=>state.cart)
    const {loading,success,message} = useSelector(state=>state.newOrder)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const handleCheckOut = ()=>{
        navigate('/login?redirect=shipping')
    }
    const handlePickup = ()=>{
        dispatch(scheduledPickup)
    }

    useEffect(()=>{
        if(success){
            alert.success(message)
            dispatch({type:"RESET_SUCCESS"})
            navigate("/")
        }
    },[success])

  return (
    loading ? <Loading /> : 
    !cartItems[0] ? 
    <div className='ecom__cart-empty'>
        <div>
            <MdRemoveShoppingCart size={55} color='tomato' />
            <h2>No Items In Cart</h2>
            <Link to='/products'>Click Here To Discover</Link>
        </div>
    </div> : 
    <div className='ecom__cart'>
        <div className='ecom__cart-container'>
            <div className='ecom__cart-header'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>  
            <div className='ecom__cart-items'>
                {
                    cartItems.map((item,i)=><Item key={i} item={item} />)
                }
            </div>
        </div>
        <div className='check-out-btn'>
            <button onClick={handlePickup} >Scheduled Pickup</button>
            <button onClick={handleCheckOut} >Check Out</button>
        </div>


    </div> 
  )
}

export default Cart