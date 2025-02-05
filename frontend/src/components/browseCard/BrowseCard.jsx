import React from 'react'
import './browseCard.css'


export default function BrowseCard({image,name,title,washroom,furnishing,description,price,securityDeposit,facing,landmark}) {
  return (
    <>
    <div className="browse-card-container">
        <div className="browse-card-outer">
            <div className="browse-card-inner">
                <div className="browse-card-image-container">
                    <div className="browse-card-photo">
                        <img src={image} alt="" className='browse-card-image' />
                    </div>
                    <div className="browse-card-owner">
                        <div className="browse-card-owner-name">
                            Owner:{name}
                        </div>
                    </div>
                    <div className="browse-card-member">Premium Member</div>
                </div>
                <div className="browse-card-info-container">
                    <h2 className='browse-card-heading'>{title}</h2>
                    <span className="browse-card-share"></span>
                    <span className="browse-card-like"></span>
                    <span className="browse-card-report"></span>
                    <div className="browse-card-info-icons">
                        <div className="browse-card-info-icon-list">
                            <div className="browse-card-info-icon-list-item furnishing">
                                <div className="browse-card-info-icon-list-item-label">
                                    Furnishing
                                </div>
                                <div className="browse-card-info-icon-list-item-value">
                                    {furnishing}
                                </div>
                            </div>
                            <div className="browse-card-info-icon-list-item bathroom">
                                <div className="browse-card-info-icon-list-item-label">
                                    Bathroom
                                </div>
                                <div className="browse-card-info-icon-list-item-value">
                                    {washroom}
                                </div>
                            </div>
                            <div className="browse-card-info-icon-list-item availability">
                                <div className="browse-card-info-icon-list-item-label">
                                    Availability
                                </div>
                                <div className="browse-card-info-icon-list-item-value">
                                    Immediately
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="browse-card-info-check">
                        <div className="browse-card-info-check-facing">{facing} facing</div>
                        <div className="browse-card-info-check-landmark">{landmark}</div>
                    </div>
                    <div className="browse-card-info-desc">
                        <div className="browse-card-info-desc-text">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="browse-card-estimate">
                <div className="browse-card-price">
                    <div className="browse-card-price-amount">
                        <span className="ruppes">₹</span>{price}
                    </div>
                    <div className="browse-card-security"><span className="ruppes">₹</span>{securityDeposit}</div>
                </div>
                <div className="browse-card-contact">
                    <span className="browse-card-contact-owner">Contact Owner</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
