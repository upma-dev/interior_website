import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ArrowLeft, ArrowRight, User, CircleUser, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const { testimonials, addTestimonial } = useStudio();
  const [activeIndex, setActiveIndex] = useState(0);

  // Form states to submit client testimony
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  // Auto sliding carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    addTestimonial({
      name,
      role: role || 'Private Clientele',
      company: company || 'Homeowner',
      comment,
      rating,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' // default high-class mock avatar
    });

    setSubmitted(true);
    // Reset form fields
    setName('');
    setRole('');
    setCompany('');
    setComment('');
    setRating(5);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* HEADING HEADER */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono text-[#C9A14A] tracking-wider uppercase font-semibold">
            THE CLIENT JOURNAL
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-none">
            Patron Reviews
          </h1>
          <p className="text-sm text-gray-400">
            Read transparent reviews from Managing Directors, estate owners, and developers who have experienced the Aurelia design discipline.
          </p>
        </div>

        {/* HERO CAROUSEL BLOCK */}
        {testimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto bg-[#16161C]/80 border border-white/5 backdrop-blur-md p-8 md:p-14 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Background design elements */}
            <Quote className="absolute top-6 right-6 w-24 h-24 text-white/[0.02] pointer-events-none" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#C9A14A]/5 rounded-full blur-[50px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Stars container */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A14A] text-[#C9A14A]" />
                  ))}
                </div>

                {/* Testimony body text block */}
                <p className="text-lg md:text-xl font-sans text-gray-200 leading-relaxed italic">
                  "{testimonials[activeIndex].comment}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C9A14A]/40">
                    <img
                      src={testimonials[activeIndex].avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-[#F5F5F5] leading-tight">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-xs text-gray-500 font-mono mt-0.5 uppercase">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Switch Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FEEDBACK SUBMISSION ZONE */}
        <div className="max-w-xl mx-auto bg-gradient-to-b from-[#16161C] to-[#0D0D12] border border-white/5 p-8 rounded-2xl relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A14A]/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 rounded bg-[#C9A14A]/10 text-[#C9A14A] border border-[#C9A14A]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-white">Share Your Experience</h3>
              <p className="text-[10px] font-mono text-gray-500">WILL POST LIVE ON THE REVIEWS CATALOG</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arjun Sharma"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase">Rating Score</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-[#16161C] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#C9A14A] text-xs"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (Very Good)</option>
                  <option value={3}>⭐⭐⭐ (Satisfied)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase">Role/Title (Optional)</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Creative Director"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase">Organization (Optional)</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Sharma Estates"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-500 uppercase">Your Written Testimony</label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience working with Aurelias interior designers..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A14A] text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-semibold rounded-lg text-xs uppercase tracking-wider transition-all shadow-[0_4px_10px_rgba(201,161,74,0.1)] cursor-pointer"
            >
              Post Live Commentary
            </button>

            {submitted && (
              <p className="text-xs text-center text-emerald-400 font-mono animate-bounce mt-2">
                ✓ Success! Your testimony has loaded onto the client catalog instantly.
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
