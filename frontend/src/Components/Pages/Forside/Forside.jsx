import { useEffect, useState } from "react";
import { Link } from "react-router";
import style from "./Forside.module.scss";
import SearchField from "../../SearchBar/SearchField";
import { Cards } from "../../Cards/Cards";
import { Filter } from "../../Filter/Filter";

export default function Forside() {
  const [boder, setBoder] = useState([]);
  const [filter, setFilter] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/booths")
      .then((res) => res.json())
      .then((data) => setBoder(data));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  }

  return (
    <div className={style.cardscontent}>
      <div className={style.Headertxt}>
        <h3>Vejboden</h3>
        <h2>Find Din nærmeste Vejbod</h2>
        <h4>Lokale sælgere nær dig</h4>
        <SearchField
          value={filter}
          onChange={(val) => setFilter(val)}
          onSearch={() => {}}
        />
        <br />
      </div>
        <br />
      <Filter filter={filter} setFilter={setFilter} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}>
        {boder.map((bod) => (
  <Link
    key={bod.id}
    to={`/bod/${bod.id}`}
    style={{ textDecoration: "none", color: "inherit" }}>
    <Cards
      title={bod.name}
      distance={
        userLocation
          ? `${getDistance(userLocation.lat, userLocation.lng, bod.latitude, bod.longitude)} km`
          : "..."
      }
      isOpen={true}
    />
  </Link>
))}
      </div>
    </div>
  );
}
