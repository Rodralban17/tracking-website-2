import React from "react";
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
// import ServicesPage from "./Pages/ServicesPage";
// import AboutUsPage from "./Pages/AboutUsPage";
// import ContactUsPage from "./Pages/ContactUsPage";
const App = () =>{
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <HomePage/>,
        },
        // {
        //   path: "/our-services",
        //   element: <ServicesPage/>,
        // },
        // {
        //   path: "/about-us",
        //   element: <AboutUsPage/>,
        // },
        // {
        //   path: "/contact-us",
        //   element: <ContactUsPage/>,
        // }
      ]
    },
  ])
  return (
    <RouterProvider router={router}/>
  );
}
export default App;