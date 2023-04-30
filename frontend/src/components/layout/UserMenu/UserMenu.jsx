import React from 'react'
import './UserMenu.css'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useRef,useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Reducers/userReducer/userMiddleware'
import {AiOutlineShoppingCart} from 'react-icons/ai'



const UserMenu = ({user}) => {
    const [isMenuToggle,setIsMenuToggle] = useState(false)
    const menuEl = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const account = ()=>{
        navigate('/account')
    }
    const orders = ()=>{
        navigate('/orders')
    }
    const logoutUser = ()=>{
        dispatch(logout)
        navigate('/')
    }
    const dashboard = ()=>{
        navigate('/admin/dashboard')
    }
    const cart = ()=>{
        navigate('/cart')
    }

const menu = [{
        name:'Profile',
        icon:<PersonIcon />,
        method:account
    },{
        name:'Orders',
        icon:<ListAltIcon />,
        method:orders
    },{
        name:'Logout',
        icon:<ExitToAppIcon />,
        method:logoutUser
    },{
        name:'Cart',
        icon:<AiOutlineShoppingCart/>,
        method: cart
    }
]

    const handleClass = ()=>{
        setIsMenuToggle(!isMenuToggle)
        if(isMenuToggle){
            menuEl.current.classList.add('showMenu')
        }else{
            menuEl.current.classList.remove('showMenu')
        }
    }
    user.role === 'admin' && menu.unshift({name:'Dashboard',icon:<DashboardIcon/>,method:dashboard})

  return (
    <div className='ecom__user-menu'>
        <div onClick={handleClass} className='ecom__user-menu-profile-image'>
            <img src={user.avatar.url ? user.avatar.url : './Profile.png'} alt="profile" />
        </div>
        <div ref={menuEl} className='ecom__user-menu-container'>
            {
                menu.map((item)=>{
                    return(
                        <div key={item.name} onClick={item.method}>
                            {item.icon}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default UserMenu