import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./OnBoarding.module.scss";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!/[^@]+@[^@]+/.test(email)) {
      setEmailError("Email skal indeholde @");
      return;
    }
    setEmailError("");
    setStep(2);
  };

  return (
    <div className={style.onboarding}>
      {step === 0 ? (
        <>
          <div className={style.intro}>
            <h1>Velkommen til vejboden</h1>
            <p>Find friske, lokale råvarer direkte fra naboens vejbod. Grøntsager, æg, honning og meget mere.</p>
          </div>

          <div className={style.bottom}>
            <button className={style.btnPrimary} onClick={() => setStep(1)}>Kom i gang</button>
            <button className={style.btnSecondary} onClick={() => navigate("/Login")}>Jeg har allerede en konto</button>
            <div className={style.dots}>
              <div className={`${style.dot} ${style.dotActive}`} />
              <div className={style.dot} />
              <div className={style.dot} />
            </div>
          </div>
        </>
      ) : (
        <div className={style.stepWrap}>
          <p className={style.progressLabel}>Trin {step} af 3</p>
          <div className={style.bars}>
            {[1, 2, 3].map((n) => (
              <div key={n} className={`${style.bar} ${n <= step ? style.barActive : ""}`} />
            ))}
          </div>

          {step === 1 && (
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && <p className={style.error}>{emailError}</p>}
              <button className={style.btnPrimary} onClick={handleContinue}>Fortsæt</button>
              <button className={style.btnSecondary} onClick={() => setStep(0)}>Tilbage</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1>Opret din bod</h1>
              <p>Fortæl naboerne hvad du sælger.</p>
              <label>Bodens navn</label>
              <input className={style.input} type="text" placeholder="din vejbod's navn" />
              <label>Beskrivelse</label>
              <textarea className={`${style.input} ${style.textarea}`} placeholder="Fx Vi sælger æg" />
              <label>Adresse</label>
              <input className={style.input} type="text" placeholder="Din adresse" />
              <button className={style.btnPrimary} onClick={() => setStep(3)}>Fortsæt</button>
              <button className={style.btnSecondary} onClick={() => setStep(1)}>Tilbage</button>
            </div>
          )}

          {step === 3 && (
            <div className={style.success}>
              <div className={style.successIcon}>✓</div>
              <h1>Du er klar</h1>
              <p>Din konto er oprettet. Gå i gang med det samme.</p>
              <button className={style.btnPrimary} onClick={() => navigate("/forside")}>
                Åbn vejboden
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}