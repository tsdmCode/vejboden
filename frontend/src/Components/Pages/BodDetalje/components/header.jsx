import styles from "./header.module.scss";
import { formatOpeningHours } from "./OpeningHours.jsx";
import { getOpeningStatus } from "./OpeningStatus.jsx";

export const BodHeader = ({
  title,
  adresse,
  distance,
  paymentMethods = ["Kontant", "MobilePay"],
}) => {
  const fallbackTags = ["Grøntsager", "Urter", "Frugt"]; // Eksempel på tags, kan erstattes med rigtige data senere
  const openingStatus = getOpeningStatus();
  const hours = formatOpeningHours();
  return (
    <header className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.openingStatus}>
          {openingStatus.status === "open" ?
            <span className={styles.open}>Åben</span>
          : openingStatus.status === "closed" ?
            <span className={styles.closed}>Lukket</span>
          : <span className={styles.unknown}>Ukendt</span>}
        </p>
      </div>
      {/* Placeholder for address, kan erstattes med rigtige data senere */}
      <p className={styles.address}>{adresse}</p>
      {/* Placeholder for distance, kan erstattes med rigtige data senere */}
      <p className={styles.distance}>{distance} km</p>

      <div className={styles.tagsContainer}>
        <ul className={styles.tags}>
          {fallbackTags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={styles.openingSummary}>
          {hours.weekdays} · {hours.saturday} · {hours.sunday}
        </div>
        <div className={styles.payment}>
          Betaling: {paymentMethods.join(" · ")}
        </div>
      </div>
    </header>
  );
};
