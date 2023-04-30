import React from 'react'
import './footer.css'
import {default as playstore} from '../../../images/playstore.png'
import {default as appstore} from '../../../images/Appstore.png'


const Footer = () => {
  return (
    <div className='ecom__footer'>
        <div className='ecom__footer-left'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download app for android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appstore} alt="" />
        </div>
        <div className='ecom__footer-middle'>
            <h1>MealForAll</h1>
            <p>High quality is our first priority</p>
            <p>Copyrights 2023 &copy; MealForAll</p>
        </div>
        <div className='ecom__footer-right'>
            <h4>Follow Us</h4>
            <a href="#">Facebook</a>
            <a href="#">Youtube</a>
            <a href="#">Instagram</a>


        </div>
    </div>
  )
}

export default Footer;