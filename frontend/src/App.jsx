import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import Signup from './pages/signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Properties from './pages/properties/properties'
import AddList from './pages/AddList/AddList'
import MyList from './pages/MyList/MyList'
import Ad from './pages/Ad/Ad'
import Chat from './pages/chat/Chat'
import Contact from './pages/Contact/Contact'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/addList' element={<AddList/>}/>
        <Route path='/my-listing' element={<MyList/>}/>
        <Route path='/ad' element={<Ad/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
