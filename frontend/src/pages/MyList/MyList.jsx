import React,{useEffect} from 'react'
import Navbar1 from '../../components/Navbar/Navbar1'
import Footer from '../../components/Footer/Footer'
import Delete from '../../components/Delete/Delete'

export default function MyList() {
  useEffect(() => {
    document.title = 'Espace-Your Listing';
  }, []);
  return (
    <>
    <Navbar1/>
    <Delete/>
    <Footer/>
    </>
  )
}
