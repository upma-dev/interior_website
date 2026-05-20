import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RefreshCw, Layers, Check } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface Question {
  id: number;
  label: string;
  choices: {
    key: string;
    text: string;
    description: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    label: "YOUR PREFERRED AMBIENT MOOD",
    choices: [
      { key: "A", text: "Deep Espresso Noir", description: "Rainy glass, warm shadows, concealed warm illumination." },
      { key: "B", text: "Bright Linen Breeze", description: "Light sunbeams, open vistas, organic raw timber grains." },
      { key: "C", text: "Monolithic Slate", description: "High architectural ceilings, steel structural elements, raw concrete surfaces." },
      { key: "D", text: "Heritage Velvet Lounge", description: "Mid-century brassware, rich walnuts, heavy velvets, curated antiques." }
    ]
  },
  {
    id: 2,
    label: "DOMINANT SURFACE MATERIAL",
    choices: [
      { key: "A", text: "Nero Marquina Black Marble", description: "Premium dark stone with sharp crystalline quartz veins." },
      { key: "B", text: "Bleached Kyoto Oak", description: "Lightweight, highly sustainable organic wood panels." },
      { key: "C", text: "Floating Formwork Concrete", description: "Seamless, micro-cemented gray architectural slabs." },
      { key: "D", text: "Warm Antique Walnut & Gold", description: "Rich deep brown wood polished to absolute satin precision." }
    ]
  },
  {
    id: 3,
    label: "ARCHITECTURAL LIGHTING GEOMETRY",
    choices: [
      { key: "A", text: "Concealed LED Strip Halos", description: "Hidden lines of glow providing dynamic indirect shadows." },
      { key: "B", text: "Diffused Shoji Paper Globes", description: "Zero glare, ultra-soft, wide serene illumination." },
      { key: "C", text: "Black Iron Spotlights", description: "Bold, adjustable tracks highlighting raw metal angles." },
      { key: "D", text: "Architectural Sculptural Pendants", description: "Bespoke brass ornaments acting as majestic main centerpieces." }
    ]
  }
];

interface Archetype {
  name: string;
  sub: string;
  description: string;
  colors: string[];
  materials: string[];
  vibe: string;
  imageUrl: string;
}

const ARCHETYPES: Record<string, Archetype> = {
  A: {
    name: "The Obsidian Noir",
    sub: "CINEMATIC LUXURY & DRAMATIC CONTRAST",
    description: "An elite architectural design centered on deep rich slates, matte charcoal metals, under-cabinet strip halos, and dynamic shadows. It holds a high-end mysterious, cozy yet powerful visual atmosphere.",
    colors: ["#0B0B0F", "#2A2A35", "#C9A14A", "#1D1D26"],
    materials: ["Nero Marquina Marble", "Raw Forged Metal", "Smoked Architectural Glass"],
    vibe: "Elegant, Cinematic, Luxurious",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
  },
  B: {
    name: "Organic Zen Minimalist",
    sub: "CALMING JAPANDI & SUN-DRENCHED HOLISTICS",
    description: "A restorative masterclass combining Swedish functionality with traditional Kyoto geometry. It highlights spacious negative floor layouts, soft cotton-linen fibers, and bright raw daylight.",
    colors: ["#F9F6F0", "#D3C2B0", "#8C7B6E", "#EAE3D2"],
    materials: ["Bleached Kyoto Oak", "Handmade Woven Reed", "Textured Cream Bouclé"],
    vibe: "Serene, Natural, Restorative",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
  },
  C: {
    name: "Architectural Brutalist",
    sub: "MONOLITHIC PENTHOUSE & URBAN METROPOLIS",
    description: "A striking, structural configuration highlighting structural honesty. Large-form seamless microcement floors work beautifully with custom brushed zinc screens and soaring multi-story glass columns.",
    colors: ["#4A4E54", "#8A9099", "#2E3136", "#D9DFE5"],
    materials: ["Polished Solid Concrete", "Ribbed Architectural Glass", "Industrial Brushed Steel"],
    vibe: "Bold, Boldly Angular, Avant-Garde",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  D: {
    name: "Neo-Classic Heritage",
    sub: "MID-CENTURY ITALIAN ARTISTRY & NOBLE VELVET",
    description: "Splendid classic arrangements meeting cutting-edge luxury design elements. Heavy velvet chairs in select ochre hues play beautifully against oil-slick warm solid walnut doors and hand-welded lighting fixtures.",
    colors: ["#2B1E19", "#A36D48", "#C9A14A", "#425C51"],
    materials: ["Polished Royal Walnut", "Brushed Honey Gold", "Lush Mohair Velvet"],
    vibe: "Artistic, Collector Heritage, Noble",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80"
  }
};

export default function StyleConsultant({ onPrefillContact }: { onPrefillContact: (archetype: string) => void }) {
  const { theme } = useStudio();
  const isLight = theme === 'light';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Archetype | null>(null);

  const handleChoice = (key: string) => {
    const updated = [...answers, key];
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate archetype based on majority vote, default to "A" if split
      const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
      updated.forEach(k => counts[k] = (counts[k] || 0) + 1);
      
      let winner = "A";
      let max = 0;
      Object.keys(counts).forEach(k => {
        if (counts[k] > max) {
          max = counts[k];
          winner = k;
        }
      });
      setResult(ARCHETYPES[winner]);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const shellClass = isLight
    ? 'bg-[#FFF8EE]/95 border-[#2AA18F]/16 text-[#281F17] shadow-[0_22px_64px_rgba(89,72,51,0.10)]'
    : 'bg-[#16161C]/80 border-white/5 text-white shadow-xl';

  const questionCardClass = isLight
    ? 'bg-white/80 border-[#2AA18F]/14 hover:border-[#2AA18F]/30 hover:bg-white/95'
    : 'bg-white/5 border-white/5 hover:border-[#C9A14A]/40 hover:bg-white/10';

  const labelClass = isLight ? 'text-[#4E4133]' : 'text-gray-400';

  return (
    <div className={`w-full backdrop-blur-md rounded-2xl p-6 md:p-10 relative overflow-hidden ${shellClass}`}>
      {/* Background radial gradient glow */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${isLight ? 'bg-[#2AA18F]/10' : 'bg-[#C9A14A]/5'}`} />

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg border ${isLight ? 'bg-[#2AA18F]/10 border-[#2AA18F]/20' : 'bg-[#C9A14A]/10 border-[#C9A14A]/20'}`}>
          <Sparkles className={`w-5 h-5 animate-pulse ${isLight ? 'text-[#2AA18F]' : 'text-[#C9A14A]'}`} />
        </div>
        <div>
          <h3 className={`font-sans font-medium text-lg tracking-tight ${isLight ? 'text-[#281F17]' : 'text-white'}`}>AI Interior Style Matcher</h3>
          <p className={`text-xs font-mono ${labelClass}`}>CURATED ARCHITECTURAL INTELLIGENCE EXPERT</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Step meter */}
            <div className={`flex justify-between items-center text-xs font-mono ${labelClass}`}>
              <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% COMPLETE</span>
            </div>

            <div className={`w-full h-1 rounded-full overflow-hidden ${isLight ? 'bg-[#2AA18F]/12' : 'bg-white/5'}`}>
              <div
                className={`h-full duration-300 shadow-[0_0_8px_#C9A14A] ${isLight ? 'bg-[#2AA18F]' : 'bg-[#C9A14A]'}`}
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-mono tracking-wider uppercase ${isLight ? 'text-[#2AA18F]' : 'text-[#C9A14A]'}`}>ARCHETYPE METRIC</span>
              <h4 className={`text-xl font-sans font-semibold tracking-tight ${isLight ? 'text-[#281F17]' : 'text-[#F5F5F5]'}`}>
                {QUESTIONS[currentStep].label}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS[currentStep].choices.map((choice) => (
                <button
                  key={choice.key}
                  onClick={() => handleChoice(choice.key)}
                  className={`group flex flex-col items-start p-5 text-left rounded-xl transition-all select-none cursor-pointer hover:shadow-[0_0_20px_rgba(201,161,74,0.05)] ${questionCardClass}`}
                >
                  <div className="flex justify-between w-full items-center mb-2">
                    <span className={`text-xs font-mono transition-colors ${isLight ? 'text-[#6B5D4F] group-hover:text-[#2AA18F]' : 'text-gray-500 group-hover:text-[#C9A14A]'}`}>
                      OPTION {choice.key}
                    </span>
                    <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C9A14A] transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#C9A14A] transition-colors" />
                    </div>
                  </div>
                  <h5 className="font-sans font-medium text-base text-[#F5F5F5] mb-1 group-hover:text-white transition-colors">
                    {choice.text}
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {choice.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* IMAGE SHOWCASE */}
              <div className="md:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-white/10">
                <img
                  src={result.imageUrl}
                  alt={result.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase">MATCH ARCHETYPE</span>
                  <p className="text-sm font-sans font-semibold text-white">{result.vibe}</p>
                </div>
              </div>

              {/* SPEC SHEET */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase">
                    {result.sub}
                  </span>
                  <h4 className="text-2xl font-sans font-bold text-white tracking-tight mt-1">
                    {result.name}
                  </h4>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {result.description}
                </p>

                {/* Color Palette */}
                <div>
                  <h5 className="text-xs font-mono text-[#C9A14A] uppercase tracking-wider mb-2">
                    RECOMMENDED BASE TONALITY
                  </h5>
                  <div className="flex gap-2">
                    {result.colors.map((hex, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-lg border border-white/15 shadow-inner"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[10px] font-mono text-gray-500 mt-1">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material pairings */}
                <div>
                  <h5 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    MATERIAL SPECIFICATIONS
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {result.materials.map((m, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#F5F5F5] rounded-full"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
              <button
                onClick={() => onPrefillContact(result.name)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-sans font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(201,161,74,0.3)] transition-all cursor-pointer"
              >
                <span>Draft Inquiry With This Style</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-sans font-medium rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Matcher</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
