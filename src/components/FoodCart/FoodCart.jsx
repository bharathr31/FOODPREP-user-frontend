import React,{useEffect, useContext} from 'react';
import './FoodCart.css';
import { assets } from '../../assets/assets' 
import { Storecontext } from '../../context/Storecontext';
import { motion } from "framer-motion";


const FoodCart = ({id,name,price,description,image}) => {
  const{cartItems,setCartItems,addToCart,removeFromCart,url} = useContext(Storecontext);

  useEffect(()=>
  {
    console.log(cartItems)
  },[cartItems])

  return (
        <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="food-card"
    >
        <div className="food-item">
            <div className="food-item-image-container">
              <img src={`${url}/image/${image}`} alt="" className="food-item-image" />
              {
                !cartItems[id] ? <img onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" className="add" />
                :
                <div className="food-item-counter">
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItems[id]}</p>
                  <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""  />
                </div>
              }
            </div>
            <div className="food-item-info">
                <p className="food-item-name">{name}</p>
                <p className="food-item-desc">{description}</p>
                <div className="food-item-price-rating">
                    <p className="food-item-price">₹{price}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
            </div>
        </div>
        </motion.div>
  )
}

export default FoodCart