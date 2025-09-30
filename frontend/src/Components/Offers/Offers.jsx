import React from 'react'
import './offers.css'
import exclusive_image from '../Assets/Images/exclusive_image.png'
export const Offers = () => {
  return (

    <div className='offers'>

        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offer For You</h1>
            <p>ONLY FOR BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>

        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}
