import style from "../Onboarding.module.scss";

export default function OnboardingStepOne({
  email,
  emailError,
  onEmailChange,
  onContinue,
  onBack,
}) {
  return (
    <div>
      <h1>Opret konto</h1>
      <p>Det tager under 2 minutter.</p>

      <label>Dit navn</label>
      <input className={style.input} type="text" placeholder="Fx Mads Jensen" />

      <label>Email</label>
      <input
        className={style.input}
        type="email"
        placeholder="mads@eksempel.dk"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />

      {emailError && <p className={style.error}>{emailError}</p>}

      <button className={style.btnPrimary} onClick={onContinue}>
        Fortsæt
      </button>
      <button className={style.btnSecondary} onClick={onBack}>
        Tilbage
      </button>
    </div>
  );
}
