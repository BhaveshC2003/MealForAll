import React,{useState,useEffect} from 'react'
import './CreateProduct.css'
import { Typography } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { addNewProduct, clearErrors } from '../../../Reducers/productReducer/actions'
import {MdDriveFileRenameOutline} from 'react-icons/md'
import {BiCategoryAlt} from 'react-icons/bi'
import {ImPriceTag} from 'react-icons/im'
import {GiStockpiles} from 'react-icons/gi'
import {HiInformationCircle} from 'react-icons/hi'
import Carousel from 'react-material-ui-carousel'
import Loading from '../../Loading/Loading'

const CreateProduct = () => {
    const categories = ["Low Fat","Healthy","Veg","Non-Veg","Protein Rich","Keto Diet","Jain"]
    const {loading,error,success} = useSelector(state=>state.newProduct)
    const dispatch = useDispatch()
    const alert = useAlert()
    const [name,setName] = useState('')
    const [price,setPrice] = useState()
    const [stock,setStock] = useState()
    const [about,setAbout] = useState('')
    const [images,setImages] = useState([])
    const [category,setCategory] = useState('Laptop')
    const [latitude,setLatitude] = useState()
    const [longitude,setLongitude] = useState()
    const navigate = useNavigate()

    const getUserLocation = ()=>{
         navigator.geolocation.getCurrentPosition((position)=>{
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const productData = new FormData()
        productData.set("name",name)
        productData.set("price",price)
        productData.set("Stock",stock)
        productData.set("description",about)
        productData.set("category",category)
        productData.set("longitude",longitude)
        productData.set("latitude",latitude)
        images.forEach(image=>{
            productData.append("images",image)
        })
        console.log(productData)
        dispatch(addNewProduct(productData))
    }

    const handleImages = (e)=>{
        const files = Array.from(e.target.files)
        setImages([])
        files.forEach((file)=>{
            const reader = new FileReader()
            reader.onload = ()=>{
                if(reader.readyState === 2)
                setImages(prev=>[...prev,reader.result])
            }
            reader.readAsDataURL(file)
        })
    }


    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        if(success){
            navigate('/admin/dashboard')
            alert.success("Product Successfully Created")
            dispatch({type:'NEW_PRODUCT_RESET'})
        }

    },[dispatch,error,success,alert])

    useEffect(()=>{
        getUserLocation()
    },[])

  return (
    loading === true ? <Loading /> :
    <div className='ecom__create-product'>
        <form className='ecom__create-product-container' encType='multipart/form-data' onSubmit={handleSubmit} >
            <div className='create-product-left'>
                <div className='create-product-images'>
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
                            images.map((image,i)=><img key={i} src={image} alt={name} ></img>)
                        }
                    </Carousel>
                </div>
                <div>
                    <input className='images-input' type="file" accept='image/*' onChange={handleImages} multiple />
                </div>
            </div>
            <div className='create-product-right'>
                <Typography>Product Details</Typography>
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
                    <label className='create-product-label' htmlFor="desp"><HiInformationCircle size={window.innerWidth > 900 ? 23 : 18} /></label>
                    <textarea placeholder='About Product' name="aboutProduct" id="desp" cols="50" rows="5" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
                </div>
                    <div>
                        <BiCategoryAlt size={window.innerWidth > 900 ? 23 : 18} />
                        <select required name="cate" id="category" onChange={(e)=>setCategory(e.target.value)}>
                            {
                                categories.map((cat,i)=><option value={cat} key={i}>{cat}</option>)
                            }
                        </select>
                    </div>
    
                <div className='create-product-btn'>
                    <button type='submit'>Create</button>
                    <button type="button" onClick={()=>navigate('/admin/dashboard')}>Cancel</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CreateProduct