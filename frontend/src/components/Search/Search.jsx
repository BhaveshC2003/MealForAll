import React from 'react'
import { useState } from 'react'
import './Search.css'
import { useNavigate, useParams } from 'react-router-dom'; 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
    const dispatch = useDispatch();

    const [keyword,setKeyword] = useState('');
    const navigate = useNavigate();
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate('/products')
        }
    }


  return (
    <form className='ecom__search' onSubmit={onSubmitHandler}>
        <input placeholder='Search' type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
        <button type="submit">Search</button>
    </form>
  )
}

export default Search