import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./Components/Pages/Onboarding/OnBoarding";
import Forside from "./Components/Pages/Forside/Forside";
import Kort from "./Components/Pages/Kort/Kort";
import Login from "./Components/Pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/forside" element={<Forside />} />
        <Route path="/kort" element={<Kort />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;