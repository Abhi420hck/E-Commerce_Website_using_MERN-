import React from 'react'
import './admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Addproduct from '../../Components/AddProduct/Addproduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import {Routes,Route} from "react-router-dom"
const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<Addproduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
        </Routes>
    </div>
  )
}

export default Admin