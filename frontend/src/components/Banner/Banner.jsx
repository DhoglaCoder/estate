import React from 'react'
import './Banner.css'
import { useNavigate } from 'react-router-dom'
import bannerimg from '../../assets/background1.jpg'

export default function Banner() {
  const navigate = useNavigate();
  return (
    <>
    <div className="hero-banner">
        <img className='banner-img' src={bannerimg} alt="" />
        <div className="banner-overlay"></div>
      <div className="banner-content">
        <h1 className="banner-title">
          Properties to buy in <strong>Hyderabad</strong>
        </h1>
        <p className="banner-subtitle">
          <span className="subtitleBold">8K+</span> listings added daily and
          <span className="subtitleBold"> 96K+</span> total verified
        </p>
        <button className="banner-btn"onClick={() => navigate("/properties")}>Explore Properties</button>
      </div>
    </div>
    </>
  )
}
