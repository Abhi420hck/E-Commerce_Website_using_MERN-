import React, {useState,useEffect} from 'react'
import './popular.css'
import { Item } from '../Items/Item'
export const Popular = () => {
  const [Popular,setPopular] = useState([]);
  
    useEffect( ()=>{
       fetch(process.env.REACT_APP_BACKEND_URL + '/popularinwomen')
      .then((response)=> response.json())
      .then((data)=>setPopular(data));
    },[])
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {Popular.map((item,i)=>{
                return  <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
