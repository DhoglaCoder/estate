import React from 'react'
import './UserCard.css'

export default function UserCard({ 
    name, 
    title, 
    price, 
    image, 
    washroom, 
    room, 
    securityDeposit, 
    facing, 
    landmark, 
    description, 
    availability, 
    furnishing 
}) {
  return (
    <>
    <div className="user-ad-card">
            {/* Image Section */}
            <div className="user-ad-card__image">
                <img src={image} alt={title} loading="lazy" />
                <span className="user-ad-card__availability">{availability}</span>
            </div>

            {/* Details Section */}
            <div className="user-ad-card__details">
                <h2 className="user-ad-card__title">{title}</h2>
                <p className="user-ad-card__landmark">📍 {landmark}</p>
                <p className="user-ad-card__description">{description}</p>

                <div className="user-ad-card__specs">
                    <span>🏠 Rooms: {room}</span>
                    <span>🛁 Washrooms: {washroom}</span>
                    <span>🛋 Furnishing: {furnishing}</span>
                    <span>🌟 Facing: {facing}</span>
                </div>

                <div className="user-ad-card__pricing">
                    <span>💰 Rent: ₹{price}</span>
                    <span>🔒 Deposit: ₹{securityDeposit}</span>
                </div>
            </div>

            {/* User Section */}
            <div className="user-ad-card__user">
                <p>Posted by: <strong>{name}</strong></p>
            </div>
        </div>

    </>
  )
}
