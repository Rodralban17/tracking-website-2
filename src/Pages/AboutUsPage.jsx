import {React} from 'react';
import AboutUsHero from '../Components/AboutUsHero';
import AboutDetail from '../Components/AboutDetail';
import WhyChooseUs from '../Components/WhyChooseUs';
import TeamSection from '../Components/TeamSection';
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
        <AboutDetail/>
        <WhyChooseUs/>
        <TeamSection/>
    </main>
   </div>
  );
}
export default AboutUsPage;