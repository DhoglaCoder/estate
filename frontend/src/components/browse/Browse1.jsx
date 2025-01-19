import React,{useState,useEffect} from 'react'
import axios from "axios"
import './browse.css'
import BrowseCard from '../browseCard/BrowseCard'

export default function Browse1() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
      const fetchListings = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/listings/list");
          setListings(response.data.data);
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      };
  
      fetchListings();
    }, []);
    return (
     <>
     <div className="browse-container">
          <div className="browse-container-left" style={{marginLeft:"100px"}}>
              {listings.map((listing)=>(
                <BrowseCard name={listing.name} title={listing.title} price={listing.price} image={listing.images[1]} washroom={listing.washroom} availability={listing.title} furnishing={listing.furnishing} description={listing.description} securityDeposit={listing.securityDeposit} facing={listing.facing} landmark={listing.landmark}/>
              ))}
          </div>
     </div>
     </>
    )
}




