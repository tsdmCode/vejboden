import styles from "./Filter.module.scss";

export const Filter = ({ filter, setFilter }) => {
  // senere kan vi hente disse fra backend, så det er dynamisk
  const filters = [
    { label: "Alle", value: "" },
    { label: "Grønt", value: "gront" },
    { label: "Frugt", value: "frugt" },
    { label: "Æg", value: "eg" },
  ];

  return (
    // Vi bruger en nav, da det er en gruppe af links (knapper) der navigerer til forskellige "views" af data
    <nav className={styles.filterContainer} aria-label="Filter kategorier">
      <div className={styles.filterGroup}>
        {filters.map((item) => (
          <button
            key={item.value || "alle"}
            type="button"
            className={[
              styles.filterButton,
              filter === item.value ? styles.active : "",
            ].join(" ")}
            onClick={() => setFilter(item.value)}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
