import React,{useEffect} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar1 from '../../components/Navbar/Navbar1'
import Browse1 from '../../components/browse/Browse1'


export default function Properties() {
  useEffect(() => {
      document.title = 'Espace | Explore Properties';
    }, []);
  return (
    <>
    <Navbar1/>
    <Browse1/>
    <Footer/>
    </>
  )
}
