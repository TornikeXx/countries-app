import ContactForm from "../components/Contact-form/Contact-form";
import ContactInfo from "../components/Contact-info/Contact-info";
import Contact from "../components/Contact/Contact";
import Otp from "../components/Otp/Otp";
const ContactPageView = () => {
  return (
    <div>
      <Contact>
        <ContactInfo />
        <ContactForm />
      </Contact>
      <Otp length={3} />
    </div>
  );
};

export default ContactPageView;
