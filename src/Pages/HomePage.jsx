import {React} from 'react';
import Hero from '../Components/Hero';
import AboutUsSection from '../Components/AboutUs Section';
import StatisticsSection from '../Components/Counter';
import ServicesSlider from '../Components/WhatWeDo';
const HomePage = () => {
  return (
   <div>  
         <main className=" ">
        <section className=" bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center">
         <Hero/>
        </section>
        <AboutUsSection/>
        <StatisticsSection/>
        <ServicesSlider/>
      </main>    
    </div>
  );
}
export default HomePage;