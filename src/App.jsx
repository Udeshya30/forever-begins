import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, ScrollToTop, RouteScrollReset } from './components';
import { Home, OurStory, Celebration, Gallery, Surprise, Share } from './pages';
import './styles/global.scss';

function App() {
  return (
    <Router>
      <RouteScrollReset />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/celebration" element={<Celebration />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/share-photos" element={<Share />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
