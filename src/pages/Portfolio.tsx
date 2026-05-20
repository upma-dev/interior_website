import { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { cacheBustImageUrl } from '../utils/image';
import { Project } from '../types';
import BeforeAfter from '../components/BeforeAfter';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, User, DollarSign, X, ArrowUpRight, Maximize2 } from 'lucide-react';

export default function Portfolio() {
  const { projects } = useStudio();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Residential' | 'Kitchen' | 'Bedroom' | 'Commercial'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // List of active filter buttons
  const filters: ('All' | 'Residential' | 'Kitchen' | 'Bedroom' | 'Commercial')[] = [
    'All',
    'Residential',
    'Kitchen',
    'Bedroom',
    'Commercial'
  ];

  // Filter projects accordingly
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* TITLE */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase font-semibold">
            ARCHIVE OF SELECTED WORKS
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-none">
            Selected Layouts
          </h1>
          <p className="text-sm text-gray-400">
            A comprehensive look at private residences, corporate suites, and bespoke luxury installations managed directly by Aurelia.
          </p>
        </div>

        {/* FILTERS SHELF */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-full transition-all border cursor-pointer select-none focus:outline-none ${
                activeFilter === filter
                  ? 'bg-[#C9A14A] text-[#0B0B0F] border-[#C9A14A] font-bold shadow-[0_4px_15px_rgba(201,161,74,0.3)]'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* MASONRY/GRID PROJECTS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, index) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onClick={() => setSelectedProject(p)}
                className="group relative bg-[#16161C] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:border-[#C9A14A]/40 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={cacheBustImageUrl(p.afterImage, p.id)}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover overlay zoom trigger icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-[#C9A14A] text-[#0B0B0F] shadow-lg group-hover:rotate-12 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-2.5 py-0.5 bg-[#0B0B0F]/80 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-widest uppercase rounded">
                    {p.category}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>{p.location}</span>
                    <span>{p.completionYear}</span>
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-[#F5F5F5] group-hover:text-[#C9A14A] transition-colors leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="px-6 pb-4 flex justify-between items-center border-t border-white/[0.03] pt-3 text-[10px] font-mono text-gray-500 group-hover:text-[#C9A14A] transition-colors">
                  <span>ENGAGE SLIDER PREVIEW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-xl">
            <p className="text-sm font-mono text-gray-500">NO EXPERIMENTAL PROJECTS LISTED IN THIS METRIC</p>
          </div>
        )}

        {/* ADVANCED BEFORE/AFTER DETAIL LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#0B0B0F]/90 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-[#16161C] border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 space-y-6"
              >
                {/* Close Trigger absolute button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#C9A14A] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Upper description */}
                <div className="space-y-1.5 pr-8">
                  <span className="text-xs font-mono text-[#C9A14A] tracking-widest uppercase">
                    {selectedProject.category} TRANSFORMATION REVIEW
                  </span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Real interactive beforeafter image slider */}
                <div className="w-full">
                  <BeforeAfter
                    beforeImage={selectedProject.beforeImage}
                    afterImage={selectedProject.afterImage}
                  />
                </div>

                {/* Project Specs Matrix Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/[0.02] p-4 border border-white/5 rounded-xl text-xs font-mono">
                  <div className="space-y-1 p-2">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A14A]" />
                      <span>LOCATION</span>
                    </div>
                    <p className="font-sans font-semibold text-white pl-5">{selectedProject.location}</p>
                  </div>

                  <div className="space-y-1 p-2">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <User className="w-3.5 h-3.5 text-[#C9A14A]" />
                      <span>ACQUIRED CLIENT</span>
                    </div>
                    <p className="font-sans font-semibold text-white pl-5">{selectedProject.client}</p>
                  </div>

                  <div className="space-y-1 p-2">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-[#C9A14A]" />
                      <span>COMPLETED</span>
                    </div>
                    <p className="font-sans font-semibold text-white pl-5">{selectedProject.completionYear}</p>
                  </div>

                  <div className="space-y-1 p-2">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <DollarSign className="w-3.5 h-3.5 text-[#C9A14A]" />
                      <span>BUDGET GRADE</span>
                    </div>
                    <p className="font-sans font-semibold text-white pl-5">{selectedProject.budgetGrade}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-gray-500 uppercase">ARCHITECTURAL SPECIFICATION NARRATIVE</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
