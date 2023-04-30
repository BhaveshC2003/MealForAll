import React from 'react'
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = ({productsPerPage,totalProducts,currentPage=1,setCurrentPage}) => {
    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalProducts/productsPerPage);i++){
        pageNumbers.push(i)
    }

    

  return (
    <div className='ecom__pagination'>
        <ul>
            <li onClick={()=>setCurrentPage(currentPage-1)}>Prev</li>
            {
                pageNumbers.map((number)=>
                <li onClick={()=>setCurrentPage(number)} className={currentPage===number ? 'pagination-number pagination-active' : 'pagination-number' }>{number}</li>)
            }
            <li onClick={()=>setCurrentPage(currentPage+1)}>Next</li>
        </ul>
    </div>
  )
}

export default Pagination