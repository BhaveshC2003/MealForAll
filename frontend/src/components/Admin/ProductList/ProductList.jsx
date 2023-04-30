import React,{useEffect} from 'react'
import './ProductList.css'
import { DataGrid } from '@mui/x-data-grid'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { deleteProduct, getAdminProducts } from '../../../Reducers/productReducer/actions'
import Loading from '../../Loading/Loading'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
    const {products,loading,error,isDeleted} = useSelector(state=>state.productReducer)
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const handleDeleteProduct = (id)=>{
        dispatch(deleteProduct(id))
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:'CLEAR_ERRORS'})
        }
        dispatch(getAdminProducts)
        if(isDeleted){
            alert.success("Product Deleted Successfully")
            navigate('/admin/dashboard')
            dispatch({type:'DELETE_PRODUCT_RESET'})
        }

    },[error,alert,dispatch,isDeleted,navigate])


    const cols = [
        {
            field:"id",
            headerName:"Id",
            flex:2
        },{
            field:"name",
            headerName:"Name",
            flex:1.5
        },{
            field:"stock",
            headerName:"Stock",
            flex:1
        },{
            field:"price",
            headerName:"Price",
            type:"number",
            flex:1
        },{
            field:"actions",
            headerName:"Actions",
            sortable:false,
            flex:1,
            renderCell:(params)=>
                <>
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                        <FiEdit size={window.innerWidth > 900 ? 18 : 15} />
                    </Link>
                    <AiOutlineDelete onClick={()=>handleDeleteProduct(params.getValue(params.id,"id"))} 
                    size={window.innerWidth > 900 ? 18 : 15} 
                    cursor="pointer"
                    style={{margin:"auto"}}
                    />
                </>
            
        }
    ]
    const rows =[]
    products && products.forEach(product=>{
        rows.push(
            {
                id:product._id,
                name:product.name,
                stock:product.Stock,
                price:product.price,
            }
        )
    })
    
  return <>
    {
        loading ? <Loading /> :
        <div className='ecom__admin-products'>

        <DataGrid
            columns={cols}
            rows={rows}
            pageSize={20}
        />
    </div>
    }
  
  
  </>
   
  
}

export default ProductList