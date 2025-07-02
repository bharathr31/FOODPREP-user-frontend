import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/Exploremenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import './Home.css'

const Home = () => {
  const [category, setcategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setcategory={setcategory} />
      <div className="home-controls">
        <input
          type="text"
          placeholder="Search dishes"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Name ↑</option>
          <option value="price">Price ↑</option>
        </select>
      </div>
      <FoodDisplay category={category} search={search} sortBy={sortBy} />
    </div>
  )
}

export default Home
