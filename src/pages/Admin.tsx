import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useStudio } from '../context/StudioContext';
import { cacheBustImageUrl } from '../utils/image';
import { Project, Service, Testimonial, Inquiry } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  ShieldAlert, LogOut, Check, Trash2, Edit2, Plus, LayoutGrid, FileText, Sliders, MessageSquare, Star, Settings, Eye, RefreshCw, Layers, Compass, HelpCircle, X, Menu
} from 'lucide-react';

interface AdminProps {
  setCurrentPage?: (page: string) => void;
}

export default function Admin({ setCurrentPage }: AdminProps) {
  const {
    projects, services, testimonials, inquiries, settings, adminToken,
    addProject, updateProject, deleteProject,
    addService, updateService, deleteService,
    addTestimonial, updateTestimonial, deleteTestimonial,
    markInquiryRead, deleteInquiry, updateSettings, loginAdmin, logoutAdmin,
    theme
  } = useStudio();

  const isLight = theme === 'light';
  
  // Sidebar toggle state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active admin tab: dashboard, projects, services, inquiries, testimonials, settings
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'services' | 'inquiries' | 'testimonials' | 'settings'>('dashboard');

  // Auth local states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // CRUD Toggles & Item holds
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form states - Projects
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projCat, setProjCat] = useState('Residential');
  const [projBefore, setProjBefore] = useState('');
  const [projAfter, setProjAfter] = useState('');
  const [projLoc, setProjLoc] = useState('');
  const [projClient, setProjClient] = useState('');
  const [projYear, setProjYear] = useState('2026');
  const [projFeatured, setProjFeatured] = useState(false);
  const [projBudget, setProjBudget] = useState('Bespoke Private Residence');

  // Form states - Services
  const [srvTitle, setSrvTitle] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvLong, setSrvLong] = useState('');
  const [srvDelivs, setSrvDelivs] = useState('');

  // Form states - Testimonials
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testCompany, setTestCompany] = useState('');
  const [testComment, setTestComment] = useState('');
  const [testRating, setTestRating] = useState(5);

  // Form states - Settings
  const [setHeroTitle, setSetHeroTitle] = useState(settings.heroTitle);
  const [setHeroHighlight, setSetHeroHighlight] = useState(settings.heroHighlight);
  const [setHeroSubtext, setSetHeroSubtext] = useState(settings.heroSubtext);
  const [setPhone, setSetPhone] = useState(settings.agencyPhone);
  const [setEmail, setSetEmail] = useState(settings.agencyEmail);
  const [setAddress, setSetAddress] = useState(settings.agencyAddress);
  const [setYears, setSetYears] = useState(settings.experienceYears);
  const [setScale, setSetScale] = useState(settings.completedScale);

  // Selected Inquiry state for simulation reply popup
  const [readingInquiry, setReadingInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatusSent, setReplyStatusSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    if (setCurrentPage) {
      setCurrentPage('home');
    }
  };

  // Save Project CRUD
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projAfter) return;

    if (editingProject) {
      updateProject(editingProject.id, {
        id: editingProject.id,
        title: projTitle,
        description: projDesc,
        category: projCat,
        beforeImage: projBefore || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        afterImage: projAfter,
        location: projLoc || 'New York',
        client: projClient || 'Private Clientele',
        completionYear: projYear,
        featured: projFeatured,
        budgetGrade: projBudget
      });
      setEditingProject(null);
    } else {
      addProject({
        title: projTitle,
        description: projDesc,
        category: projCat,
        beforeImage: projBefore || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
        afterImage: projAfter,
        location: projLoc || 'New York',
        client: projClient || 'Private Clientele',
        completionYear: projYear,
        featured: projFeatured,
        budgetGrade: projBudget
      });
    }

    // Reset fields
    setProjTitle('');
    setProjDesc('');
    setProjBefore('');
    setProjAfter('');
    setProjLoc('');
    setProjClient('');
    setProjYear('2026');
    setProjFeatured(false);
    setProjBudget('Executive Grade Suite');
  };

  const handleEditProjectClick = (proj: Project) => {
    setEditingProject(proj);
    setProjTitle(proj.title);
    setProjDesc(proj.description);
    setProjCat(proj.category);
    setProjBefore(proj.beforeImage);
    setProjAfter(proj.afterImage);
    setProjLoc(proj.location);
    setProjClient(proj.client);
    setProjYear(proj.completionYear);
    setProjFeatured(proj.featured);
    setProjBudget(proj.budgetGrade);
  };

  // Save Service CRUD
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvTitle || !srvDesc) return;

    const parsedDelivs = srvDelivs.split(',').map(s => s.trim()).filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        id: editingService.id,
        title: srvTitle,
        description: srvDesc,
        iconName: 'Layers',
        longDescription: srvLong,
        deliverables: parsedDelivs.length > 0 ? parsedDelivs : editingService.deliverables
      });
      setEditingService(null);
    } else {
      addService({
        title: srvTitle,
        description: srvDesc,
        iconName: 'Layers',
        longDescription: srvLong,
        deliverables: parsedDelivs.length > 0 ? parsedDelivs : ['Standard Floor blueprint', 'Material pairing list']
      });
    }

    setSrvTitle('');
    setSrvDesc('');
    setSrvLong('');
    setSrvDelivs('');
  };

  const handleEditServiceClick = (srv: Service) => {
    setEditingService(srv);
    setSrvTitle(srv.title);
    setSrvDesc(srv.description);
    setSrvLong(srv.longDescription);
    setSrvDelivs(srv.deliverables.join(', '));
  };

  // Testimonials CRUD
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testComment) return;

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, {
        id: editingTestimonial.id,
        name: testName,
        role: testRole || 'Client',
        company: testCompany || 'Homeowner',
        comment: testComment,
        rating: testRating,
        avatar: editingTestimonial.avatar
      });
      setEditingTestimonial(null);
    } else {
      addTestimonial({
        name: testName,
        role: testRole || 'Client',
        company: testCompany || 'Homeowner',
        comment: testComment,
        rating: testRating,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
      });
    }

    setTestName('');
    setTestRole('');
    setTestCompany('');
    setTestComment('');
    setTestRating(5);
  };

  const handleEditTestimonialClick = (t: Testimonial) => {
    setEditingTestimonial(t);
    setTestName(t.name);
    setTestRole(t.role);
    setTestCompany(t.company);
    setTestComment(t.comment);
    setTestRating(t.rating);
  };

  // Inquiry Response Simulation Code
  const handleSendSimulationReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage || !readingInquiry) return;
    setReplyStatusSent(true);
    markInquiryRead(readingInquiry.id);
    setTimeout(() => {
      setReplyStatusSent(false);
      setReplyMessage('');
      setReadingInquiry(null);
    }, 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      heroTitle: setHeroTitle,
      heroHighlight: setHeroHighlight,
      heroSubtext: setHeroSubtext,
      agencyPhone: setPhone,
      agencyEmail: setEmail,
      agencyAddress: setAddress,
      instagramUrl: settings.instagramUrl,
      pinterestUrl: settings.pinterestUrl,
      linkedinUrl: settings.linkedinUrl,
      experienceYears: Number(setYears),
      completedScale: Number(setScale)
    });
    alert('✓ Studio configurations saved successfully. Live pages updated.');
  };

  // Chart data formatting
  const chartData = [
    { name: 'Jan', ActiveInquiries: 4, FinishedProjects: 2 },
    { name: 'Feb', ActiveInquiries: 7, FinishedProjects: 3 },
    { name: 'Mar', ActiveInquiries: 9, FinishedProjects: 5 },
    { name: 'Apr', ActiveInquiries: 12, FinishedProjects: 6 },
    { name: 'May', ActiveInquiries: inquiries.length, FinishedProjects: projects.length }
  ];

  // Theme-aware Chart variables
  const strokeColor = isLight ? '#cbd5e1' : '#33333f';
  const textColor = isLight ? '#4f4132' : '#888888';
  const gridStrokeColor = isLight ? '#e2e8f0' : '#22222a';
  const tooltipBg = isLight ? '#ffffff' : '#16161c';
  const tooltipBorder = isLight ? '#e2e8f0' : '#2a2a35';
  const tooltipTextColor = isLight ? '#251b12' : '#ffffff';
  const gradientStart = isLight ? '#2aa18f' : '#C9A14A';
  const barColor = isLight ? '#2aa18f' : '#C9A14A';

  /* 🔐 NOT LOGGED IN UI (LOGIN FORM) */
  if (!adminToken) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 pt-24 font-sans select-none relative overflow-hidden transition-colors duration-500 ${isLight ? 'bg-[#FAF9F6] text-[#251B12]' : 'bg-[#0B0B0F] text-white'}`}>
        <div className={`absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none ${isLight ? 'bg-[#2aa18f]/5' : 'bg-[#C9A14A]/10'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none animate-pulse ${isLight ? 'bg-[#2aa18f]/3' : 'bg-amber-500/5'}`} />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className={`w-full max-w-md backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-8 relative z-10 border transition-all ${isLight
            ? 'bg-white/90 border-slate-200/80 shadow-[0_25px_60px_rgba(42,161,143,0.12)]'
            : 'bg-[#16161C]/90 border-white/5 shadow-[0_0_40px_rgba(201,161,74,0.05)]'
            }`}
        >
          <div className="text-center space-y-2">
            <div className={`inline-flex p-3 rounded-xl border mb-2 ${isLight ? 'bg-[#2aa18f]/10 border-[#2aa18f]/30 text-[#2aa18f]' : 'bg-amber-500/10 border-amber-500/30 text-[#C9A14A]'}`}>
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <h2 className={`text-2xl font-bold tracking-tight leading-none ${isLight ? 'text-[#251B12]' : 'text-white'}`}>Studio Secure Core</h2>
            <p className={`text-xs font-mono ${isLight ? 'text-[#6b5d4f]' : 'text-gray-500'}`}>Use your private admin credentials from the environment.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-[#6b5d4f]' : 'text-gray-400'}`}>Admin username</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className={`w-full border rounded-lg p-3 text-xs transition-all focus:outline-none ${isLight
                  ? 'bg-slate-50 border-slate-200 text-[#251B12] placeholder-slate-400 focus:border-[#2aa18f] focus:bg-white'
                  : 'bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-[#C9A14A]'
                  }`}
              />
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? 'text-[#6b5d4f]' : 'text-gray-400'}`}>Admin password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full border rounded-lg p-3 text-xs transition-all focus:outline-none ${isLight
                  ? 'bg-slate-50 border-slate-200 text-[#251B12] placeholder-slate-400 focus:border-[#2aa18f] focus:bg-white'
                  : 'bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-[#C9A14A]'
                  }`}
              />
            </div>

            {authError && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-mono"
              >
                Invalid admin credentials.
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              type="submit"
              className={`w-full py-3 font-bold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer shadow-md ${isLight
                ? 'bg-[#2aa18f] hover:bg-[#228475] text-white shadow-[0_8px_20px_rgba(42,161,143,0.25)]'
                : 'bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F]'
                }`}
            >
              Enter dashboard
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* 💻 LOGGED IN CONTAINER */
  return (
    <div className={`min-h-screen flex flex-col md:flex-row gap-0 md:gap-6 font-sans w-full md:px-6 md:py-6 transition-colors duration-500 ${isLight ? 'bg-[#FAF9F6] text-[#251B12]' : 'bg-[#0B0B0F] text-white'}`}>

      {/* HAMBURGER MENU BUTTON - Visible on mobile only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-transparent p-4 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg border ${isLight ? 'bg-white border-slate-200 text-[#251B12]' : 'bg-[#16161C] border-white/10 text-white'}`}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
        <h1 className={`text-sm font-bold ${isLight ? 'text-[#251B12]' : 'text-white'}`}>Admin Panel</h1>
        <div className="w-10" />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* SIDEBAR NAVIGATION TAB DOCK */}
      <aside className={`fixed md:relative top-0 left-0 h-screen md:h-fit z-40 w-64 md:w-72 md:flex-shrink-0 border border-r md:border md:border-b-0 p-4 md:p-6 rounded-r-2xl md:rounded-2xl flex flex-col justify-between gap-6 md:sticky md:top-6 transition-all transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isLight ? 'bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(42,161,143,0.04)]' : 'bg-[#16161C] border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'}`}>

        <div className="space-y-4 md:space-y-6">
          <div className={`flex items-center gap-2 pb-3 md:pb-4 border-b justify-between ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 ${isLight ? 'bg-[#2aa18f]/10 border-[#2aa18f]/20 text-[#2aa18f]' : 'bg-[#C9A14A]/10 border-[#C9A14A]/25 text-[#C9A14A]'
                }`}>
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className={`font-sans font-extrabold text-sm truncate ${isLight ? 'text-[#251B12]' : 'text-white'}`}>Control Base</h3>
                <p className={`text-[8px] md:text-[9px] font-mono tracking-wider uppercase truncate ${isLight ? 'text-[#2aa18f]' : 'text-[#C9A14A]'}`}>SESSION</p>
              </div>
            </div>
            
            {/* Close Button for Mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(false)}
              className={`md:hidden p-1.5 rounded-lg flex-shrink-0 ${isLight ? 'hover:bg-slate-100 text-[#251B12]' : 'hover:bg-white/10 text-white'}`}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex flex-col gap-1 font-mono text-xs">
            {[
              { id: 'dashboard', label: 'Metrics', count: null, icon: LayoutGrid },
              { id: 'projects', label: 'Projects', count: projects.length, icon: FileText },
              { id: 'services', label: 'Services', count: services.length, icon: Sliders },
              { id: 'inquiries', label: 'Inquiries', count: inquiries.filter(i => i.status === 'unread').length, icon: MessageSquare, isBadge: true },
              { id: 'testimonials', label: 'Reviews', count: testimonials.length, icon: Star },
              { id: 'settings', label: 'Settings', count: null, icon: Settings }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <div key={tab.id} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminTab"
                      className={`absolute inset-0 rounded-lg ${isLight ? 'bg-[#2aa18f]' : 'bg-[#C9A14A]'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.button
                    whileHover={{ x: isActive ? 0 : 2 }}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSidebarOpen(false);
                    }}
                    className={`relative z-10 flex items-center justify-between px-3 py-2 rounded-lg text-left select-none focus:outline-none cursor-pointer w-full transition-colors ${isActive
                      ? (isLight ? 'text-white font-bold' : 'text-[#0B0B0F] font-bold')
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.count !== null && (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-sans font-bold leading-none flex-shrink-0 ml-1 ${isActive
                        ? (isLight ? 'bg-white/20 text-white' : 'bg-black/10 text-[#0B0B0F]')
                        : (tab.isBadge && tab.count > 0
                          ? 'bg-amber-500 text-white animate-pulse'
                          : (isLight ? 'bg-slate-100 text-[#4f4132]' : 'bg-white/5 text-gray-400'))
                        }`}>
                        {tab.count}
                      </span>
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-left text-xs font-mono uppercase tracking-widest cursor-pointer w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Exit</span>
        </motion.button>

      </aside>

      {/* PRIMARY ACTIVE DISPLAY PANEL */}
      <main className="flex-1 pb-20 overflow-x-hidden space-y-8 w-full pt-20 md:pt-0 md:max-w-5xl md:mx-auto md:flex-1">

        {/* TAB 1: DASHBOARD ANALYTICS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 px-4 sm:px-6 md:px-0">

            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Active Metrics</h1>
                <p className="text-xs text-gray-500 font-mono">LIVE ARCHITECTURAL PIPELINE OVERVIEW</p>
              </div>
            </div>

            {/* Counters Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase">Total Selected Works</span>
                <p className="text-2xl font-sans font-black text-white">{projects.length}</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase">Inbound Inquiries</span>
                <p className="text-2xl font-sans font-black text-[#C9A14A]">{inquiries.length}</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] font-mono text-amber-500 uppercase font-bold">Unread Mail</span>
                <p className="text-2xl font-sans font-black text-amber-400">{inquiries.filter(i => i.status === 'unread').length}</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase">Client Testimonies</span>
                <p className="text-2xl font-sans font-black text-white">{testimonials.length}</p>
              </div>
            </div>

            {/* Beautiful Custom Recharts Analytics charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Inquiry Area Map */}
              <div className="bg-[#16161C] border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-sans font-semibold text-sm">Monthly Inbound Activity Spectrum</h3>
                <div className="w-full h-64 mt-2 min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A14A" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#C9A14A" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="name" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#16161C', border: '1px solid #333' }} />
                      <Area type="monotone" dataKey="ActiveInquiries" stroke="#C9A14A" fillOpacity={1} fill="url(#colorInq)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Works Bar Chart */}
              <div className="bg-[#16161C] border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="font-sans font-semibold text-sm">Design Outputs Index Pipeline</h3>
                <div className="w-full h-64 mt-2 min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="name" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#16161C', border: '1px solid #333' }} />
                      <Bar dataKey="FinishedProjects" fill="#C9A14A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Recent Inquiries List inside dashboard */}
            <div className="bg-[#16161C] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="font-sans font-semibold text-sm">Recent Incoming Inquiry Packets</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] text-gray-400">
                  <thead className="text-gray-600 bg-white/[0.02] uppercase">
                    <tr>
                      <th className="p-3">Sender</th>
                      <th className="p-3">Focus Category</th>
                      <th className="p-3">Budget Option</th>
                      <th className="p-3">Condition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {inquiries.slice(0, 4).map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/[0.01]">
                        <td className="p-3 text-white font-sans font-semibold">{inq.name}</td>
                        <td className="p-3">{inq.serviceType}</td>
                        <td className="p-3">{inq.budgetBracket}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] ${inq.status === 'unread' ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-gray-500'}`}>
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PORTFOLIO LISTING / ADD / UPDATE PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-8 px-4 sm:px-6 md:px-0">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Bespoke Finished Works</h1>
                <p className="text-xs text-gray-400 font-mono">CONSTRUST, CHOP, EDIT SELECTED GALLERIES</p>
              </div>
            </div>

            {/* Project Entry Form */}
            <div className="bg-[#16161C] border border-white/5 rounded-2xl p-4 md:p-6 space-y-6">
              <h3 className="font-sans font-bold text-lg text-white">
                {editingProject ? '✎ Modify Selected Layout Spec' : '＋ Add Luxury Masterpiece Entry'}
              </h3>

              <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-gray-500">PROJECT SYSTEM TITLE</label>
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="e.g. The Sapphire Penthouse"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#C9A14A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">SPEC CATEGORY</label>
                  <select
                    value={projCat}
                    onChange={(e) => setProjCat(e.target.value)}
                    className="w-full bg-[#16161C] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#C9A14A]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">BEFORE RENOVATION IMAGE (UNSPLASH URL)</label>
                  <input
                    type="text"
                    value={projBefore}
                    onChange={(e) => setProjBefore(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">AFTER BESPOKE RENDERED IMAGE (UNSPLASH URL)</label>
                  <input
                    type="text"
                    required
                    value={projAfter}
                    onChange={(e) => setProjAfter(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">CLIENT FULL NAME</label>
                  <input
                    type="text"
                    value={projClient}
                    onChange={(e) => setProjClient(e.target.value)}
                    placeholder="e.g. Alexander Thorne"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">BUDGET GRADE STYLE</label>
                  <input
                    type="text"
                    value={projBudget}
                    onChange={(e) => setProjBudget(e.target.value)}
                    placeholder="e.g. Ultra-Luxury Penthouse"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-500">GRID LOCATION</label>
                    <input
                      type="text"
                      value={projLoc}
                      onChange={(e) => setProjLoc(e.target.value)}
                      placeholder="Geneva, CH"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500">COMPLETION YEAR</label>
                    <input
                      type="text"
                      value={projYear}
                      onChange={(e) => setProjYear(e.target.value)}
                      placeholder="2026"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-box"
                    checked={projFeatured}
                    onChange={(e) => setProjFeatured(e.target.checked)}
                    className="rounded border-white/15 text-[#C9A14A] focus:ring-[#C9A14A]"
                  />
                  <label htmlFor="featured-box" className="text-white">Pin onto featured Homepage banner reel</label>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-gray-500">ARCHITECTURAL LOG OR TEXT BRIEF</label>
                  <textarea
                    rows={4}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="e.g. A deep atmospheric penthouse centered on wood acoustic alignments..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white resize-none text-xs"
                  />
                </div>

                <div className="md:col-span-2 flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-bold rounded-lg uppercase tracking-wider text-xs"
                  >
                    {editingProject ? 'Save Spec Change' : 'Transmit live to portfolio catalog'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg uppercase tracking-wider text-xs"
                    >
                      Bypass Change
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Projects Table List */}
            <div className="bg-[#16161C] border border-white/5 rounded-2xl p-6">
              <h3 className="font-sans font-semibold text-sm mb-4">Active Portfolio Catalog Matrix</h3>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-white/[0.01] border border-white/5 rounded-xl gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <img src={cacheBustImageUrl(proj.afterImage, proj.id)} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[#F5F5F5] leading-tight text-sm">{proj.title}</h4>
                        <p className="text-[10px] font-mono text-gray-500 uppercase mt-1">{proj.category} | {proj.location}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto sm:justify-end">
                      <button
                        onClick={() => handleEditProjectClick(proj)}
                        className="flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-gray-400 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/15 rounded-lg text-xs font-mono text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Chop</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-8 px-4 sm:px-6 md:px-0">
            <div className="flex justify-between items-center pb-4 border-[#16161c] border-b">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Active Studio Disciplines</h1>
                <p className="text-xs text-gray-400 font-mono">MANAGE ARCHITECTURE SPEC SERVICES</p>
              </div>
            </div>

            {/* Service Form */}
            <div className="bg-[#16161C] border border-white/5 rounded-2xl p-4 md:p-6 space-y-6">
              <h3 className="font-sans font-bold text-lg text-white">
                {editingService ? '✎ Alter Selected Service' : '＋ Add Custom Design Discipline'}
              </h3>

              <form onSubmit={handleSaveService} className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-gray-500">SERVICE SYSTEM HEADLINE</label>
                  <input
                    type="text"
                    required
                    value={srvTitle}
                    onChange={(e) => setSrvTitle(e.target.value)}
                    placeholder="e.g. Master Chef Kitchen Geometry"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">SHORT ABSTRACT PROFILE</label>
                  <input
                    type="text"
                    required
                    value={srvDesc}
                    onChange={(e) => setSrvDesc(e.target.value)}
                    placeholder="A turnkey setup blending custom cabinetry with concealed heavy appliances..."
                    className="w-full bg-white/5 border border-[#444] rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">SPECIFICATION DELIVERABLES CHECKLIST KEYS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={srvDelivs}
                    onChange={(e) => setSrvDelivs(e.target.value)}
                    placeholder="Concept boards, Hardware maps, ventilation schematics..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">DETAILED NARRATIVE PROPOSAL BRIEF</label>
                  <textarea
                    rows={4}
                    value={srvLong}
                    onChange={(e) => setSrvLong(e.target.value)}
                    placeholder="Provide a long description highlighting design philosophy, material recommendations, and lighting metrics..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-bold rounded-lg uppercase tracking-wider text-xs"
                  >
                    {editingService ? 'Save Discipline Change' : 'Broadcast live discipline'}
                  </button>
                  {editingService && (
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg uppercase text-xs"
                    >
                      Bypass
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Table */}
            <div className="bg-[#16161C] border border-white/5 rounded-2xl p-6">
              <h3 className="font-sans font-semibold text-sm mb-4">Core Competency Matrix</h3>
              <div className="space-y-4">
                {services.map((srv) => (
                  <div key={srv.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-sans font-bold text-[#F5F5F5] text-base">{srv.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{srv.description}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleEditServiceClick(srv)}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteService(srv.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CONTACT INBOX / DISMISS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 px-4 sm:px-6 md:px-0">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Studio Mailbox</h1>
                <p className="text-xs text-gray-400 font-mono">SECURE INBOUND DESIGN CONDUIT HANDLER</p>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-4 md:p-6 bg-[#16161C] border rounded-2xl transition-all relative ${inq.status === 'unread' ? 'border-amber-500/20 bg-gradient-to-r from-[#1E1A16] to-[#16161C] shadow-md' : 'border-white/5'
                    }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans font-bold text-lg text-white">{inq.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-black ${inq.status === 'unread' ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-gray-500'}`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#C9A14A] font-mono leading-none">
                        Category: {inq.serviceType} | Preference: {inq.budgetBracket}
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-1 pt-0.5">
                        Transmitted: {new Date(inq.date).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setReadingInquiry(inq)}
                        className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl font-mono text-xs flex items-center gap-1.5 focus:outline-none"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect & Respond</span>
                      </button>
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-blue-700 font-sans mt-4 leading-relaxed border-l border-white/10 pl-3">
                    "{inq.message}"
                  </p>
                </div>
              ))}

              {inquiries.length === 0 && (
                <div className="p-12 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-2xl">
                  <p className="text-sm font-mono text-gray-500">STUDIO CORES ARE COMPLETELY CLEAN. ZERO MAIL SUBS.</p>
                </div>
              )}
            </div>

            {/* RESPONSE COMPOSITION DIALOG POPUP SIMULATION */}
            {readingInquiry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-[#16161C] border border-white/10 p-6 md:p-8 rounded-2xl max-w-lg w-full relative space-y-4">

                  <button
                    onClick={() => setReadingInquiry(null)}
                    className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#C9A14A]">RESPOND BLUEPRINT DIALOG</span>
                    <h3 className="text-lg font-sans font-bold">Mail to {readingInquiry.name}</h3>
                    <p className="text-[10px] font-mono text-gray-500 break-all">Recipient Desk: {readingInquiry.email}</p>
                  </div>

                  <form onSubmit={handleSendSimulationReply} className="space-y-4 text-xs font-mono pt-3">
                    <div className="space-y-1.5">
                      <label className="text-gray-500">COMPOSE SECURE RESPONSE TRANSCRIPT</label>
                      <textarea
                        required
                        rows={5}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder={`Dear ${readingInquiry.name},\nThank you for transmitting your floor specifications to Aurelia. Our Principal Architect will arrive at your coordinates next week...`}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none resize-none text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Transmit Email Simulation</span>
                    </button>

                    {replyStatusSent && (
                      <p className="text-xs text-center text-emerald-400 font-mono animate-pulse mt-2">
                        ✓ Transmission Complete. Inquiry status updated to READ. Closing panel.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 5: TESTIMONIAL MANAGEMENT */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8 px-4 sm:px-6 md:px-0">
            <div className="flex justify-between items-center pb-4 border-b border-light">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Client Commentary Journals</h1>
                <p className="text-xs text-gray-400 font-mono">APPEND & REGULATE REVIEWS</p>
              </div>
            </div>

            {/* Testimonial Form */}
            <div className="bg-[#16161C] border border-white/5 rounded-2xl p-4 md:p-6">
              <h3 className="font-sans font-bold text-lg text-white mb-4">
                {editingTestimonial ? '✎ Alter Testimony Spec' : '＋ Append Custom testimony'}
              </h3>

              <form onSubmit={handleSaveTestimonial} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-gray-500">CLIENT VISUAL IDENTITY NAME</label>
                  <input
                    type="text"
                    required
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="e.g. Julian Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">RATING SCALE</label>
                  <select
                    value={testRating}
                    onChange={(e) => setTestRating(Number(e.target.value))}
                    className="w-full bg-[#16161C] border border-white/10 rounded-lg p-3 text-white focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">CLIENT POSITION/ROLE</label>
                  <input
                    type="text"
                    value={testRole}
                    onChange={(e) => setTestRole(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500">ASSOCIATED ORGANIZATION</label>
                  <input
                    type="text"
                    value={testCompany}
                    onChange={(e) => setTestCompany(e.target.value)}
                    placeholder="e.g. Sterling Holdings"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-gray-500">TESTIMONY EXCERPT</label>
                  <textarea
                    required
                    rows={4}
                    value={testComment}
                    onChange={(e) => setTestComment(e.target.value)}
                    placeholder="e.g. Aurelia is one of the rare design studios that executes complex acoustic wood alignments..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white resize-none text-xs"
                  />
                </div>

                <div className="sm:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-bold rounded-lg uppercase text-xs"
                  >
                    {editingTestimonial ? 'Save testimony edits' : 'Post client testimony live'}
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              {testimonials.map((test) => (
                <div key={test.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-start gap-4 justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#C9A14A]/30">
                      <img src={cacheBustImageUrl(test.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", test.id)} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-white text-sm">{test.name}</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{test.role}, {test.company}</p>
                      <p className="text-xs text-gray-300 mt-2 font-sans italic">"{test.comment}"</p>
                    </div>
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => handleEditTestimonialClick(test)}
                      className="p-1.5 bg-white/5 rounded-lg text-gray-400 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTestimonial(test.id)}
                      className="p-1.5 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 px-4 sm:px-6 md:px-0">
            <div className="flex justify-between items-center pb-4 border-b border-light">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Studio Configuration</h1>
                <p className="text-xs text-gray-400 font-mono">DYNAMICS SYSTEM TEXT MODIFIER</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-[#16161C] border border-white/5 rounded-2xl p-4 md:p-6 space-y-6 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-1">
                  <label className="text-gray-500">HOMEPAGE HERO HEADER FIRST HALF</label>
                  <input
                    type="text"
                    required
                    value={setHeroTitle}
                    onChange={(e) => setSetHeroTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-500">HOMEPAGE HERO HEADER SECOND HALF (GOLD HIGHLIGHTED)</label>
                  <input
                    type="text"
                    required
                    value={setHeroHighlight}
                    onChange={(e) => setSetHeroHighlight(e.target.value)}
                    className="w-full bg-white/5 border border-[#666] rounded-lg p-3 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-500">HOMEPAGE DESIGN PARAGRAPH DESCRIPTOR</label>
                <textarea
                  rows={3}
                  required
                  value={setHeroSubtext}
                  onChange={(e) => setSetHeroSubtext(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white resize-none text-xs"
                />
              </div>

              <hr className="border-white/5 my-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-500">OFFICE TELEPHONE CONDUIT</label>
                  <input
                    type="text"
                    required
                    value={setPhone}
                    onChange={(e) => setSetPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-500">INBOX FOR EST DATA SUBMISSIONS</label>
                  <input
                    type="email"
                    required
                    value={setEmail}
                    onChange={(e) => setSetEmail(e.target.value)}
                    className="w-full bg-white/5 border border-[#555] rounded-lg p-3 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-500">STUDIO STREET ADDRESS LOCATION</label>
                  <input
                    type="text"
                    required
                    value={setAddress}
                    onChange={(e) => setSetAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-500">YEARS OF ACCUMULATED ARTISTRY COUNTER</label>
                  <input
                    type="number"
                    required
                    value={setYears}
                    onChange={(e) => setSetYears(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-500">PROPERTIES DELIVERED SCALE VALUE (COUNTERS)</label>
                  <input
                    type="number"
                    required
                    value={setScale}
                    onChange={(e) => setSetScale(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#C9A14A] hover:bg-[#B38D3C] text-[#0B0B0F] font-bold rounded-lg uppercase text-xs"
              >
                Save configurations & recompile templates
              </button>
            </form>
          </div>
        )}

      </main>

    </div>
  );
}
