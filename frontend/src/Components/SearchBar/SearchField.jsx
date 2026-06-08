import style from "./SearchField.module.scss";

export default function SearchField({
  value,
  onChange,
  onSearch,
  placeholder = "Søg...",
}) {
  return (
    <div className={style.searchField}>
      <input
        className={style.input}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      <button className={style.button} onClick={onSearch}>
        Søg
      </button>
    </div>
  );
}
