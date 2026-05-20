import { useStudio } from '../context/StudioContext';
import { Compass, Phone, Mail, MapPin, ArrowUpCircle, Instagram, Linkedin, Globe } from 'lucide-react';

export default function Footer({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { settings } = useStudio();

  const handlePageScrollLink = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-main" className="bg-[#07070A] border-t border-white/5 pt-16 pb-8 text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">
        
        {/* Pitch / Logo */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#C9A14A] flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#0B0B0F]" />
            </div>
            <span className="font-sans font-extrabold tracking-widest text-white text-base">
              AURELIA DESIGN
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            {settings.heroSubtext}
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A14A]/40 rounded-lg text-gray-400 hover:text-[#C9A14A] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A14A]/40 rounded-lg text-gray-400 hover:text-[#C9A14A] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={settings.pinterestUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A14A]/40 rounded-lg text-gray-400 hover:text-[#C9A14A] transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Studio Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white text-xs font-mono tracking-widest uppercase font-semibold">
            THE STUDIO
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => handlePageScrollLink('about')}
                className="hover:text-[#C9A14A] transition-colors focus:outline-none cursor-pointer"
              >
                Our Archetype
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageScrollLink('services')}
                className="hover:text-[#C9A14A] transition-colors focus:outline-none cursor-pointer"
              >
                Services & Outputs
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageScrollLink('portfolio')}
                className="hover:text-[#C9A14A] transition-colors focus:outline-none cursor-pointer"
              >
                Selected Works
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageScrollLink('testimonials')}
                className="hover:text-[#C9A14A] transition-colors focus:outline-none cursor-pointer"
              >
                Client Journal
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-xs font-mono tracking-widest uppercase font-semibold">
            SECURE DIRECT CONDUIT
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#C9A14A] shrink-0 mt-0.5" />
              <span>{settings.agencyPhone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#C9A14A] shrink-0 mt-0.5" />
              <span className="break-all">{settings.agencyEmail}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C9A14A] shrink-0 mt-0.5" />
              <span>{settings.agencyAddress}</span>
            </li>
          </ul>
        </div>

        {/* Architectural Hours */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-xs font-mono tracking-widest uppercase font-semibold">
            LUMINESCENCE HOURS
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            By private appointment only.<br />
            Monday – Friday: 09:00 – 18:00 EST<br />
            Saturday Salon: 10:00 – 14:00 EST
          </p>
          <div className="pt-2">
            <span className="inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded tracking-wider uppercase animate-pulse">
              ● Central Office Live
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Aurelia Interior Design Studio. All architectural property designs reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 hover:text-[#C9A14A] transition-colors focus:outline-none cursor-pointer"
        >
          <span>ASCEND UNTO PEAK</span>
          <ArrowUpCircle className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
