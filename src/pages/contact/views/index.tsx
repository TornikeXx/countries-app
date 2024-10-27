import ContactForm from "../components/Contact-form/Contact-form";
import ContactInfo from "../components/Contact-info/Contact-info";
import Contact from "../components/Contact/Contact";
const ContactPageView = () => {
  return (
    <Contact>
      <ContactInfo />
      <ContactForm />
    </Contact>
  );
};

export default ContactPageView;
