import React from 'react'
import './Exploremenu.css'
import {menu_list} from '../../assets/assets'
const Exploremenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <div className='explore-menu-text'>Order from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
        Our mission is to satisfy ur cravings and elevate your dining experience, One delicious meal at a time</div>
        <div className="explore-menu-list">
          {menu_list.map((item,index)=>{
            return(
                <div onClick={()=> setcategory(category=>category===item.menu_name?'All':item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                </div>
            )
          } )}
        </div>
    </div>
  )
}

export default Exploremenu