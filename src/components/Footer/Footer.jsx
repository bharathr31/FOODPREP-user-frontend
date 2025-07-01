import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <img className='logo' src={assets.logo_bottom} alt="" />
                <p> Crafted with passion to bring delicious meals to your doorstep.
                Built with ❤️ using the MERN Stack. Your satisfaction is our top priority — fresh, fast, and flavorful.
                Thank you for choosing FoodPrep — where every bite counts!</p>
                  <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
          
            <div className="footer-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Courses</li>
                    <li>Reviews</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91 9392022657</li>
                    <li>bharath.rajupeta@gmail.com</li>
                </ul>
            </div>
        </div>
    <hr />
    <p> © 2025 FoodPrep. All rights reserved.</p>
    </div>
  )
}

export default Footer