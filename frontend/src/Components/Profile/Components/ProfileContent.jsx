import style from "./ProfileContent.module.scss";

export default function ProfileContent({
  accountName = "KONTO",
  editProfileItems = [],
  notificationItems = [],
  locationTitle = "Min placering",
  locationValue = "Aalborg, 9000",
  sellerTitle = "ER DU SÆLGER?",
  sellerActions = [],
}) {
  return (
    <section className={style.profileContent}>
      <div className={style.accountRow}>
        <h2 className={style.accountName}>{accountName}</h2>
      </div>

      <div className={style.cardsWrap}>
        <article className={style.sectionCard}>
          <h3 className={style.sectionTitle}>Rediger profil</h3>

          <ul className={style.profileItems}>
            {editProfileItems.map((item) => (
              <li key={item.title} className={style.profileItem}>
                <div className={style.itemIcon} />
                <div className={style.profileItemText}>
                  <span className={style.profileItemTitle}>{item.title}</span>
                  <span className={style.profileItemSubtitle}>
                    {item.subtitle}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className={style.sectionCard}>
          <h3 className={style.sectionTitle}>Notifikationer</h3>

          <ul className={style.profileItems}>
            {notificationItems.map((item) => (
              <li key={item.title} className={style.profileItem}>
                <div className={style.itemIcon} />
                <div className={style.profileItemText}>
                  <span className={style.profileItemTitle}>{item.title}</span>
                  <span className={style.profileItemSubtitle}>
                    {item.subtitle}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className={style.sectionCard}>
          <h3 className={style.sectionTitle}>{locationTitle}</h3>

          <div className={style.profileItem}>
            <div className={style.itemIcon} />
            <div className={style.profileItemText}>
              <span className={style.profileItemTitle}>{locationValue}</span>
            </div>
          </div>
        </article>
      </div>

      <section className={style.sellerSection}>
        <h2 className={style.sellerTitle}>{sellerTitle}</h2>

        <div className={style.sellerCards}>
          {sellerActions.map((action) => (
            <article key={action.title} className={style.sellerCard}>
              <div className={style.itemIcon} />
              <div className={style.profileItemText}>
                <h3 className={style.sellerCardTitle}>{action.title}</h3>
                <p className={style.sellerCardText}>{action.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
