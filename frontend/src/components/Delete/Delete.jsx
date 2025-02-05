import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Delete.css'
import BrowseCard from '../browseCard/browseCard'
import UserCard from '../UserCard/UserCard'
import { toast } from 'react-toastify'
import backendUrl from '../config/config'

export default function Delete() {
    const[listings,setListings] = useState([]);
    const uid = localStorage.getItem('uid');
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchListings = async()=>{
            try {
                const response = await axios.get(`${backendUrl}/api/listings/list`);
                const filteredListings = response.data.data.filter(listing => listing.userId === uid);
                setListings(filteredListings);
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        }
        fetchListings();
    },[uid])
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/listings/delete/${id}`);
            // Remove deleted listing from state
            setListings(listings.filter(listing => listing._id !== id));
            toast.success("Listing deleted successfully",{position: "top-center"})
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast.error(error.message,{position: "top-center"})
        }
    };
    const handleUpdate = (listingId) => {
        // Redirect to the update page (assuming an update page exists)
       
    };
    const handleCardClicker = (listing)=>{
        localStorage.setItem('selectedListingId', listing._id);
        navigate('/ad');
    };
  return (
    <>
        <div className="delete-container">
              <div className="delete-container-left">
                  {listings.map((listing)=>(
                    <div className="user-card-wrapper" key={listing._id} onClick={() => handleCardClicker(listing)} style={{ cursor: 'pointer' }}>
                    <UserCard
                        name={listing.name}
                        title={listing.title}
                        price={listing.price}
                        image={listing.images[0]}
                        washroom={listing.washroom}
                        availability={listing.availability}
                        furnishing={listing.furnishing}
                        description={listing.description}
                        securityDeposit={listing.securityDeposit}   
                        facing={listing.facing}
                        landmark={listing.landmark}
                    />
                    <div className="card-actions">
                        <button className="btn-delete" onClick={() => handleDelete(listing._id)}>
                            Delete
                        </button>
                        {/* <button className="btn-update" onClick={() => handleUpdate(listing._id)}>
                            Update
                        </button> */}
                    </div>
                    </div>
                  ))}
              </div>
         </div>
         <div className="add-list-info-button-div">
            <button className="add-list-images-btn" onClick={() => navigate('/addList')}>Add + </button>
         </div>
    </>
  )
}
