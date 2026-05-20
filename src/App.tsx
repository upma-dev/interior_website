import { useState } from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [prefilledArchetype, setPrefilledArchetype] = useState<string>('');
  const { adminToken } = useStudio();

  const handlePrefillConsultant = (styleName: string) => {
    setPrefilledArchetype(styleName);
  };

  const clearPrefilledArchetype = () => {
    setPrefilledArchetype('');
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#0B0B0F] text-white flex flex-col justify-between select-none">
      
      {/* GLOBAL BRANDED HEADER - Hidden when admin is active */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          adminToken={adminToken}
        />
      )}

      {/* DYNAMIC SCREEN CARDS */}
      <div className="flex-grow">
        {currentPage === 'home' && (
          <Home
            setCurrentPage={setCurrentPage}
            onPrefillConsultant={handlePrefillConsultant}
          />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'services' && <Services />}
        {currentPage === 'portfolio' && <Portfolio />}
        {currentPage === 'testimonials' && <Testimonials />}
        {currentPage === 'contact' && (
          <Contact
            prefilledArchetype={prefilledArchetype}
            clearPrefilledArchetype={clearPrefilledArchetype}
          />
        )}
        {currentPage === 'admin' && <Admin setCurrentPage={setCurrentPage} />}
      </div>

      {/* GLOBAL FOOTER - Hidden when admin is active */}
      {currentPage !== 'admin' && (
        <Footer setCurrentPage={setCurrentPage} />
      )}
      
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <AppContent />
    </StudioProvider>
  );
}
