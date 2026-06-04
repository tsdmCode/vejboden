import style from "./Cards.module.scss";

export const Cards = ({
  img,
  title,
  distance,
  isOpen = false,
  isClosed = false,
}) => {
  return (
    <div className={style.cards}>
      <div className={style.cardImageWrapper}>
      </div>
      <div className={style.cardContent}>
        <h2 className={style.cardTitle}>{title}</h2>
        <p className={style.cardDistance}>{distance}</p>
        {isOpen && (
          <span className={`${style.cardStatus} ${style.open}`}>Åben</span>
        )}
        {isClosed && (
          <span className={`${style.cardStatus} ${style.closed}`}>Lukket</span>
        )}
      </div>
    </div>
  );
};