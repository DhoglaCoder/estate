import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import Signup from './pages/signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Properties from './pages/properties/properties'
import Map from './components/Map/Map'
import AddList from './pages/AddList/AddList'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/addList' element={<AddList/>}/>
        {/* <Route path='/map' element={<Map/>}/> */}
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
