import style from "../Onboarding.module.scss";

export default function OnboardingProgress({ step, totalSteps = 3 }) {
  return (
    <>
      <p className={style.progressLabel}>
        Trin {step} af {totalSteps}
      </p>

      <div className={style.bars}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`${style.bar} ${n <= step ? style.barActive : ""}`}
          />
        ))}
      </div>
    </>
  );
}
