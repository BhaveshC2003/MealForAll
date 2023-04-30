import React from 'react'
import './productCard.css'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'


const ProductCard = ({name,price,rating,images,numOfReviews,_id}) => {
  const options = {
    edit:false,
    color: 'rgba(20,20,20,0.1)',
    activeColor:'tomato',
    isHalf:true,
    value:rating
}
  return (
    <Link className='ecom__productCard' to={`/product/${_id}`}>
      <div>
        <img src={images[0].url} alt={name} />
      </div>
        
        <p>{name}</p>
        <div>
            <ReactStars {...options}/>
            <span>{numOfReviews} Reviews</span>
        </div>
        <p>Rs {price}</p>
    
    
    </Link>
    
  )
}

export default ProductCard