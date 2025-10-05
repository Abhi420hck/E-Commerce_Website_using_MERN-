import React from 'react'
import './navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" width={200} height={100}/>
        <img src={navProfile} alt="" className="nav-profile" width={200} height={100}/>
    </div>
  )
}

export default Navbar