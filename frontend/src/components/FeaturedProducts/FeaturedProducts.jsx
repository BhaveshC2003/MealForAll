import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './featuredProducts.css'
import {default as menShirt} from '../../images/ecommerce images/top1.jpg'




const FeaturedProducts = ({products}) => {
  return (
    <div className='ecom__featured-product'>
        <div className='ecom__featured-product-heading'>
            <h2>FEATURED PRODUCTS</h2>
        </div>
        <div className='ecom__featured-product-container section__margin'>
            {
              products && products.map(product=><ProductCard {...product}/>)
            }


        </div>
    </div>
  )
}

export default FeaturedProducts