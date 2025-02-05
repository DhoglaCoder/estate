    import React, { useState, useEffect,useRef } from 'react';
    import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
    import { db } from '../Firebase/firebase';
    import { getAuth } from "firebase/auth";
    import { collection, query, where, getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import Modal from 'react-modal'
    import './ListInfo.css';
    import backendUrl from '../config/config';
    const mapContainerStyle = {
        width: "100%",
        height: "400px",
    };


    export default function ListInfo() {
        const [listing, setListing] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const navigate = useNavigate();

        const featureImages = {
            wifi:{
                src:'/images/wifi-icon.png',
                label:'Wi-fi'
            },
            rainWater:{
                src:'/images/rain-water-harvesting.png',
                label:'Rain Water'
            },
            Library:{
                src:'/images/library-icon.png',
                label:'Library'
            },
            gatedCommunity:{
                src:'/images/gated-icon.png',
                label:'Gated Community'
            },
            swimmingPool:{
                src:'/images/swimmingpool-icon.png',
                label:'Swimming Pool'
            },
            gymnasium:{
                src:'/images/gym-icon.png',
                label:'Gymnasium'
            },
            cctv:{
                src:'/images/cctv-icon.png',
                label:'CCTV'
            },
            security:{
                src:'/images/security-icon.png',
                label:'Security'
            },
            powerBackUp:{
                src:'/images/power.png',
                label:'Power BackUp'
            },
            hasParking:{
                src:'/images/parking-icon.png',
                label:'Parking'
            },
            vastu:{
                src:'/images/holy.png',
                label:'Vastu'
            },
            salon:{
                src:'/images/salon-icon.png',
                label:'Salon'
            },
            childrenPlay:{
                src:'/images/children-park.png',
                label:'Children PlayArea'
            }
            
        }


        const handleContact = async () => {
            const loggedInUserId = localStorage.getItem("uid"); // Retrieve the logged-in user UID directly from localStorage
    if (!loggedInUserId || !listing?.userId) {
        console.error("User or Owner ID is missing!");
        return;
    }

    const ownerId = listing.userId;
    const chatId = loggedInUserId < ownerId ? `${loggedInUserId}_${ownerId}` : `${ownerId}_${loggedInUserId}`;
    const chatRef = doc(db, "chats", chatId);

    try {
        const chatSnapshot = await getDoc(chatRef);
        if (!chatSnapshot.exists()) {
            const loggedInUserRef = doc(db, "Users", loggedInUserId);
            const ownerUserRef = doc(db, "Users", ownerId);

            const [loggedInUserSnap, ownerUserSnap] = await Promise.all([
                getDoc(loggedInUserRef),
                getDoc(ownerUserRef),
            ]);

            if (!loggedInUserSnap.exists() || !ownerUserSnap.exists()) {
                console.error("User data not found!");
                return;
            }

            const loggedInUserName = loggedInUserSnap.data().name;
            const ownerUserName = ownerUserSnap.data().name;

            // Create chat with user names
            await setDoc(chatRef, {
                chatId,
                users: [
                    { id: loggedInUserId, name: loggedInUserName },
                    { id: ownerId, name: ownerUserName }
                ],
                lastMessage: { text: "", timestamp: null },
                timestamp: serverTimestamp(),
            });
        }
        navigate('/chat');
    } catch (error) {
        console.error("Error creating chat:", error);
    }
          };

        useEffect(() => {
            // Get the selected listing _id from localStorage
            const selectedListingId = localStorage.getItem('selectedListingId');
            
            if (!selectedListingId) {
                // If no _id found, redirect to some fallback page or show error
                navigate('/');
                return;
            }

            // Fetch the listing data using the _id
            const fetchListingData = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/api/listings/card/${selectedListingId}`);
                    setListing(response.data.data);  // Save the listing data
                } catch (error) {
                    console.error("Error fetching listing:", error);
                    // Handle error (e.g., navigate to an error page)
                }
            };

            fetchListingData();
        }, [navigate]);
        
        const { isLoaded, loadError } = useLoadScript({
            googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        });

        if (loadError) return <p>Error loading maps</p>;
        if (!isLoaded) return <p>Loading Maps...</p>;

        const defaultCenter = { lat: 18.455, lng: 79.48 };
        const markerPosition = listing?.location
            ? { lat: listing.location.lat, lng: listing.location.lng }
            : defaultCenter;

        

        if (!listing) {
            return <p>Loading...</p>;  // Show a loading message while fetching the listing data
        }

        return (
            <>
            <div className="lastinfo">
                <div className="listinfo-container">
                    <div className="listinfo-left">
                        <section className="listinfo-upper-section">
                            <div className="listinfo-upper-row1">
                                <div className="listinfo-upper-price">
                                    <span className="rupees">₹</span>{listing.price}
                                </div>
                                <div className="list-info-seeother">
                                    See other charges
                                    <span className="list-info-see-button">{/* enter your code when clicked later */}</span>
                                </div>
                                {/* <div className="list-info-aiprop">
                                    <span className="list-info-airprop1">Calculate property value using AI</span>
                                </div> */}
                            </div>
                                <div className="listinfo-title">
                                    <div className="listinfo-title-text">
                                        <span className="listinfo-title-text1">{listing.title}  {listing.area}</span>
                                    </div>
                                </div>
                                <div className="listinfo-upper-grid">
                                    <div className="listinfo-upper-photo-grid">
                                        <div className="listinfo-upper-photo-outer">
                                            <img className='listinfo-upper-photo-outer-image' src={listing.images[0]} alt="photo" />
                                        </div>
                                        <button className="view-all-images-btn" onClick={() => setIsModalOpen(true)}>
                                            View All Images
                                        </button>
                                    </div>
                                    <div className="listinfo-upper-body">
                                        <ul className="listinfo-upper-body-summary">
                                            <li className="listinfo-upper-body-summary-ele listinfo-upper-bed">
                                                <span className="listinfo-upper-body-bedroom">{listing.room}</span>Beds
                                            </li>
                                            <li className="listinfo-upper-body-summary-ele listinfo-upper-bath">
                                                <span className="listinfo-upper-body-bedroom">{listing.washroom}</span>Baths
                                            </li>
                                            <li className="listinfo-upper-body-summary-ele listinfo-upper-furnish">
                                                <span className="listinfo-upper-body-bedroom"></span>{listing.furnishing}
                                            </li>
                                        </ul>
                                        <ul className="listinfo-upper-body-detail">
                                            <li className="listinfo-upper-body-detail-item">
                                                <div className="listinfo-upper-body-detail-label">Floor</div>
                                                <div className="listinfo-upper-body-detail-value">{listing.floor}</div>
                                            </li>
                                            <li className="listinfo-upper-body-detail-item">
                                                <div className="listinfo-upper-body-detail-label">Facing</div>
                                                <div className="listinfo-upper-body-detail-value">{listing.facing}</div>
                                            </li>
                                            <li className="listinfo-upper-body-detail-item">
                                                <div className="listinfo-upper-body-detail-label">Status</div>
                                                <div className="listinfo-upper-body-detail-value">Immediately</div>
                                            </li>
                                            <li className="listinfo-upper-body-detail-item">
                                                <div className="listinfo-upper-body-detail-label">Furnished status</div>
                                                <div className="listinfo-upper-body-detail-value">{listing.furnishing}</div>
                                            </li>
                                            <li className="listinfo-upper-body-detail-item">
                                                <div className="listinfo-upper-body-detail-label">Age of Construction</div>
                                                <div className="listinfo-upper-body-detail-value">{listing.age} years</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                        </section>
                        <section className="listinfo-lower-section">
                            <div className="listinfo-lower-title">
                                <div className="listinfo-lower-title-text">More Details</div>
                            </div>
                            <div className="listinfo-lower-detail">
                                <ul className="listinfo-lower-detail-list">
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Rental value</div>
                                        <div className="listinfo-detail-list-item-value">
                                            <span className="rupees">₹</span>{listing.price}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Security Deposit</div>
                                        <div className="listinfo-detail-list-item-value">
                                            <span className="rupees">₹</span>{listing.securityDeposit}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Address</div>
                                        <div className="listinfo-detail-list-item-value">
                                            {listing.address}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Landmark</div>
                                        <div className="listinfo-detail-list-item-value">
                                            {listing.landmark}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Area</div>
                                        <div className="listinfo-detail-list-item-value">
                                            {listing.area}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Pincode</div>
                                        <div className="listinfo-detail-list-item-value">
                                            {listing.pincode}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Furnishing</div>
                                        <div className="listinfo-detail-list-item-value">
                                            {listing.furnishing}
                                        </div>
                                    </li>
                                    <li className="listinfo-lower-detail-list-item">
                                        <div className="listinfo-detail-list-item-label">Age of Construction</div>
                                        <div className="listinfo-detail-list-item-value">
                                            {listing.age} years
                                        </div>
                                    </li>
                                </ul>
                                <div className="listinfo-lower-detail-description">
                                    <span className="listinfo-lower-detail-description-label">Description:</span>
                                    <span className="listinfo-lower-detail-description-detail">
                                        <p>{listing.description}</p>
                                    </span>
                                </div>
                            </div>
                        </section>
                        <section className="listinfo-lower-section">
                            <div className="listinfo-features-container">
                                <h2>Available Features</h2>
                                <div className="listinfo-features-grid">
                                {listing?.features ? (
                Object.entries(listing.features)
                    .filter(([key, value]) => value)  // Only show features that are true
                    .map(([key]) => (
                        <div key={key} className="feature-item">
                            <img src={featureImages[key]?.src} alt={featureImages[key]?.label} className="feature-image" />
                            <span>{featureImages[key]?.label}</span>
                        </div>
                    ))
            ) : (
                <p>No features available.</p>  // Fallback text if there are no features
            )}
                                </div>
                            </div>
                        </section>
                        <section className="listinfo-lower-section">
                            <div className="listinfo-map-container">
                                <h3>Property Location</h3>
                                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={markerPosition}>
                                    <Marker position={markerPosition} />
                                </GoogleMap>
                            </div>
                        </section>
                    </div>
                    <div className="listinfo-right">
                        <section className="listinfo-right-contact">
                            <div className="listinfo-right-contact-box">
                                <div className="listinfo-right-contact-title">
                                    <div className="listinfo-right-title-line">Contact Owner</div>
                                </div>
                                <div className="listinfo-right-header">
                                    <div className='listinfo-right-header-info'>
                                        <span className="listinfo-right-name">{listing.name}</span>
                                        <span className="listinfo-right-mobile">+91-XXXXXXXXXX</span>
                                    </div>
                                </div>
                                <button className="listinfo-right-contact" onClick={handleContact}>Contact</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="image-modal" overlayClassName="overlay">
                <button className="close-modal" onClick={() => setIsModalOpen(false)}>✖ Close</button>
                <div className="image-grid">
                    {listing.images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} className="modal-image" />
                    ))}
                </div>
            </Modal>
            </>
        );
    }
