import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Compass,
  Layers,
  Palette,
  Sofa,
  Sparkles,
  Sliders,
  Hourglass,
  WandSparkles
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import BeforeAfter from '../components/BeforeAfter';
import StyleConsultant from '../components/StyleConsultant';
import { cacheBustImageUrl } from '../utils/image';
import type { Project, Service } from '../types';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  onPrefillConsultant: (style: string) => void;
}

const heroBackdropByTheme = {
  dark: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
  light: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80'
};

const heroOverlayByTheme = {
  dark: 'bg-[radial-gradient(circle_at_top_left,rgba(201,161,74,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(11,11,15,0.45),rgba(11,11,15,0.95))]',
  light: 'bg-[radial-gradient(circle_at_top_left,rgba(172,126,42,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(121,154,132,0.14),transparent_30%),linear-gradient(180deg,rgba(243,231,209,0.18),rgba(232,214,180,0.88))]'
};

export default function Home({ setCurrentPage, onPrefillConsultant }: HomeProps) {
  const { projects, services, settings, theme } = useStudio();
  const isLight = theme === 'light';

  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const heroSlides = projects.slice(0, 4);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const featuredProjects = projects.filter((project: Project) => project.featured).slice(0, 3);

  const stats = [
    { value: `${settings.experienceYears}`, label: 'YEARS OF ARTISTRY', icon: Hourglass },
    { value: `${settings.completedScale}+`, label: 'BESPOKE PROPERTIES', icon: Layers },
    { value: '98%', label: 'SATISFACTION COEFFICIENT', icon: Award },
    { value: '14', label: 'WORLD-CLASS DESIGNERS', icon: Compass }
  ];

  const pageBg = isLight ? 'bg-[#FAF9F6] text-[#281F17]' : 'bg-[#0B0B0F] text-white';
  const sectionBg = isLight ? 'bg-[#F4F2EE]' : 'bg-[#07070A]';
  const panelBorder = isLight ? 'border-slate-200/80' : 'border-white/10';
  const mutedText = isLight ? 'text-[#5A4E42]' : 'text-gray-400';
  const heroCardBg = isLight
    ? 'border-slate-200/80 bg-white/95 shadow-[0_26px_80px_rgba(42,161,143,0.06)]'
    : 'border-white/10 bg-white/5 shadow-[0_26px_80px_rgba(0,0,0,0.24)]';
  const serviceCardBg = isLight
    ? 'border-slate-200/80 bg-white/95 shadow-[0_18px_46px_rgba(42,161,143,0.05)]'
    : 'border-white/10 bg-[#15151C]/84';
  const projectCardBg = isLight
    ? 'border-slate-200/80 bg-white/95 shadow-[0_18px_54px_rgba(42,161,143,0.06)]'
    : 'border-white/10 bg-[#16161C]/82';

  return (
    <div className={`${pageBg} min-h-screen overflow-hidden pt-20 transition-colors duration-500`}>
      <section className={`relative isolate min-h-[94vh] overflow-hidden px-6 py-14 ${isLight ? 'bg-[#FAF9F6]' : 'bg-[#0B0B0F]'}`}>
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${heroBackdropByTheme[theme]})` }}
        />
        <div className={`absolute inset-0 ${heroOverlayByTheme[theme]}`} />
        <div className={`absolute inset-0 ${isLight ? 'bg-[linear-gradient(135deg,rgba(255,248,236,0.22),rgba(161,118,40,0.08))]' : 'bg-[linear-gradient(135deg,rgba(11,11,15,0.18),rgba(11,11,15,0.76))]'}`} />

        <motion.div
          aria-hidden="true"
          className={`absolute -top-24 left-[-6rem] h-72 w-72 rounded-full blur-3xl ${isLight ? 'bg-[#A17628]/18' : 'bg-[#C9A14A]/18'}`}
          animate={{ y: [0, 18, 0], x: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className={`absolute bottom-6 right-[-5rem] h-96 w-96 rounded-full blur-3xl ${isLight ? 'bg-[#79A284]/14' : 'bg-amber-500/10'}`}
          animate={{ y: [0, -16, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-mono uppercase tracking-[0.24em] ${isLight ? 'border-[#A17628]/24 bg-[#FFF7EB]/84 text-[#8E6725]' : 'border-[#C9A14A]/30 bg-white/5 text-[#C9A14A]'}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Elegant interiors, tuned for light and shadow</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className={`text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl ${isLight ? 'text-[#251B12]' : 'text-white'}`}
            >
              {settings.heroTitle} <br />
              <span className={isLight ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#A17628] via-[#C9A14A] to-[#A17628] animate-shimmer-slow bg-[length:200%_auto]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#C9A14A] via-amber-100 to-[#C9A14A] shadow-glow animate-shimmer-slow bg-[length:200%_auto]'}>
                {settings.heroHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className={`mx-auto max-w-2xl text-base leading-relaxed sm:text-lg lg:mx-0 ${mutedText}`}
            >
              {settings.heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => setCurrentPage('portfolio')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A17628] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#FFF8EE] transition-all hover:bg-[#8E6725] hover:shadow-[0_0_32px_rgba(161,118,40,0.34)] sm:w-auto"
              >
                <span>View selected works</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => document.getElementById('consultant-anchor')?.scrollIntoView({ behavior: 'smooth' })}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all sm:w-auto ${isLight ? 'border-[#A17628]/26 bg-[#FFF7EB]/76 text-[#251B12] hover:border-[#A17628]/45 hover:bg-[#FFFDF8]' : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'}`}
              >
                <WandSparkles className="h-4 w-4" />
                Consult style matcher
              </button>
            </motion.div>

            <div className={`grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3 ${isLight ? 'lg:max-w-3xl' : 'lg:max-w-4xl'}`}>
              {[
                { icon: Sofa, title: 'Refined spatial flow', copy: 'Layouts that feel calm, practical, and expensive.' },
                { icon: Palette, title: 'Theme-led palettes', copy: 'Warm light mode, dramatic dark mode, both polished.' },
                { icon: Sparkles, title: 'Motion-rich polish', copy: 'Subtle float, hover lift, and living surfaces.' }
              ].map((item: { icon: typeof Sofa; title: string; copy: string }, index: number) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.15 + index * 0.08 }}
                    whileHover={{ y: -10, rotateX: 8, rotateY: -10, scale: 1.02 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`rounded-2xl border p-4 backdrop-blur-md ${heroCardBg}`}
                  >
                    <div className="mb-3 inline-flex rounded-xl border border-[#A17628]/20 bg-[#A17628]/10 p-2">
                      <Icon className="h-4 w-4 text-[#A17628]" />
                    </div>
                    <h3 className={`text-sm font-bold ${isLight ? 'text-[#251B12]' : 'text-white'}`}>{item.title}</h3>
                    <p className={`mt-1 text-xs leading-relaxed ${mutedText}`}>{item.copy}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-xl lg:ml-auto">
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -10, rotate: -1.2, rotateX: 8, rotateY: -12, scale: 1.01 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative overflow-hidden rounded-[30px] border p-4 backdrop-blur-xl ${heroCardBg}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#A17628]/12 pointer-events-none z-10" />
                <div className="relative h-72 w-full rounded-[24px] overflow-hidden sm:h-96">
                  {heroSlides.length > 0 ? (
                    <AnimatePresence mode="wait">
                      {heroSlides.map((slide, sIdx) => sIdx === heroImageIndex && (
                        <motion.img
                          key={slide.id}
                          src={cacheBustImageUrl(slide.afterImage, slide.id)}
                          alt={slide.title}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0 h-full w-full object-cover rounded-[24px]"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </AnimatePresence>
                  ) : (
                    <div className="flex h-72 w-full items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-white/5 sm:h-96">
                      <p className={`text-center text-sm font-mono uppercase tracking-[0.2em] ${isLight ? 'text-[#2aa18f]' : 'text-[#C9A14A]'}`}>
                        Featured project will appear here
                      </p>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4 z-20">
                  <div className={`max-w-[68%] rounded-2xl border px-4 py-3 backdrop-blur-md ${isLight ? 'border-slate-200/80 bg-white/90' : 'border-white/10 bg-[#0B0B0F]/55'}`}>
                    <p className={`text-[10px] font-mono uppercase tracking-[0.22em] ${isLight ? 'text-[#2aa18f]' : 'text-[#C9A14A]'}`}>Featured environment</p>
                    <p className={`mt-1 text-sm font-semibold ${isLight ? 'text-[#281F17]' : 'text-white'}`}>
                      {heroSlides[heroImageIndex]?.title ?? 'Signature residence'}
                    </p>
                  </div>
                  <div className="rounded-full border border-slate-200/20 bg-[#C9A14A] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#0B0B0F]">
                    Live mood
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24, y: 14 }}
                animate={{ opacity: 1, x: 0, y: 14 }}
                transition={{ duration: 0.8, delay: 0.34 }}
                whileHover={{ x: 6, y: 10, rotateX: 8, rotateY: 10, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`absolute -bottom-8 left-0 w-64 rounded-2xl border p-4 backdrop-blur-xl ${isLight ? 'border-[#A17628]/18 bg-[#FFF7EB]/88' : 'border-white/10 bg-[#16161C]/90'}`}
              >
                <p className={`text-[10px] font-mono uppercase tracking-[0.22em] ${isLight ? 'text-[#8E6725]' : 'text-[#C9A14A]'}`}>Theme tuned background</p>
                <p className={`mt-2 text-sm font-semibold ${isLight ? 'text-[#251B12]' : 'text-white'}`}>Cream, brass, and sage for a warmer light mode.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -18, y: -18 }}
                animate={{ opacity: 1, x: 0, y: -18 }}
                transition={{ duration: 0.8, delay: 0.42 }}
                whileHover={{ x: -6, y: -28, rotateX: -6, rotateY: -10, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`absolute right-0 top-8 w-56 rounded-2xl border p-4 backdrop-blur-xl ${isLight ? 'border-[#A17628]/18 bg-[#FFF7EB]/88' : 'border-white/10 bg-white/5'}`}
              >
                <p className={`text-[10px] font-mono uppercase tracking-[0.22em] ${isLight ? 'text-[#8E6725]' : 'text-[#C9A14A]'}`}>3D animated card</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A17628]/20 bg-[#A17628]/10">
                    <ArrowUpRight className="h-5 w-5 text-[#A17628]" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isLight ? 'text-[#251B12]' : 'text-white'}`}>Depth on hover</p>
                    <p className={`text-xs ${mutedText}`}>Floating motion and layered shadows.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
          <span className={`text-[10px] font-mono tracking-[0.28em] ${isLight ? 'text-[#8E6725]' : 'text-[#C9A14A]'}`}>DESCEND TO PRESTIGE</span>
          <div className={`h-10 w-px bg-gradient-to-b ${isLight ? 'from-[#8E6725] to-transparent' : 'from-[#C9A14A] to-transparent'}`} />
        </div>
      </section>

      <section className={`border-y ${panelBorder} ${sectionBg} px-6 py-24`}>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          <div className="space-y-6 lg:col-span-4">
            <div className={`inline-block rounded px-3 py-1 text-[10px] font-mono uppercase tracking-wider ${isLight ? 'border border-[#A17628]/20 bg-[#FFF7EB]/88 text-[#8E6725]' : 'border border-[#C9A14A]/20 bg-[#C9A14A]/10 text-[#C9A14A]'}`}>
              The renovation jolt
            </div>
            <h2 className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${isLight ? 'text-[#251B12]' : 'text-[#F5F5F5]'}`}>
              Witness the <br /> dramatic change
            </h2>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              We turn ordinary rooms into calm, cohesive experiences with better light, stronger material contrast, and cleaner spatial rhythm.
            </p>
            <div className="space-y-4">
              {[
                'Bespoke spatial design planning',
                'Acoustic panel ceiling treatments',
                'Tailored materials and lighting direction'
              ].map((item: string) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#A17628]/40 bg-[#A17628]/15 text-xs text-[#A17628]">✓</div>
                  <span className={`text-sm ${isLight ? 'text-[#4F4132]' : 'text-gray-300'}`}>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage('portfolio')}
              className={`group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors ${isLight ? 'text-[#8E6725] hover:text-[#251B12]' : 'text-[#C9A14A] hover:text-white'}`}
            >
              <span>Discover more samples</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:col-span-8 w-full">
            <BeforeAfter
              beforeImage="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              title="The Obsidian Studio Layout Transformation"
            />
          </div>
        </motion.div>
      </section>

      <section className={`border-b ${panelBorder} px-6 py-20 ${isLight ? 'bg-[#E8D7B3]' : 'bg-[#07070A]'}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                whileHover={{ y: -8, rotateX: 8, rotateY: -6, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`rounded-2xl border p-6 text-center backdrop-blur-md ${isLight ? 'border-[#A17628]/16 bg-[#FFF7EB]/84 shadow-[0_18px_50px_rgba(117,84,27,0.12)]' : 'border-white/5 bg-white/[0.02]'}`}
              >
                <div className="mb-3 inline-flex rounded-xl border border-[#A17628]/15 bg-[#A17628]/10 p-3">
                  <IconComponent className="h-5 w-5 text-[#A17628]" />
                </div>
                <div className={`text-3xl font-black tracking-widest sm:text-5xl ${isLight ? 'text-[#251B12]' : 'text-white'}`}>{stat.value}</div>
                <div className={`mt-2 text-[10px] font-mono tracking-wider ${isLight ? 'text-[#7A664E]' : 'text-gray-500'}`}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className={`${isLight ? 'bg-[#FAF9F6]' : 'bg-[#0B0B0F]'} px-6 py-24`}>
        <div className="mx-auto max-w-7xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-xl space-y-3 text-center"
          >
            <span className={`text-xs font-mono uppercase tracking-[0.28em] ${isLight ? 'text-[#8E6725]' : 'text-[#C9A14A]'}`}>Core disciplines</span>
            <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${isLight ? 'text-[#251B12]' : 'text-white'}`}>
              Our curated design portfolio
            </h2>
            <p className={`text-sm ${mutedText}`}>
              Premium services built for clarity, comfort, and a high-end visual finish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 4).map((service: Service, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 50, damping: 15, delay: index * 0.12 }}
                whileHover={{ y: -12, rotateX: 10, rotateY: -10, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`group flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all ${serviceCardBg}`}
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#A17628]/20 bg-[#A17628]/10 transition-all group-hover:bg-[#A17628]">
                    <Sliders className="h-5 w-5 text-[#A17628] transition-colors group-hover:text-[#FFF8EE]" />
                  </div>
                  <h3 className={`text-lg font-bold transition-colors group-hover:text-[#A17628] ${isLight ? 'text-[#251B12]' : 'text-white'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${mutedText}`}>
                    {service.description}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentPage('services')}
                  className={`mt-6 flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${isLight ? 'text-[#8A755E] group-hover:text-[#8E6725]' : 'text-gray-500 group-hover:text-[#C9A14A]'}`}
                >
                  <span>Specifications</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`border-y ${panelBorder} ${sectionBg} px-6 py-24`}>
        <div className="mx-auto max-w-7xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end w-full"
          >
            <div className="space-y-3">
              <span className={`text-xs font-mono uppercase tracking-[0.28em] ${isLight ? 'text-[#8E6725]' : 'text-[#C9A14A]'}`}>Curated gallery</span>
              <h2 className={`text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${isLight ? 'text-[#251B12]' : 'text-white'}`}>
                Selected masterpieces
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('portfolio')}
              className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors ${isLight ? 'text-[#8E6725] hover:text-[#251B12]' : 'text-[#C9A14A] hover:text-white'}`}
            >
              <span>Discover all works ({projects.length})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 50, damping: 15, delay: index * 0.12 }}
                whileHover={{ y: -10, rotateX: 9, rotateY: -8, scale: 1.015 }}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setCurrentPage('portfolio')}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border ${projectCardBg}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cacheBustImageUrl(project.afterImage, project.id)}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-[#FAF9F6] via-transparent to-transparent opacity-95' : 'from-[#0B0B0F] via-transparent to-transparent opacity-90'}`} />
                </div>
                <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-[10px] font-mono uppercase tracking-[0.28em] ${isLight ? 'text-[#8E6725]' : 'text-[#C9A14A]'}`}>
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-mono ${isLight ? 'text-[#6E5B44]' : 'text-gray-400'}`}>
                      {project.location}
                    </span>
                  </div>
                  <h4 className={`text-lg font-bold transition-colors group-hover:text-[#A17628] ${isLight ? 'text-[#251B12]' : 'text-white'}`}>
                    {project.title}
                  </h4>
                  <p className={`text-xs ${isLight ? 'text-[#4F4132]' : 'text-gray-400'}`}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="consultant-anchor" className={`${isLight ? 'bg-[#FAF9F6]' : 'bg-[#0B0B0F]'} px-6 py-24`}>
        <div className="mx-auto max-w-7xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-xl space-y-3 text-center"
          >
            <div className={`inline-block rounded px-3 py-1 text-[10px] font-mono uppercase tracking-wider ${isLight ? 'border border-[#A17628]/20 bg-[#FFF7EB]/88 text-[#8E6725]' : 'border border-amber-500/20 bg-amber-500/10 text-[#C9A14A]'}`}>
              The digital twin agent
            </div>
            <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${isLight ? 'text-[#251B12]' : 'text-white'}`}>
              Match Your Architect Style
            </h2>
            <p className={`text-sm ${mutedText}`}>
              Unsure of which color temperature or texture palette satisfies your space? Take our premium 30-second interior matchmaking quiz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto max-w-4xl"
          >
            <StyleConsultant
              onPrefillContact={(style) => {
                onPrefillConsultant(style);
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
