// src/user/screens/Cart/Cart.jsx

import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext'
import { assets } from '../../assets/assets'
import './Cart.css'

const Cart = () => {
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    promo,         // newly exposed
    applyPromo     // newly exposed
  } = useContext(Storecontext)

  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const items = food_list.filter((f) => cartItems[f._id] > 0)
  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal > 0 ? 20 : 0
  const totalAfterPromo = Math.max(subtotal - promo, 0)
  const grandTotal = totalAfterPromo + deliveryFee

  const handleApply = () => {
    applyPromo(code.trim())
  }

  return (
    <div className='cart'>
      <div className="cart-items-title">
        <p>Items</p><p>Title</p><p>Price</p><p>Quantity</p><p>Total</p><p>Modify</p>
      </div>
      <hr/>

      {items.map((food) => (
        <React.Fragment key={food._id}>
          <div className="cart-items-item">
            <img src={`${url}/image/${food.image}`} alt={food.name}/>
            <p>{food.name}</p>
            <p>₹{food.price}</p>
            <p>{cartItems[food._id]}</p>
            <p>₹{food.price * cartItems[food._id]}</p>
            <div className="food-item-counter cart-counter">
              <img
                src={assets.remove_icon_red}
                alt="remove"
                onClick={() => removeFromCart(food._id)}
              />
              <p>{cartItems[food._id]}</p>
              <img
                src={assets.add_icon_green}
                alt="add"
                onClick={() => addToCart(food._id)}
              />
            </div>
          </div>
          <hr/>
        </React.Fragment>
      ))}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <hr/>

          {promo > 0 && (
            <>
              <div className="cart-total-details">
                <p>Coupon Discount</p>
                <p>- ₹{promo}</p>
              </div>
              <hr/>
            </>
          )}

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr/>

          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{grandTotal}</p>
          </div>

          <button onClick={() => navigate("/placeorder")}>
            Proceed to Checkout
          </button>
        </div>

        <div className="cart-promocode">
          <p>If you have a PromoCode, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='enter promocode'
            />
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
