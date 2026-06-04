import { useMapEvents } from "react-leaflet";

export default function CreateMarker({ onCreateMarker }) {
  useMapEvents({
    click(e) {
      const name = prompt("Navn på bod:");
      if (!name) return;

      const location = prompt("Lokation (adresse/by):") || "";
      const product = prompt("Produkter:");
      if (!product) return;

      const openingHours = prompt("Åbningstider:") || "";
      const image = prompt("Billede URL:") || "https://placehold.co/300x200";

      onCreateMarker({
        name,
        location,
        product,
        openingHours,
        image,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}
