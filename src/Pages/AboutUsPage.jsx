import {React} from 'react';
import AboutUsHero from '../Components/AboutUsHero';
// import IdentitySection from '../Components/IdentitySection';
// import StatsCounter from '../Components/StatsCounter';
// import MissionSection from '../Components/MissionSection';
// import FAQSection from '../Components/FAQSection';
const AboutUsPage = () => {
  return (
   <div>
    <main className=" ">
        <section className=" ">
        <AboutUsHero/>
        </section>
        {/* <IdentitySection/>
        <StatsCounter/>
        <MissionSection/>
        <FAQSection/> */}
    </main>
   </div>
  );
}
export default AboutUsPage;