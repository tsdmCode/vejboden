import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";


export default function LogInd() {
  const navigate = useNavigate();

  return (
    <div className={style.page}>
      <div className={style.top}>
        <h1>Log ind</h1>
        <p>Velkommen tilbage til vejboden.</p>
      </div>

      <div className={style.form}>
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
    </div>
  );
}