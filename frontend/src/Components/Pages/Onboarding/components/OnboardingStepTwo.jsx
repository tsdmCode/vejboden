import style from "../Onboarding.module.scss";

export default function OnboardingStepTwo({ onContinue, onBack }) {
  return (
    <div>
      <h1>Opret din bod</h1>
      <p>Fortæl naboerne hvad du sælger.</p>

      <label>Bodens navn</label>
      <input
        className={style.input}
        type="text"
        placeholder="din vejbod's navn"
      />

      <label>Beskrivelse</label>
      <textarea
        className={`${style.input} ${style.textarea}`}
        placeholder="Fx Vi sælger æg"
      />

      <label>Adresse</label>
      <input className={style.input} type="text" placeholder="Din adresse" />

      <button className={style.btnPrimary} onClick={onContinue}>
        Fortsæt
      </button>
      <button className={style.btnSecondary} onClick={onBack}>
        Tilbage
      </button>
    </div>
  );
}
