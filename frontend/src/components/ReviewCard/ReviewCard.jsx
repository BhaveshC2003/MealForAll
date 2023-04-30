import React from 'react'
import './ReviewCard.css'
import {default as profile} from '../../images/Profile.png'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({name,rating,comment,user}) => {
  return (
    <div className='review-container'>
        <div>
            <img src={profile} alt="profile" />
            <span>{name}</span>
        </div>
        <ReactStars value={rating} />
        <p>{comment}</p>
    </div>
  )
}

export default ReviewCard