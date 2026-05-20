import  React, {useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingActionContact from '../Components/FloatingActionContact';
import ScrollToTop from '../Components/ScrollToTop';
import ProtectedRoute from '../lib/ProtectedRoute.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
const Layout = () =>{
       useEffect(() => {
    // 1. On nettoie l'ancien script Chatway s'il existe encore
    const oldScript = document.getElementById('chatway-script');
    if (oldScript) oldScript.remove();

    // 2. Configuration de Chaport
    window.chaportConfig = {
      appId: '6a0c37096253d938a769b1e1'
    };

    // 3. Vérification pour éviter de charger Chaport plusieurs fois
    if (!document.getElementById('chaport-script')) {
      (function(w, d, v3) {
        if (w.chaport) return;
        v3 = w.chaport = {};
        v3._q = [];
        v3._l = {};
        v3.q = function() { v3._q.push(arguments); };
        v3.on = function(e, fn) {
          if (!v3._l[e]) v3._l[e] = [];
          v3._l[e].push(fn);
        };
        
        var s = d.createElement('script');
        s.id = 'chaport-script'; // On ajoute un ID pour le contrôle
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://app.chaport.com/javascripts/insert.js';
        var ss = d.getElementsByTagName('script')[0];
        ss.parentNode.insertBefore(s, ss);
      })(window, document);
    }
  }, []);
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