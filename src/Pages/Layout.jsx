import  React, {useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingActionContact from '../Components/FloatingActionContact';
import ScrollToTop from '../Components/ScrollToTop';
import ProtectedRoute from '../lib/ProtectedRoute.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
const Layout = () =>{
    return(          
        <div className='min-h-screen bg-gray-50'>
            <ScrollToTop/>
            <Navbar/>
       <div className='content'>
        <Outlet/>
       </div>
       <div className='top-5'>
        <Footer/>
       </div>
       <FloatingActionContact/>
     </div>
       
    )
}
const RequireAuth = () =>{
    const {currentUser}=useContext(AuthContext)
    return !currentUser ? (
        <Navigate to='/login'/>
            ):(
            <ProtectedRoute>
            <div>
                <div className='min-h-screen bg-gray-50'>
                <ScrollToTop/>
                <Navbar/>
            <div className='content'>
                <Outlet/>
                </div>
            <div className='top-5'>
                <Footer/>
                </div>
                </div>
            </div>
            </ProtectedRoute>
            )
}

export {Layout, RequireAuth}