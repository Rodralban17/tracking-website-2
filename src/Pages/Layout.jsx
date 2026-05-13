import  React, {useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
const Layout = () =>{
    return(          
        <div className='min-h-screen bg-gray-50'>
            <Navbar/>
        <Navbar/>
       <div className='content'>
        <Outlet/>
       </div>
       <div className='top-5'>
        <Footer/>
       </div>
     </div>
       
    )
}
export default Layout