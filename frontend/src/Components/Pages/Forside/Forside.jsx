import { useState, useEffect } from "react";
import MarketplaceMap from "../../marketplaceMap/MarketplaceMap";

const API_BASE = "http://localhost:3000/api";

export default function Forside() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(`${API_BASE}/booths`);
        if (!response.ok) throw new Error("Failed to fetch markers");
        const data = await response.json();
        
        const transformedMarkers = data.map((booth) => ({
          id: booth.id,
          name: booth.name,
          product: booth.products || "",
          location: booth.location || "",
          openingHours: booth.openingHours || "",
          image: booth.image || "https://placehold.co/300x200",
          lat: booth.latitude,
          lng: booth.longitude,
        }));
        
        setMarkers(transformedMarkers);
      } catch (error) {
        console.error("Error fetching markers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  const handleCreateMarker = async (marker) => {
    try {
      console.log("Creating marker", marker);
      const response = await fetch(`${API_BASE}/booths`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: marker.name,
          products: marker.product,
          location: marker.location,
          openingHours: marker.openingHours,
          image: marker.image,
          latitude: marker.lat,
          longitude: marker.lng,
        }),
      });

      const responseText = await response.text();
      console.log("Create booth response status", response.status, "body", responseText);

      if (!response.ok) {
        throw new Error(`Failed to create booth: ${responseText}`);
      }

      const newBooth = JSON.parse(responseText);
      console.log("Created booth", newBooth);

      setMarkers((prev) => [
        ...prev,
        {
          id: newBooth.id,
          name: newBooth.name,
          product: newBooth.products || "",
          location: newBooth.location || "",
          openingHours: newBooth.openingHours || "",
          image: newBooth.image || "https://placehold.co/300x200",
          lat: newBooth.latitude,
          lng: newBooth.longitude,
        },
      ]);
    } catch (error) {
      console.error("Error creating marker:", error);
    }
  };

  const handleDeleteMarker = async (markerId) => {
    try {
      const response = await fetch(`${API_BASE}/booths/${markerId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete booth");

      setMarkers((prev) => prev.filter((m) => m.id !== markerId));
    } catch (error) {
      console.error("Error deleting marker:", error);
    }
  };

  if (loading) {
    return <div>Indlæser markers...</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        maxHeight: "750px",
      }}
    >
      <MarketplaceMap
        markers={markers}
        onCreateMarker={handleCreateMarker}
        onDeleteMarker={handleDeleteMarker}
      />
    </div>
  );
}