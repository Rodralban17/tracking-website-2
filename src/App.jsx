import React from "react";
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import AirFreightPage from "./Pages/AirFreight";
import AboutUsPage from "./Pages/AboutUsPage";
import TrackingPage from "./Pages/TrackingPage";
import SeaFreightPage from "./Pages/OceanFreight";
import RoadFreightPage from "./Pages/RoadFreight";
import TrainFreightPage from "./Pages/TrainFreight";
import SmartWarehousingPage from "./Pages/SmartWarehousing";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
// import ServicesPage from "./Pages/ServicesPage";
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
        {
          path: "/track-package",
          element: <TrackingPage/>,
        },
        {
          path: "/about-us",
          element: <AboutUsPage/>,
        },
        {
          path: "/services/air-freight",
          element: <AirFreightPage/>,
        },
        {
          path: "/services/sea-freight",
          element: <SeaFreightPage/>,
        },
        {
          path: "/services/road-freight",
          element: <RoadFreightPage/>,
        },
        {
          path: "/services/train-freight",
          element: <TrainFreightPage/>,
        },
        {
          path: "/services/smart-warehousing",
          element: <SmartWarehousingPage/>,
        },
        {
          path: "/login",
          element: <LoginPage/>,
        },
        {
          path: "/register",
          element: <RegisterPage/>,
        },
        // {
        //   path: "/services",
        //   element: <ServicesPage/>,
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