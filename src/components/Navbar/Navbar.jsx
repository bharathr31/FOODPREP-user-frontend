import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';
import { useTheme } from '../../hooks/useTheme';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ showLogin, setshowLogin }) => {
  const [menu, setmenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(Storecontext);
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to="/" onClick={() => setmenu("home")}>
        <img className='logo' src={assets.logo} alt="logo" />
      </Link>

      <ul className='navbar-menu'>
        <Link to="/" onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu">
          <li onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
        </a>
        <a href="#footer">
          <li onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setshowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <Link to="/myorders">
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </Link>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}


        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
          className="theme-toggle-btn"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;