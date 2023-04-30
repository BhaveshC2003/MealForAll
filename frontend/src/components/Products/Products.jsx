import React, { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../../Reducers/productReducer/actions'
import Pagination from '../Pagination/Pagination'
import Slider from '@material-ui/core/Slider'
import { Typography } from '@material-ui/core'

const Products = () => {
const dispatch = useDispatch();
const {products,loading,error,productsPerPage,totalProducts,filteredProductCount} = useSelector(state=>state.productReducer)
const params = useParams();

//Handling States
const [currentPage,setCurrentPage] = useState(1);
const [price,setPrice] = useState([0,10000]);
const priceHandler = (event,newPrice)=>setPrice(newPrice)
const [category,setCategory] = useState("")
const [ratings,setRatings] = useState(0)

let count = filteredProductCount
const categories = ["Low Fat","Healthy","Veg","Non-Veg","Protein Rich","Keto Diet","Jain"]

useEffect(()=>{
    
    dispatch(getAllProducts(params.keyword,currentPage,price,category,ratings))
    console.log(category)
    },
  [dispatch,currentPage,price,category,ratings]
)


  return (
    loading ? <Loading /> : 
    <>
        <div className='ecom__products'>
            {
                products && products.map(product=><ProductCard {...product}/>)
            }
        </div>

        <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              min={0}
              max={10000}
              valueLabelDisplay="auto"
              aria-labelledby='range-slider'
            />
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {
                categories.map(c=><li key={c} onClick={()=>setCategory(c)}>{c}</li>)
              }
            </ul>
            <fieldset>
              <Typography component={'legend'}>Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e,r)=>setRatings(r)}
                min={0}
                max={5}
                valueLabelDisplay='auto'
                aria-labelledby="continuous-slider"
              />
            </fieldset>
        </div>

      

      
        {
          totalProducts <= count && 
        <div className='ecom__products-pagination'>
          <Pagination setCurrentPage={setCurrentPage} totalProducts={totalProducts} productsPerPage={productsPerPage} currentPage={currentPage}/>
      </div>
        }

    </>
  )
}

export default Products