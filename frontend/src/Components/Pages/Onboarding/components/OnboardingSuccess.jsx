import style from "../Onboarding.module.scss";

export default function OnboardingSuccess({ onFinish }) {
  return (
    <div className={style.success}>
      <div className={style.successIcon}>✓</div>
      <h1>Du er klar</h1>
      <p>Din konto er oprettet. Gå i gang med det samme.</p>

      <button className={style.btnPrimary} onClick={onFinish}>
        Åbn vejboden
      </button>
    </div>
  );
}
