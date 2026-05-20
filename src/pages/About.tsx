import { motion } from 'motion/react';
import { Compass, ShieldCheck, HeartPulse, Sparkles, Award, Star, Milestone } from 'lucide-react';

export default function About() {
  const milestoneData = [
    { year: '2014', title: 'Aurelia Foundations', desc: 'Established in Bandra Kurla Complex, Mumbai by dual architecture partners with a focus on dark structural luxury.' },
    { year: '2018', title: 'AD Architectural Digest Laurels', desc: 'Decorated & highlighted as "Top 20 Emerging Interior Icons" for pioneering low-iron dark layouts.' },
    { year: '2021', title: 'Expansion to Delhi & Bangalore', desc: 'Constructed secondary design lab suites to service pan-India clientele with bespoke modular kitchen fits.' },
    { year: '2025', title: 'Integrated Architectural Renders', desc: 'Pioneered 12K immersive virtual reality walkthroughs for pre-construction validation.' }
  ];

  const values = [
    { title: 'STRUCTURAL PRECISION', desc: 'We align every single ceiling gap, floor margin, and lighting tube with sub-millimeter balance.', icon: ShieldCheck },
    { title: 'COHESIVE TIMBRES', desc: 'Every solid walnut door, wool rug, and brass plate operates within a unified sonic and visual wavelength.', icon: Compass },
    { title: 'HERITAGE MODERNITY', desc: 'Blending classical Italian materials with contemporary push-to-open seamless magnetic technology.', icon: Star },
    { title: 'RADICAL COHESION', desc: 'Only working with high-quality sustainable stones, woods, and local fabric curators across India.', icon: HeartPulse }
  ];

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {/* HERO TITLE HEADER */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1 bg-[#C9A14A]/10 border border-[#C9A14A]/25 px-2.5 py-1 rounded text-[10px] font-mono text-[#C9A14A] tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3" />
            <span>WHO WE ARE</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-tight"
          >
            Pioneers of Ambient <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6A2F] to-[#C9A14A]">
              Architectural Grandeur
            </span>
          </motion.h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
            Aurelia represents a tight-knit guild of premier interior architects, lighting specialists, and texture procurers committed to delivering drama, luxury, and serenity to private residencies.
          </p>
        </section>

        {/* MISSION & VISION BENTO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 hover:border-[#C9A14A]/20 transition-all">
            <span className="text-xs font-mono text-[#C9A14A] tracking-widest uppercase">OUR SOLEMN MISSION</span>
            <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white">To Exterminate the Boring Concept of "Dull Empty Walls"</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We believe a home should not simply store furniture—it must serve as an immersive acoustic and visual theater that elevates daily thoughts. Our structures tell rich personal stories through carefully selected natural elements.
            </p>
          </div>
          <div className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 hover:border-[#C9A14A]/20 transition-all">
            <span className="text-xs font-mono text-[#C9A14A] tracking-widest uppercase">THE STUDIO VISION</span>
            <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white">Shaping the Aesthetic of Absolute Material Sovereignty</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We look forward to a future where high-performance architectural computing pairs directly with physical raw natural granite layers to build beautiful sustainable sanctuaries that survive for successive family generations.
            </p>
          </div>
        </section>

        {/* TIMELINE OF ARTISTRY */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-gray-500 tracking-wider">A CHRONOLOGICAL EVOLUTION</span>
            <h2 className="text-3xl font-sans font-bold tracking-tight">Our Decadal Milestones</h2>
          </div>

          <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
            {/* Center Line for Desktop, Left Line for Mobile */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#C9A14A] via-white/10 to-transparent -translate-x-1/2" />
            <div className="md:hidden absolute left-[31px] top-4 bottom-4 w-[1px] bg-white/10" />

            {milestoneData.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-12 md:mb-16`}>

                  {/* Left Side Content (Even) */}
                  <div className={`md:col-span-5 ${isEven ? 'md:text-right' : 'md:order-last md:text-left'} space-y-2`}>
                    <span className="text-xl md:text-2xl font-sans font-extrabold text-[#C9A14A]">
                      {milestone.year}
                    </span>
                    <h4 className="font-sans font-bold text-lg text-white">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>

                  {/* Icon Indicator (Center Column 2) */}
                  <div className="absolute left-1 md:left-1/2 -translate-x-1/2 md:col-span-2 flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-[#0B0B0F] border-2 border-[#C9A14A] flex items-center justify-center shadow-[0_0_10px_rgba(201,161,74,0.3)] animate-pulse">
                      <Milestone className="w-4 h-4 text-[#C9A14A]" />
                    </div>
                  </div>

                  {/* Empty space filler for desktop alignment */}
                  <div className="hidden md:block md:col-span-5" />

                </div>
              );
            })}
          </div>
        </section>

        {/* CORE VALUES GRID */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase font-semibold">THE AURELIA VOWS</span>
            <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-tight">Under what Axioms We Draft</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-6 bg-[#16161C] border border-white/5 rounded-xl hover:border-[#C9A14A]/40 transition-all space-y-4">
                  <div className="w-10 h-10 rounded bg-[#C9A14A]/5 border border-[#C9A14A]/25 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#C9A14A]" />
                  </div>
                  <h4 className="font-sans font-bold text-sm text-white tracking-tight">
                    {v.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
