import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "90%",
  height: "100%",

};

const center = {
  lat: 34.5,
  lng: 76.5,
};

const locations = [
  { lat: 34.1526, lng: 77.5771 },
  { lat: 34.0837, lng: 74.7973 },
  { lat: 35.2971, lng: 75.6337 },
  { lat: 32.7266, lng: 74.8570 },
  { lat: 31.1048, lng: 77.1734 },
];

const MapSection = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // Call the key using Vite's specific syntax:
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", 
  });

  if (!isLoaded) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center bg-gray-100 rounded-lg">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="w-full h-[350px] pl-8 rounded-2xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={loc}
            icon={{
              path: (window as any).google.maps.SymbolPath.CIRCLE,
              fillColor: "#0f3d3e",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 4,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapSection;