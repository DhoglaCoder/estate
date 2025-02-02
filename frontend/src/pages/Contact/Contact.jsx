import React,{useEffect} from 'react'
import Navbar1 from '../../components/Navbar/Navbar1'
import Footer from '../../components/Footer/Footer'
import ContactUs from '../../components/ContactUs/ContactUs'


export default function Contact() {
  useEffect(() => {
      document.title = 'Espace | Contact-Us';
    }, []);
  return (
    <>
    <Navbar1 />
    <ContactUs />
    <Footer/>
    </>
  )
}
