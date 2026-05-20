import {React} from 'react';
import ContactSection from '../Components/ContatctSection.jsx';
import ContactForm from '../Components/ContatctForm.jsx';
const ContactUsPage = () => {

  return (
   <div>
    <main className=" ">
        <section className=" ">
        <ContactSection />
        </section>
        <ContactForm />
    </main>
   </div>
    );
}
export default ContactUsPage;