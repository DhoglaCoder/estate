import React,{useEffect} from 'react'
import Banner from '../../components/Banner/Banner'
import Navbar from '../../components/Navbar/Navbar'
import Options from '../../components/Options/Options'
import Footer from '../../components/Footer/Footer'


export default function Home() {
  useEffect(() => {
      document.title = 'Espace | Buy or Rent Property';
    }, []);
  return (
    <>
        <Navbar/>
        <Banner/>
        <Options/>
        <Footer/>
    </>
  )
}
