import React,{useState,useEffect} from 'react'
import axios from "axios"
import './browse.css'
import BrowseCard from '../browseCard/browseCard';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../config/config';

export default function Browse1() {
    const [showFilters, setShowFilters] = useState(false);
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFurnishing, setSelectedFurnishing] = useState([]);
    const [pincode, setPincode] = useState("");
    const uid = localStorage.getItem('uid');
    const navigate = useNavigate();
    

    useEffect(() => {
      const fetchListings = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/listings/list`);
          const filteredListings = response.data.data.filter(listing => listing.userId !== uid);
          setListings(filteredListings);
          setFilteredListings(filteredListings);
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      };
  
      fetchListings();
    }, [uid]);

    const handleCardClicker = (listing)=>{
      navigate('/ad');
      localStorage.setItem('selectedListingId', listing._id);
    }


    const handleFilterChange = () => {
      let filtered = listings;

      // Filter by category
      if (selectedCategories.length > 0) {
          filtered = filtered.filter((listing) => selectedCategories.includes(listing.category));
      }

      // Filter by furnishing type
      if (selectedFurnishing.length > 0) {
          filtered = filtered.filter((listing) => selectedFurnishing.includes(listing.furnishing));
      }


      // Filter by pincode
      if (pincode) {
          filtered = filtered.filter((listing) => listing.pincode && listing.pincode.toString().includes(pincode));
      }

      setFilteredListings(filtered);
  };

  useEffect(() => {
      handleFilterChange();
  }, [selectedCategories, selectedFurnishing, pincode]);

    return (
     <>
     {/* <div className="browse-container">
          <div className="browse-container-left" style={{marginLeft:"100px"}}>
            {listings.map((listing)=>(
              <div className="browse-contain-wrap" key={listing._id} onClick={()=> handleCardClicker(listing)} style={{cursor:'pointer'}}>
                <BrowseCard name={listing.name} title={listing.title} price={listing.price} image={listing.images[1]} washroom={listing.washroom} availability={listing.title} furnishing={listing.furnishing} description={listing.description} securityDeposit={listing.securityDeposit} facing={listing.facing} landmark={listing.landmark}/>
              </div>
            ))}
          </div>
     </div> */}
     <div className="browse-container">
                {/* Filter Sidebar */}
                <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
                <div className={`browse-filter-sidebar ${showFilters ? "show" : "hide"}`}>
                    <h3>Filters</h3>

                    {/* Category Filter */}
                    <div className="filter-section">
                        <h4>Category</h4>
                        {["rent-commercial", "rent-residential", "sell-commercial", "sell-residential"].map(
                            (category) => (
                                <label key={category} className="filter-label">
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={(e) => {
                                            const { value, checked } = e.target;
                                            setSelectedCategories((prev) =>
                                                checked ? [...prev, value] : prev.filter((item) => item !== value)
                                            );
                                        }}
                                    />
                                    {category}
                                </label>
                            )
                        )}
                    </div>

                    {/* Furnishing Filter */}
                    <div className="filter-section">
                        <h4>Furnishing</h4>
                        {["Unfurnished", "Semi-furnished", "Fully-furnished"].map((furnish) => (
                            <label key={furnish} className="filter-label">
                                <input
                                    type="checkbox"
                                    value={furnish}
                                    checked={selectedFurnishing.includes(furnish)}
                                    onChange={(e) => {
                                        const { value, checked } = e.target;
                                        setSelectedFurnishing((prev) =>
                                            checked ? [...prev, value] : prev.filter((item) => item !== value)
                                        );
                                    }}
                                />
                                {furnish}
                            </label>
                        ))}
                    </div>
                    

                    {/* Pincode Filter */}
                    <div className="filter-section">
                        <h4>Pincode</h4>
                        <input
                            type="text"
                            className="pincode-input"
                            placeholder="Enter Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                </div>

                {/* Listings Section */}
                <div className="browse-container-left">
                    {filteredListings.map((listing) => (
                        <div
                            className="browse-contain-wrap"
                            key={listing._id}
                            onClick={() => handleCardClicker(listing)}
                            style={{ cursor: "pointer" }}
                        >
                            <BrowseCard
                                name={listing.name}
                                title={listing.title}
                                price={listing.price}
                                image={listing.images[0]}
                                washroom={listing.washroom}
                                availability={listing.title}
                                furnishing={listing.furnishing}
                                description={listing.description}
                                securityDeposit={listing.securityDeposit}
                                facing={listing.facing}
                                landmark={listing.landmark}
                            />
                        </div>
                    ))}
                </div>
            </div>
     </>
    )
}




