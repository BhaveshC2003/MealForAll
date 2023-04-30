import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import {default as logo} from '../../../images/MealForAll.jpeg'
import {default as profile} from '../../../images/Profile.png'
import './Header.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useState } from 'react'
import {RiCloseLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {GoSearch} from 'react-icons/go'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const Header = () => {
  const [isNavbarToggle,setIsNavbarToggle] = useState(false);
  return (
      !isNavbarToggle ? <GiHamburgerMenu className='menuIcon' cursor={'pointer'} size={27} onClick={()=>setIsNavbarToggle(!isNavbarToggle)} /> :
      <div className='ecom__navbar'>
        <RiCloseLine className='menuIcon' onClick={()=>setIsNavbarToggle(false)} size={27}/>
        <div className='ecom__navbar-container'>
          <div className='ecom__navbar-logo'><img src={logo} alt="logo" /></div>
          <div className='ecom__navbar-tags'>
              <Link className='linkTag' to='/'>Home</Link>
              <Link className='linkTag' to='/products'>Products</Link>
              <Link className='linkTag' to='/about'>About</Link>
              <Link className='linkTag' to='/contact'>Contact</Link>
          </div>
          <div className='ecom__navbar-icons'>
            <Link className='linkTag' to='/login'><CgProfile size={25} /></Link>
            <Link className='linkTag' to='/search'><GoSearch  size={25}/></Link>
            <Link className='linkTag' to='/cart'><AiOutlineShoppingCart size={25} /></Link>
          </div>
        </div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
  )
}

export default Header