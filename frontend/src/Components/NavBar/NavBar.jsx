import React, { useState } from 'react'
import './NavBar.css';
import logo from '../Assets/Images/logo.png';
import cart_icon from '../Assets/Images/cart_icon.png';
import { Link, Links } from 'react-router-dom';
export const NavBar = () => {
    const [menu,setMenu] = useState("shop");
  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="nav-logo" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="cart_icon" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}
