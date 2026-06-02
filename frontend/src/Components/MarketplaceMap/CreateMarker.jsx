import { useMapEvents } from "react-leaflet";

export default function CreateMarker({
  onCreateMarker,
}) {
  useMapEvents({
    click(e) {
      const name = prompt("Navn:");
      if (!name) return;

      const product = prompt("Hvad sælger du?");
      if (!product) return;

      const image =
        prompt("Billede URL:") ||
        "https://placehold.co/300x200";

      onCreateMarker({
        name,
        product,
        image,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}
