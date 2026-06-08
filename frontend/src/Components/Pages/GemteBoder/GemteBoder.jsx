import style from './GemteBoder.module.scss';
import { Cards } from '../../Cards/Cards';
import { useEffect, useState } from 'react';

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

export default function GemteBoder() {
  const [savedBooths, setSavedBooths] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const boothIds = JSON.parse(localStorage.getItem('vejbodensavedbooths') || '[]');

    Promise.all(boothIds.map((id) => fetch(`http://localhost:3000/api/booths/${id}`).then((r) => r.json())))
      .then(setSavedBooths)
      .catch((err) => console.error('Failed to fetch saved booths', err))
      .finally(() => setLoading(false));
  }, []);

  const data = savedBooths.map((booth) => (
    <Cards
      key={booth.id}
      img={booth.img || 'example.com/imagelol'}
      title={booth.title}
      distance={
        userLocation ? `${getDistance(userLocation.lat, userLocation.lng, booth.latitude, booth.longitude)} km` : '...'
      }
    />
  ));

  return (
    <>
      <div className={style.Headertxt}>
        <h3>Vejboden</h3>
        <h4>Her kan du se dine gemte boder</h4>
      </div>
      {loading ? 'Henter Data' : null}
      {data ? data : <h4>Du har ikke valgt noget endnu!</h4>}
    </>
  );
}
