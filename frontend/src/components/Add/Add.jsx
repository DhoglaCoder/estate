import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import image from "../../assets/uploadImage.png";
import "./Add.css";
import backendUrl from "../config/config";

export default function Add() {
  const [imageInputs, setImageInputs] = useState([]);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 17.455675, 
    lng: 78.488745,
  });
  const [checkboxValues, setCheckboxValues] = useState({
    hasParking: false,
    powerBackUp: false,
    gymnasium:false,
    vastu:false,
    security:false,
    childrenPlay:false,
    salon:false,
    cctv:false,
    swimmingPool:false,
    gatedCommunity:false,
    library:false,
    rainWater:false,
    wifi:false
  });

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phoneno: "",
    price: "",
    securityDeposit: "",
    room: "",
    washroom: "",
    floor:"",
    age:"",
    category: "",
    furnishing: "",
    facing:"",
    features: {},
    address: "",
    area:"",
    landmark:"",
    pincode:"",
    description: "",
    images: [],
    location: {
        lat: 17.455675,
        lng: 78.488745
    },
});

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
        [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
  setCheckboxValues((prev) => ({
    ...prev,
    [name]: checked,
  }));
  setFormData((prev) => ({
    ...prev,
    features: {
      ...prev.features,
      [name]: checked,
    },
  }));
};
const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages[index] = files[0];
      return { ...prev, images: newImages };
    });
  };
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("uid");
        const dataToLog = { ...formData, userId };
        console.log("Form Data with UID:", dataToLog);
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "images") {
                formData.images.forEach((file) => data.append("images", file));
            } else if (key === "features") {
                data.append(key, JSON.stringify(formData[key]));
            } else if (key === "location") {
                data.append("location[lat]", formData.location.lat);
                data.append("location[lng]", formData.location.lng);
            } else {
                data.append(key, formData[key]);
            }
        });
        data.append("userId", userId);
        console.log("Form Data:", formData);
        try {
            const response = await axios.post(`${backendUrl}/api/listings/add`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Listing added successfully",{
                       position: "top-center"
                   })
        } catch (error) {
            console.error(error);
            toast.error(error.message,{
                 position:"top-center",
        })
        }
    };

  const addImageInput = () => {
    setImageInputs([...imageInputs, imageInputs.length + 1]);
  };

  const removeImageInput = (index) => {
    setImageInputs(imageInputs.filter((_, idx) => idx !== index));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update latitude or longitude and move marker
    setMarkerPosition((prev) => {
      const updatedPosition = {
        ...prev,
        [name]: parseFloat(value),
      };

      // Move marker on map
      if (markerRef.current && !isNaN(updatedPosition.lat) && !isNaN(updatedPosition.lng)) {
        const newLatLng = new window.google.maps.LatLng(updatedPosition.lat, updatedPosition.lng);
        markerRef.current.setPosition(newLatLng);
        mapRef.current.setCenter(newLatLng);
      }

      return updatedPosition;
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: markerPosition,
        zoom: 12,
      });
      mapRef.current = map;

      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map,
        draggable: true,
      });
      markerRef.current = marker;

      marker.addListener("dragend", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
        setFormData((prev) => ({
            ...prev,
            location: { lat, lng },
          }));
      });

      marker.addListener("dragend", (event) => {
        map.setCenter(event.latLng);
      });
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <>
      <center>
        <h2 style={{ margin: "20px" }}>Add Your Listing</h2>
      </center>
      <div className="addlist-container">
        <div className="addlist-add">
          <form onSubmit={onSubmitHandler} className="flex-col add-form">
            <div className="add-product-name flex-col">
              <p>Name of Owner</p>
              <input onChange={onChangeHandler} type="text" name="name" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Title of Listing</p>
              <input onChange={onChangeHandler} type="text" name="title" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Phone Number</p>
              <input onChange={onChangeHandler} type="text" name="phoneno" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Price</p>
              <input onChange={onChangeHandler} type="text" name="price" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Security Deposit</p>
              <input onChange={onChangeHandler} type="text" name="securityDeposit" required />
            </div>
            <div className="add-product-name flex-col">
              <p>No of Rooms</p>
              <input onChange={onChangeHandler} type="text" name="room" required />
            </div>
            <div className="add-product-name flex-col">
              <p>No of Washrooms</p>
              <input onChange={onChangeHandler} type="text" name="washroom" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Floor</p>
              <input onChange={onChangeHandler} type="text" name="floor" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Age of Construction</p>
              <input onChange={onChangeHandler} type="text" name="age" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Category</p>
              <select onChange={onChangeHandler} name="category" required>
                <option value="">Select Category</option>
                <option value="rent-commercial">Rent - Commercial</option>
                <option value="rent-residential">Rent - Residential</option>
                <option value="sell-commercial">Sell - Commercial</option>
                <option value="sell-residential">Sell - Residential</option>
                </select>
            </div>
            <div className="add-product-name flex-col">
              <p>Furnishing</p>
              <select onChange={onChangeHandler} name="furnishing" required>
                <option value="">Select Category</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-furnished">Semi-furnished</option>
                <option value="Fully-furnished">Fully-furnished</option>
                </select>
            </div>
            <div className="add-product-name flex-col">
              <p>Facing</p>
              <input onChange={onChangeHandler} type="text" name="facing" required />
            </div>
            <div className="checkbox-group">
              <p>Features:</p>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="childrenPlay" checked={checkboxValues.childrenPlay} onChange={handleCheckboxChange}/>
                  Children's Play Area
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="salon" checked={checkboxValues.salon} onChange={handleCheckboxChange}/>
                  Salon
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="vastu" checked={checkboxValues.vastu} onChange={handleCheckboxChange}/>
                    Vastu
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="hasParking" checked={checkboxValues.hasParking} onChange={handleCheckboxChange}/>
                    Parking
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="powerBackUp" checked={checkboxValues.powerBackUp} onChange={handleCheckboxChange}/>
                    Power BackUp
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="security" checked={checkboxValues.security} onChange={handleCheckboxChange}/>
                    Security
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="cctv" checked={checkboxValues.cctv} onChange={handleCheckboxChange}/>
                    CCTV Cameras
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="gymnasium" checked={checkboxValues.gymnasium} onChange={handleCheckboxChange}/>
                    Gymnasium
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="swimmingPool" checked={checkboxValues.swimmingPool} onChange={handleCheckboxChange}/>
                    Swimming Pool
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="gatedCommunity" checked={checkboxValues.gatedCommunity} onChange={handleCheckboxChange}/>
                    Gated Community
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="Library" checked={checkboxValues.library} onChange={handleCheckboxChange}/>
                    Library
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="rainWater" checked={checkboxValues.rainWater} onChange={handleCheckboxChange}/>
                    Rain Water Harvesting
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="wifi" checked={checkboxValues.wifi} onChange={handleCheckboxChange}/>
                    Wifi
                </label>
              </div>
            </div>
            <div className="add-product-description flex-col">
              <p>Address</p>
              <textarea onChange={onChangeHandler} name="address" rows="6"></textarea>
            </div>
            <div className="add-product-name flex-col">
              <p>Area Name</p>
              <input onChange={onChangeHandler} type="text" name="area" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Landmark</p>
              <input onChange={onChangeHandler} type="text" name="landmark" required />
            </div>
            <div className="add-product-name flex-col">
              <p>Pincode</p>
              <input onChange={onChangeHandler} type="text" name="pincode" required />
            </div>
            <div className="add-product-description flex-col">
              <p>Description</p>
              <textarea onChange={onChangeHandler} name="description" rows="6"></textarea>
            </div>
            <div className="add-img-upload flex-col">
              <p>Upload Images</p>
              {imageInputs.map((_, index) => (
                <div key={index} className="image-upload-wrapper">
                  <label htmlFor={`image-${index}`}>
                    <img src={image} alt="Upload" />
                  </label>
                  <input type="file" id={`image-${index}`} name={`images[${index}]`} onChange={(e) => handleFileChange(e, index)} hidden required/>
                  <button type="button" className="remove-btn" onClick={() => removeImageInput(index)}>Remove</button>
                </div>
              ))}
              <button type="button" className="add-more-btn" onClick={addImageInput}>+ Add More Images</button>
            </div>
            <div className="add-product-name flex-col">
              <p>Longitude Coordinate</p>
              <input onChange={handleInputChange} type="text" name="lng" value={markerPosition.lng} placeholder="Longitude" readOnly/>
            </div>
            <div className="add-product-name flex-col">
              <p>Latitude Coordinate</p>
              <input onChange={handleInputChange} type="text" name="lat" value={markerPosition.lat} placeholder="Latitude" readOnly/>
            </div>
            <button className="add-btn">Submit</button>
          </form>
        </div>
        <div id="map" className="map-container"></div>
      </div>
    </>
  );
}
