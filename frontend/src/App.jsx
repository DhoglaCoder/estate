import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Signup from './pages/signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Properties from './pages/properties/properties';
import AddList from './pages/AddList/AddList';
import MyList from './pages/MyList/MyList';
import Ad from './pages/Ad/Ad';
import Chat from './pages/chat/Chat';
import Contact from './pages/Contact/Contact';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token'); // Checking token in local storage
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addList"
          element={
            <ProtectedRoute>
              <AddList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-listing"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ad"
          element={
            <ProtectedRoute>
              <Ad />
            </ProtectedRoute>
          }
        />
        <Route path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
