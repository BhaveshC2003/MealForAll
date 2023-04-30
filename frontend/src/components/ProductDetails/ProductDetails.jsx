import React, { useEffect,useState,useRef } from 'react'
import './ProductDetails.css'
import { useSelector,useDispatch } from 'react-redux'
import { addReview, getProductDetails } from '../../Reducers/productReducer/actions';
import {useParams,Link} from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import Loading from '../Loading/Loading';
import ReactStars from 'react-rating-stars-component'
import ReviewCard from '../ReviewCard/ReviewCard';
import { addToCart } from '../../Reducers/CartReducer/CartReducerMiddleware';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import Rating from '@material-ui/lab/Rating';


const ProductDetails = () => {
const dispatch = useDispatch();
const {product,loading,error,distance} = useSelector((state)=>state.productDetailsReducer);
const {user} = useSelector(state=>state.user)
const {reviewError,success} = useSelector(state=>state.newReview)

const {id} = useParams(); 
const [quantity,setQuantity] = useState(1)
const [isReviewToggle,setIsReviewToggle] = useState(false)
const [review,setReview] = useState('')
const [rating,setRating] = useState(0)
const alert = useAlert()

const increaseQuantity = ()=>{
    if(quantity >= product.Stock)
    return
    setQuantity(prev=>prev+1)
}
const decreaseQuantity = ()=>{
    if(quantity <= 1)
    return
    setQuantity(prev=>prev-1)
}
const handleAddToCart = ()=>{
    dispatch(addToCart(id,quantity))
    alert.success('Item added to cart')
}

const handleSubmitReview = ()=>{
    const reviewData = new FormData()
    reviewData.set("comment",review)
    reviewData.set("rating",rating)
    reviewData.set("productId",id)
    dispatch(addReview(reviewData))
    setReview("")
    setIsReviewToggle(false)
}

useEffect(()=>{
    dispatch(getProductDetails(id));
    if(reviewError){
        alert.error(reviewError)
        dispatch({type:'CLEAR_ERRORS'})
    }
    if(success){
        alert.success('Review Added')
        dispatch({type:'ADD_REVIEW_RESET'})
    }
},[dispatch,id,success,alert,reviewError,success]);

    return (
        <>
        {loading ? <Loading /> :<> 
        <div className='ecom__productDetails'>
            <div className='ecom__productDetails-container'>
                <div className='ecom__productDetails-container-left'>
                    <Carousel>
                        {
                            product && product.images.map(image=>
                            {
                                return(
                                    <div className='image-container'>
                                        <img className='CarouselImage' src={image.url} alt={product.name} key={image.url} />
                                    </div>
                                )
                            }
                            )
                        }
                    </Carousel>
                </div>
                {
                    product && <div className='ecom__productDetails-container-right'>
                    <div className='product-name'>
                        <h2>{product.name}({distance} km away)</h2>
                        <p>{product._id}</p>
                        <a href={`https://maps.google.com/maps?q=${product.latitude} ,${product.longitude}`} target="_blank">Get Live Location</a>
                    </div>
                    
                    <div className='product-ratings'>
                        <ReactStars edit={false} value={product.rating} isHalf={true} activeColor={'tomato'}/>
                        <p>{product.numOfReviews} Reviews</p>
                    </div>
                    <h1>Rs{product.price}</h1>
                    <div className='product-add-to-cart'>
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity}/>
                        <button onClick={increaseQuantity}>+</button>
                        <button className='add-to-cart-btn' onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                    <div className='product-description'>
                        <span className={product.Stock > 0 ? 'stock-green' : 'stock-red'}> 
                            {
                                product.Stock > 0 ? 'In Stock' : 'Out Of Stock'
                            }
                        </span>
                        <p>{product.description}</p>
                    </div>
                    <div className='product-submit-review'>
                            {
                                !isReviewToggle ? <button onClick={()=>setIsReviewToggle(true)}>Add Review</button> :
                                                <>
                                                <Typography>Rate the product:</Typography>
                                                <Rating name='rating label' value={rating} onChange={(e,newRating)=>setRating(newRating)}/>
                                                <textarea value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
                                                <button onClick={handleSubmitReview}>Submit Review</button>
                                                </>
                            }                   
                    </div>
                </div>
                }
                
            </div>
        </div>
        <div className='product-reviews section__margin'>
                {
                    product && !product.reviews[0] ? 
                    <h2>No Reviews Yet</h2> :
                    product && product.reviews.map(review=><ReviewCard {...review} />)
    }
        </div>

                </>
        


        }
       
            
                
          </>  
       
        
    
    )
}

export default ProductDetails