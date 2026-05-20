import { useState, useEffect } from 'react';
import { Menu, X, Compass, ShieldAlert, Sun, Moon } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { motion } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  adminToken: string | null;
}

export default function Navbar({ currentPage, setCurrentPage, adminToken }: NavbarProps) {
  const { theme, toggleTheme } = useStudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Studio' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0F]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-6'
      }`}
    >
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#C9A14A] via-amber-200 to-[#C9A14A] transition-all duration-75 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Mark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#C9A14A] to-amber-100 flex items-center justify-center shadow-[0_0_15px_rgba(201,161,74,0.3)] transition-transform duration-500 group-hover:rotate-12">
            <Compass className="w-5 h-5 text-[#0B0B0F]" />
          </div>
          <div>
            <span className="font-sans font-extrabold tracking-widest text-white text-lg block leading-none">
              AURELIA
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9A14A] block uppercase mt-0.5">
              Interior Studio
            </span>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative py-1 text-sm font-sans tracking-wider uppercase transition-colors select-none focus:outline-none cursor-pointer ${
                currentPage === link.id
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-12 right-12 h-[2px] bg-[#C9A14A] shadow-[0_0_8px_#C9A14A]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-desktop"
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Activate Light Theme' : 'Activate Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#C9A14A]" />
            )}
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            className="px-5 py-2.5 bg-transparent hover:bg-white/5 border border-[#C9A14A]/40 hover:border-[#C9A14A] text-[#C9A14A] font-sans font-medium text-xs tracking-wider uppercase rounded-lg transition-all focus:outline-none cursor-pointer"
          >
            Inquire Design
          </button>

          <button
            onClick={() => handleLinkClick('admin')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
              adminToken
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{adminToken ? 'Dashboard' : 'Admin Area'}</span>
          </button>
        </div>

        {/* Mobile menu, Theme, and Admin Toggle (Mobile) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Switcher */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-mobile"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 focus:outline-none"
            title={theme === 'dark' ? 'Activate Light Theme' : 'Activate Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#C9A14A]" />
            )}
          </button>

          <button
            onClick={() => handleLinkClick('admin')}
            className={`p-2.5 rounded-lg border focus:outline-none relative ${
              adminToken
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B0B0F] border-b border-white/5 p-6 space-y-4 shadow-xl z-50">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-2 text-left text-base font-sans tracking-widest uppercase focus:outline-none ${
                  currentPage === link.id
                    ? 'text-[#C9A14A] font-medium pl-2 border-l-2 border-[#C9A14A]'
                    : 'text-gray-400'
                }`}
              >
                {link.label}
              </button>
            ))}
            <hr className="border-white/5 my-2" />
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 bg-[#C9A14A] text-[#0B0B0F] font-sans font-bold text-center tracking-wider uppercase rounded-lg text-sm"
            >
              Inquire Design
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
