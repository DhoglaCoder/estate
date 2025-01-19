import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from "@react-google-maps/api";
  import { useRef, useState } from "react";
  
  const center = { lat: 17.455675, lng: 78.488745 };
  
  export default function Map() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });
  
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
  
    const originRef = useRef();
    const destinationRef = useRef();
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    async function calculateRoute() {
      if (originRef.current.value === "" || destinationRef.current.value === "") {
        return;
      }
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  
    function clearRoute() {
      setDirectionsResponse(null);
      setDistance("");
      setDuration("");
      originRef.current.value = "";
      destinationRef.current.value = "";
    }
  
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          {/* Google Map */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </div>
        <div
          style={{
            padding: "16px",
            borderRadius: "8px",
            margin: "16px",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: "600px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </Autocomplete>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </Autocomplete>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={calculateRoute}
                style={{
                  backgroundColor: "#d53f8c",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Calculate Route
              </button>
              <button
                onClick={clearRoute}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                aria-label="Clear route"
              >
                ❌
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "space-between",
            }}
          >
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
            <button
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
              aria-label="Center back"
            >
              📍
            </button>
          </div>
        </div>
      </div>
    );
  }
  