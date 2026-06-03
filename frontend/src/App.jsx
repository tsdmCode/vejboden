import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./Components/Pages/Onboarding/OnBoarding";
import Forside from "./Components/Pages/Forside/Forside";
import Login from "./Components/Pages/Login/Login";
import BodDetalje from "./Components/Pages/BodDetalje/BodDetalje";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/forside" element={<Forside />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/boddetalje" element={<BodDetalje />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;