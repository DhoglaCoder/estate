import React, { useRef } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser';
import img from '../../assets/contactPage.svg'
import { toast } from 'react-toastify';

export default function ContactUs() {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ab7vxbr', 'template_rt8pr28', form.current, {
        publicKey: '7lH2ulw4oAvmIlxxp',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Message Sent",{position: "top-center"})
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error(error,{position: "top-center"})
        }
      );
  };
  return (
    <>
    <div className="contact-container">
      {/* Left Image Section */}
      <div className="contact-image">
        <img
          src={img}
          alt="Contact Us"
        />
      </div>
      
      {/* Right Contact Form Section */}
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <form ref={form} onSubmit={sendEmail}>
          <div>
            <label>Name</label>
            <input type="text" name="user_name" required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="user_email" required />
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" required></textarea>
          </div>
          <div>
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
