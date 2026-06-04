import { useEffect, useState } from "react";
import { Link } from "react-router";
import style from "./Forside.module.scss";
import SearchField from "../../SearchBar/SearchField";
import { Cards } from "../../Cards/Cards";
import { Filter } from "../../Filter/Filter";

export default function Forside() {
  const [boder, setBoder] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/booths")
      .then((res) => res.json())
      .then((data) => setBoder(data));
  }, []);

  return (
    <div className={style.cardscontent}>
      <div className={style.Headertxt}>
        <h3>Vejboden</h3>
        <h2>Find Din nærmeste Vejbod</h2>
        <h4>Lokale sælgere nær dig</h4>
        <SearchField />
      </div>

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
              distance={`${bod.latitude}, ${bod.longitude}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
