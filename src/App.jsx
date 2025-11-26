import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Athletes from "./pages/Athletes";
import AthleteAbout from "./pages/AthleteAbout";
import Clubs from "./pages/Clubs";
import ClubAbout from "./pages/ClubAbout";
import NotFound from "./pages/Notfound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/athletes" element={<Athletes />} />
          <Route path="/athletes/:id" element={<AthleteAbout />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubAbout />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
