import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Players from "./pages/Players";
import PlayerAbout from "./pages/PlayerAbout";
import Positions from "./pages/Positions";
import PositionAbout from "./pages/PositionAbout";
import NotFound from "./pages/Notfound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Navbar />
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerAbout />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/positions/:id" element={<PositionAbout />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

/* What to do:
    - Cloudinary package
    - Delete, Edit and Add player
    - Css
    - 
  */