import React,{useEffect} from 'react'
import Navbar1 from '../../components/Navbar/Navbar1'
import Footer from '../../components/Footer/Footer'
import ListInfo from '../../components/ListInfo/ListInfo'

export default function Ad() {
  useEffect(() => {
    document.title = 'Espace | Ad';
  }, []);
  return (
    <>
    <Navbar1/>
    <ListInfo/>
    <Footer/>
    </>
  )
}
