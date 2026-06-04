import { useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import MarkerModal from "./MarkerModal";
import "./MarketplaceMap.css";

function ClickHandler({ onClick, createMode }) {
  useMapEvents({
    click(e) {
      if (createMode) {
        onClick(e.latlng);
      }
    },
  });

  return null;
}

export default function MarketplaceMap({
  markers,
  onCreateMarker,
  onDeleteMarker,
}) {
  const [modalPos, setModalPos] = useState(null);
  const [createMode, setCreateMode] = useState(false);

  const handleSaveMarker = useCallback(
    (data) => {
      onCreateMarker(data);
      setModalPos(null);
      setCreateMode(false);
    },
    [onCreateMarker]
  );

  return (
    <div className="marketplace-map-wrapper">
      <div className="marketplace-actions">
        <button
          className="create-button"
          onClick={() => {
            setCreateMode((current) => !current);
          }}
        >
          {createMode ? "Annuller oprettelse" : "Opret ny bod"}
        </button>
        {createMode && (
          <div className="create-instructions">
            Klik på kortet for at placere din nye bod.
          </div>
        )}
      </div>

      <div className="marketplace-map-container">
        <MapContainer
          center={[57.0488, 9.9217]}
          zoom={13}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />

          <ClickHandler
            createMode={createMode}
            onClick={(latlng) => setModalPos(latlng)}
          />

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
            >
              <Popup>
                <img
                  src={marker.image}
                  alt={marker.name}
                  style={{
                    width: "200px",
                    borderRadius: "8px",
                  }}
                />
                <h3>{marker.name}</h3>
                <p><strong>Lokation:</strong> {marker.location}</p>
                <p><strong>Produkter:</strong> {marker.product}</p>
                <p><strong>Åbningstider:</strong> {marker.openingHours}</p>
                {onDeleteMarker && (
                  <button
                    onClick={() => onDeleteMarker(marker.id)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 12px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Slet bod
                  </button>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {modalPos && (
        <MarkerModal
          position={modalPos}
          onClose={() => {
            setModalPos(null);
            setCreateMode(false);
          }}
          onSave={(data) => handleSaveMarker(data)}
        />
      )}
    </div>
  );
}