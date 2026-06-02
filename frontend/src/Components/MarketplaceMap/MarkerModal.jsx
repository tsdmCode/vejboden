import { useState } from "react";

export default function MarkerModal({
  position,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || !product || !openingHours) {
      return;
    }

    onSave({
      name,
      location,
      product,
      openingHours,
      image:
        image ||
        "https://placehold.co/300x200",
      lat: position.lat,
      lng: position.lng,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Opret marker</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Navn på bod"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Lokation (adresse/by)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            placeholder="Produkter"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />

          <input
            placeholder="Åbningstider"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />

          <input
            placeholder="Billede URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Annuller
            </button>

            <button type="submit">
              Gem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}