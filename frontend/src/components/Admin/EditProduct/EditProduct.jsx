import React,{useEffect, useState} from 'react'
import './EditProduct.css'
import { Typography } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { clearErrors, getProductDetails, updateProduct } from '../../../Reducers/productReducer/actions'
import {MdDriveFileRenameOutline} from 'react-icons/md'
import {BiCategoryAlt} from 'react-icons/bi'
import {ImPriceTag} from 'react-icons/im'
import {GiStockpiles} from 'react-icons/gi'
import {HiInformationCircle} from 'react-icons/hi'
import Carousel from 'react-material-ui-carousel'
import Loading from '../../Loading/Loading'

const EditProduct = () => {
    const categories = ["Laptop","Footwear","Bottom","Tops","Attire","Camera","SmartPhones"]
    const {error,loading,product,isUpdated} = useSelector(state=>state.productDetailsReducer)
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [stock,setStock] = useState(0)
    const [about,setAbout] = useState('')
    //const [oldImages,setOldImages] = useState([])
    const [images,setImages] = useState([])
    const [category,setCategory] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const alert = useAlert()
    const handleUpdate =(e)=>{
        e.preventDefault()
        const updatedData = new FormData()
        updatedData.set("name",name)
        updatedData.set("price",price)
        updatedData.set("Stock",stock)
        updatedData.set("description",about)
        updatedData.set("category",category)
        dispatch(updateProduct(id,updatedData))
    }
    const handleImages = ()=>{

    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
       if(product){
        setName(product.name)
        setPrice(product.price)
        setStock(product.Stock)
        setAbout(product.description)
        setImages(product.images)
        setCategory(product.category)
       }
       if(isUpdated){
           alert.success("Product Updated Successfully")
           navigate('/admin/dashboard')
           dispatch({type:'UPDATE_PRODUCT_RESET'})
       }

    },[error,alert,product,dispatch,isUpdated,navigate])

    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch,id])

  return (
    loading === true ? <Loading />:
    <div className='ecom__update-product'>
        <form className='ecom__update-product-container' encType='multipart/form-data' onSubmit={handleUpdate} >
            <div className='update-product-left'>
                <div className='update-product-images'>
                    <Carousel
                        navButtonsProps={{          
                            style: {
                                display: 'none'
                            }
                        }}
                        indicatorIconButtonProps={{
                            style:{
                                display:'none'
                            }
                        }} 
                    >
                        {
                           images && images.map((image,i)=><img key={i} src={image.url} alt={name} ></img>)
                        }
                    </Carousel>
                </div>
                <div>
                    <input className='images-input' type="file" accept='image/*' onChange={handleImages} multiple />
                </div>
            </div>
            <div className='update-product-right'>
                <Typography>Edit Product</Typography>
                <div>
                    <label htmlFor="productName"><MdDriveFileRenameOutline size={window.innerWidth > 900 ? 23 : 18} /></label>
                    <input required placeholder='Product Name' type="text" id='productName' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price"><ImPriceTag size={window.innerWidth > 900 ? 23 : 18} /></label>
                    <input required placeholder='Price' type="number" id='price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="stock"><GiStockpiles size={window.innerWidth > 900 ? 23 : 18} /></label>
                    <input required placeholder='Stock' type="number" value={stock} onChange={(e)=>setStock(e.target.value)} />
                </div>
                <div>
                    <label className='update-product-label' htmlFor="desp"><HiInformationCircle size={window.innerWidth > 900 ? 23 : 18} /></label>
                    <textarea placeholder='About Product' name="aboutProduct" id="desp" cols="50" rows="5" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
                </div>
                    <div>
                        <BiCategoryAlt size={window.innerWidth > 900 ? 23 : 18} />
                        <select  required name="cate" id="category" onChange={(e)=>setCategory(e.target.value)}>
                            {
                                categories.map((cat,i)=><option value={cat} key={i}>{cat}</option>)
                            }
                        </select>
                    </div>
                    
                
                <div className='update-product-btn'>
                    <button type='submit'>Update</button>
                    <button type="button" onClick={()=>navigate('/admin/dashboard')}>Cancel</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditProduct