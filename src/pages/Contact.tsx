import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { Mail, Phone, MapPin, Send, MessageCircleCode, Sparkles, Map } from 'lucide-react';

interface ContactProps {
  prefilledArchetype: string;
  clearPrefilledArchetype: () => void;
}

export default function Contact({ prefilledArchetype, clearPrefilledArchetype }: ContactProps) {
  const { settings, addInquiry } = useStudio();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Residential Architecture');
  const [budgetBracket, setBudgetBracket] = useState('Premium ($50k - $100k)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prefill the form if user matched their archetype from the homepage widget!
  useEffect(() => {
    if (prefilledArchetype) {
      setServiceType('Residential Architecture');
      setMessage(`I just completed your AI Style Matcher quiz and matched with [${prefilledArchetype}]. I would love to schedule a custom luxury consultation or floor walkthrough corresponding to this style layout!`);
    }
  }, [prefilledArchetype]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addInquiry({
      name,
      email,
      phone,
      serviceType,
      budgetBracket,
      message
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    clearPrefilledArchetype();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: SPECS & MAP */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase font-semibold">
              JOIN THE REGISTRY
            </span>
            <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight">
              Aurelia <br />
              Manhattan Studio
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Connect with our principal curators, select custom fabric patterns, or analyze high-definition 12K walkthroughs at our quiet gallery space.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4 font-sans text-sm">
            <div className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#C9A14A]/20 transition-all">
              <Phone className="w-5 h-5 text-[#C9A14A] shrink-0" />
              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase">Call Main Office</h4>
                <p className="text-gray-400 mt-1">{settings.agencyPhone}</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#C9A14A]/20 transition-all">
              <Mail className="w-5 h-5 text-[#C9A14A] shrink-0" />
              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase">Curated Electronic Inbox</h4>
                <p className="text-gray-400 mt-1 break-all">{settings.agencyEmail}</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#C9A14A]/20 transition-all">
              <MapPin className="w-5 h-5 text-[#C9A14A] shrink-0" />
              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase">Physical Lounge Address</h4>
                <p className="text-gray-400 mt-1">{settings.agencyAddress}</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct button */}
          <a
            href="https://wa.me/18009002872"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            <MessageCircleCode className="w-4 h-4" />
            <span>Engage Curators on WhatsApp</span>
          </a>

          {/* Interactive Custom SVG Blueprint Map */}
          <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#16161C] flex flex-col items-center justify-center p-6 aspect-[16/10] shadow-inner select-none">
            {/* SVG custom design grid */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
              <path d="M 0,10 L 100,10 M 0,20 L 100,20 M 0,30 L 100,30 M 0,40 L 100,40 M 0,50 L 100,50 M 0,60 L 100,60 M 0,70 L 100,70 M 0,80 L 100,80 M 0,90 L 100,90" stroke="white" strokeWidth="0.5" />
              <path d="M 10,0 L 10,100 M 20,0 L 20,100 M 30,0 L 30,100 M 40,0 L 40,100 M 50,0 L 50,100 M 60,0 L 60,100 M 70,0 L 70,100 M 80,0 L 80,100 M 90,0 L 90,100" stroke="white" strokeWidth="0.5" />
            </svg>

            {/* Stylized vector map components representing Lower Manhattan */}
            <div className="relative w-full h-full flex flex-col justify-between items-center z-10 text-center text-gray-400">
              <div className="flex justify-between items-center w-full text-[10px] font-mono border-b border-white/5 pb-2">
                <span>COORD: 40.7128° N, 74.0060° W</span>
                <span className="text-[#C9A14A]">GRID ZOOM: ACT</span>
              </div>

              {/* Central Pulsing office ring pin */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-12 px-3 py-1 bg-[#C9A14A] text-[#0B0B0F] font-sans font-bold text-[10px] rounded shadow-md uppercase">
                  Aurelia Studio HQ
                </div>
                <div className="w-5 h-5 rounded-full bg-[#C9A14A] flex items-center justify-center animate-ping absolute" />
                <div className="w-5 h-5 rounded-full bg-[#C9A14A] flex items-center justify-center relative shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-[#0B0B0F]" />
                </div>
                <span className="text-[10px] font-mono text-white tracking-widest uppercase mt-3 pt-1">
                  Tribeca District
                </span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase">
                <Map className="w-3.5 h-3.5" />
                <span>Simulated High-Fidelity Office Blueprint</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH END INQUIRY FORM */}
        <div className="lg:col-span-7 bg-[#16161C] border border-white/5 rounded-2xl p-6 md:p-10 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A14A]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center gap-2 mb-8 border-b border-white/[0.03] pb-6">
            <div className="p-2 bg-[#C9A14A]/10 text-[#C9A14A] border border-[#C9A14A]/25 rounded-xl">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">Design Inquiry Blueprint</h2>
              <p className="text-[10px] font-mono text-gray-500 uppercase mt-0.5">ESTIMATION REGISTER FOR RESIDENTIAL & COMMERCIAL SUITES</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
            
            {prefilledArchetype && (
              <div className="p-3.5 bg-[#C9A14A]/10 border border-[#C9A14A]/30 text-xs text-[#C9A14A] rounded-xl flex items-center justify-between">
                <span>✓ Pre-filled match archetype: <strong>{prefilledArchetype}</strong></span>
                <button
                  type="button"
                  onClick={clearPrefilledArchetype}
                  className="text-[10px] font-mono uppercase underline tracking-wider hover:text-white"
                >
                  Clear Match
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  YOUR HUMAN NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Julian Vance"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  ELECTRONIC MAIL ADDR
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="julian@vanguard.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  SECURE TELEPHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 902-1203"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  TARGET DESIGN CATEGORY
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#16161C] border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[#C9A14A] transition-all"
                >
                  <option value="Residential Architecture">Residential Interior Architecture</option>
                  <option value="Cinematic Kitchen Planning">Cinematic Kitchen Planning</option>
                  <option value="High-Fidelity 3D Visuals">High-Fidelity 3D Visuals</option>
                  <option value="Executive Offices & Suites">Executive Offices & Suites</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                PROJECT BUDGET PARAMETER BRACKET
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Bespoke ($25k - $50k)',
                  'Premium ($50k - $100k)',
                  'Ultra-Luxury ($100k+)'
                ].map((bracket) => (
                  <button
                    key={bracket}
                    type="button"
                    onClick={() => setBudgetBracket(bracket)}
                    className={`p-3 border rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      budgetBracket === bracket
                        ? 'bg-[#C9A14A]/10 border-[#C9A14A] text-[#C9A14A] font-bold'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {bracket}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                PROJECT METERS & STRUCTURAL BRIEF
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your space specifications, aesthetic tone notes, or match archetypes here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] resize-none transition-all text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-sans font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_25px_rgba(201,161,74,0.15)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transmit Secure Design Brief</span>
              <Send className="w-4 h-4" />
            </button>

            {isSubmitted && (
              <p className="text-xs text-center text-emerald-400 font-mono animate-bounce mt-3">
                ✓ Brief Transmitted! Our primary architectural curators will analyze your grid coordinates immediately.
              </p>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}
