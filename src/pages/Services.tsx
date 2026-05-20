import { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ChevronDown, Compass, Cpu, Layers, HardHat } from 'lucide-react';

export default function Services() {
  const { services, theme } = useStudio();
  const isLight = theme === 'light';
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#C9A14A]/10 border border-[#C9A14A]/25 px-2.5 py-1 rounded text-[10px] font-mono text-[#C9A14A] tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>OUR DESIGN SPECIFICATION CAPABILITIES</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-tight">
            Comprehensive <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-[#8B6A2F] to-[#C9A14A]' : 'from-[#C9A14A] to-amber-100'}`}>
              Turnkey Integration
            </span>
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            From initial sketch pads and floor elevations to stone yard procurement, we coordinate the complete pipeline with uncompromising material loyalty.
          </p>
        </div>

        {/* HIGH-END SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className={`p-6 md:p-8 bg-[#16161C]/85 hover:bg-[#1A1A24] border rounded-2xl transition-all duration-300 ${
                  isExpanded ? 'border-[#C9A14A] shadow-[0_0_25px_rgba(201,161,74,0.08)]' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[#C9A14A] bg-[#C9A14A]/10 px-2 py-0.5 rounded uppercase">
                      ACTIVE ARCHETYPE
                    </span>
                    <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Icon Indicator */}
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#C9A14A]">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mt-4">
                  {service.description}
                </p>

                {/* Collapsible spec shelf */}
                <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="flex items-center justify-between w-full text-xs font-mono tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'CONCEAL DETAILED BLUEPRINT' : 'READ DETAILED BLUEPRINT'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#C9A14A]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-6 pt-2"
                      >
                        <p className="text-xs text-gray-300 leading-relaxed font-sans italic border-l-2 border-[#C9A14A] pl-3">
                          {service.longDescription || "This discipline focuses on rendering standard beauty utilizing clean geometry, concealed architectural lighting, and bespoke item integrations."}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">
                            STUDIO DELIVERABLES INDEX
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {(service.deliverables || ['Digital Moodboards', 'Power Schematics', '3D Walkthroughs', 'Raw Materials Board']).map((deliv, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-lg text-xs font-sans text-gray-300">
                                <Check className="w-3.5 h-3.5 text-[#C9A14A]" />
                                <span>{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}
        </div>

        {/* VALUE PROP HERO GRAPHIC MOCK */}
        <section className="bg-gradient-to-r from-[#16161C] to-[#0D0D12] border border-white/5 p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase">THE AURELIA RIGOR</span>
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold tracking-tight">Need a custom technical design estimate?</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
              Our master architects are available to coordinate floor alignments directly inside your building. All estimations are supported by rigorous day-light model simulation projections.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <a
              href="#footer-main"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('footer-main')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(201,161,74,0.2)]"
            >
              Consult Studio Registry
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
