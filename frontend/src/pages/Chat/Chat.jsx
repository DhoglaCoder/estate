import React,{useEffect} from 'react'
import Navbar1 from '../../components/Navbar/Navbar1'
import Footer from '../../components/Footer/Footer'
import ChatsComp from '../../components/chats/ChatsComp'

export default function Chat() {
  useEffect(() => {
        document.title = 'Espace | Chat-Page';
      }, []);
  return (
    <>
    <Navbar1/>
    <ChatsComp/>
    <Footer/>
    </>
  )
}
