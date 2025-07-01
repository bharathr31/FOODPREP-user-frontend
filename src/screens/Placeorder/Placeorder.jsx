// src/user/screens/Placeorder/Placeorder.jsx

import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
import './Placeorder.css'

const Placeorder = () => {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: ''
  })

  const {
    getTotalCartAmount,
    food_list,
    cartItems,
    promo,     // coupon discount
    url,
    token
  } = useContext(Storecontext)
  const navigate = useNavigate()

  // Compute totals
  const subtotal      = getTotalCartAmount()
  const deliveryFee   = subtotal > 0 ? 20 : 0
  const totalAfterPromo = Math.max(subtotal - promo, 0)
  const grandTotal     = totalAfterPromo + deliveryFee

  // Redirect if not logged in or cart empty
  useEffect(() => {
    if (!token || subtotal === 0) {
      navigate('/cart')
    }
  }, [token, subtotal, navigate])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const orderItem = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }))

    const orderData = {
      address: data,
      items: orderItem,
      amount: grandTotal    // use discounted total
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        { headers: { token } }
      )
      window.location.replace(response.data.session_url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder="First name" name="first_name" value={data.first_name} onChange={onChangeHandler} />
          <input required type="text" placeholder="Last name"  name="last_name"  value={data.last_name}  onChange={onChangeHandler} />
        </div>
        <input required type="email" placeholder="Email Address" name="email" value={data.email} onChange={onChangeHandler} />
        <input required type="text"  placeholder="Street"        name="street" value={data.street} onChange={onChangeHandler} />
        <div className="multi-fields">
          <input required type="text" placeholder="City"  name="city"  value={data.city}  onChange={onChangeHandler} />
          <input required type="text" placeholder="State" name="state" value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder="Zip Code" name="zip_code" value={data.zip_code} onChange={onChangeHandler} />
          <input required type="text" placeholder="Country"  name="country"  value={data.country}  onChange={onChangeHandler} />
        </div>
        <input required type="text" placeholder="Phone" name="phone" value={data.phone} onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>₹{subtotal}</p>
          </div>
          <hr />
          {promo > 0 && (
            <>
              <div className="cart-total-details">
                <p>Coupon Discount</p>
                <p>- ₹{promo}</p>
              </div>
              <hr />
            </>
          )}
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{grandTotal}</p>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
