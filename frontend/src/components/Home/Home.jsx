import React, { useEffect } from 'react'
import {CgMouse} from 'react-icons/cg'
import './home.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MetaData from '../layout/MetaData'
import { useSelector,useDispatch } from 'react-redux'
import { getAllProducts } from '../../Reducers/productReducer/actions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

const Home = () => {
  const alert = useAlert();
  const {loading,error,products} = useSelector(state=>state.productReducer)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(error){
      return alert.error(error)
    }
    dispatch(getAllProducts());
  },[dispatch,error,alert]);


  return (
    <>
    <MetaData title='Home' /> 
    <div className='ecom__home'>
        <h3>MealForAll</h3>
        <h1>Connecting Surplus Food To Those In Need</h1>

        <div className='ecom__home-container'>
            <span className='ecom__home-container-border'></span>
           <button>Scroll <CgMouse /></button>
        </div>
    </div>

    <FeaturedProducts products={products} />
    </>
  )
}

export default Home