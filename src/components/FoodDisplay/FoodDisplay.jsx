import React, { useContext, useMemo } from 'react'
import { Storecontext } from '../../context/Storecontext'
import FoodCart from '../FoodCart/FoodCart'
import './FoodDisplay.css'

const FoodDisplay = ({ category, search = '', sortBy = 'name' }) => {
  const { food_list } = useContext(Storecontext)

  const filtered = useMemo(() => {
    return food_list
      .filter(item =>
        (category === 'All' || item.category === category) &&
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .sort((a, b) =>
        sortBy === 'price'
          ? a.price - b.price
          : a.name.localeCompare(b.name)
      )
  }, [food_list, category, search, sortBy])

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {filtered.map(item => (
          <FoodCart
            key={item._id}
            id={item._id}
            price={item.price}
            image={item.image}
            description={item.description}
            name={item.name}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
