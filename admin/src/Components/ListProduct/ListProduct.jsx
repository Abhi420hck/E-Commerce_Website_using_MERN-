import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import remove_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
    const [allproducts,setallproducts] = useState([]);

    const fetchInfo = async() => {
        await fetch('https://e-commerce-website-using-mern-lwej.onrender.com/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setallproducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async(id) =>{
        await fetch('https://e-commerce-website-using-mern-lwej.onrender.com/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }
  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
            <hr />
            {allproducts.map((product,index)=>{
                return <>
                <div className="listproduct-format-main listproduct-format" >
                    <img src={product.image} alt="" className="listproduct-icon" />
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={()=>{remove_product(product.id)}} src={remove_icon} alt="" className="listproduct-remove-icon" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct