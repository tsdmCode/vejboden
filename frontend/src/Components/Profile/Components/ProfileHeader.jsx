import style from "./ProfileHeader.module.scss";

export default function ProfileHeader({
  image,
  firstName,
  lastName,
  city,
  memberSince,
  savedCount = 0,
  visitedCount = 0,
  reviewsCount = 0,
}) {
  return (
    <section className={style.profileHeader}>
      <div className={style.avatarWrap}>
        <img
          className={style.avatar}
          src={image}
          alt={`${firstName} ${lastName}`}
        />
      </div>

      <div className={style.info}>
        <h1 className={style.name}>
          {firstName} {lastName}
        </h1>
        <p className={style.meta}>
          {city} · Medlem siden {memberSince}
        </p>
      </div>

      <div className={style.tabs}>
        <button className={style.tab}>
          <span className={style.count}>{savedCount}</span>
          <span>Gemte</span>
        </button>

        <button className={style.tab}>
          <span className={style.count}>{visitedCount}</span>
          <span>Besøgte</span>
        </button>

        <button className={style.tab}>
          <span className={style.count}>{reviewsCount}</span>
          <span>Anmeld.</span>
        </button>
      </div>
    </section>
  );
}
