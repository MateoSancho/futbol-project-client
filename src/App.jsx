import './App.css'

import Home from './pages/Home';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Athletes from './pages/Athletes';
import AthleteAbout from './pages/AthleteAbout';
import Clubs from './pages/Clubs';
import ClubAbout from './pages/ClubAbout';
import NotFound from './pages/Notfound';


function App() {

  return (
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
        <Route path="/not-found" element={<NotFound />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
    
  )
}

export default App
