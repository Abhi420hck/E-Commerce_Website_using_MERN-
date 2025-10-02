import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { CartItems } from '../Components/CartItems/CartItems';
export const Cart = () => {
  const cartItems = useContext(ShopContext);
  return (
    <div>
        <CartItems/>
    </div>
  )
}
