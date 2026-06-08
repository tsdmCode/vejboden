import style from "../Onboarding.module.scss";

export default function OnboardingIntro({ onStart, onLogin }) {
  return (
    <>
      <div className={style.intro}>
        <h1>Velkommen til vejboden</h1>
        <p>
          Find friske, lokale råvarer direkte fra naboens vejbod. Grøntsager,
          æg, honning og meget mere.
        </p>
      </div>

      <div className={style.bottom}>
        <button className={style.btnPrimary} onClick={onStart}>
          Kom i gang
        </button>
        <button className={style.btnSecondary} onClick={onLogin}>
          Jeg har allerede en konto
        </button>

        <div className={style.dots}>
          <div className={`${style.dot} ${style.dotActive}`} />
          <div className={style.dot} />
          <div className={style.dot} />
        </div>
      </div>
    </>
  );
}
