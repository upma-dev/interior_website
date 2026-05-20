import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Service, Testimonial, WebsiteSettings, Inquiry } from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_INQUIRIES,
  INITIAL_SETTINGS,
  getStoredData,
  setStoredData
} from '../data';

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME ?? 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin123';

interface StudioContextType {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  settings: WebsiteSettings;
  adminToken: string | null;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  addProject: (p: Omit<Project, 'id'>) => void;
  updateProject: (id: string, p: Project) => void;
  deleteProject: (id: string) => void;
  addService: (s: Omit<Service, 'id'>) => void;
  updateService: (id: string, s: Service) => void;
  deleteService: (id: string) => void;
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  addInquiry: (i: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  markInquiryRead: (id: string) => void;
  deleteInquiry: (id: string) => void;
  updateSettings: (s: WebsiteSettings) => void;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>(INITIAL_SETTINGS);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize data on mount
  useEffect(() => {
    setProjects(getStoredData<Project[]>('projects', INITIAL_PROJECTS));
    setServices(getStoredData<Service[]>('services', INITIAL_SERVICES));
    setTestimonials(getStoredData<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS));
    setInquiries(getStoredData<Inquiry[]>('inquiries', INITIAL_INQUIRIES));
    setSettings(getStoredData<WebsiteSettings>('settings', INITIAL_SETTINGS));
    
    // Check if stayed logged in
    const token = localStorage.getItem('aurelia_admin_token');
    if (token) setAdminToken(token);

    // Check saved theme
    const savedTheme = localStorage.getItem('aurelia_theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    if (initialTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('aurelia_theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  // Sync to localStorage
  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    setStoredData('projects', updated);
  };

  const saveServices = (updated: Service[]) => {
    setServices(updated);
    setStoredData('services', updated);
  };

  const saveTestimonials = (updated: Testimonial[]) => {
    setTestimonials(updated);
    setStoredData('testimonials', updated);
  };

  const saveInquiries = (updated: Inquiry[]) => {
    setInquiries(updated);
    setStoredData('inquiries', updated);
  };

  const saveSettings = (updated: WebsiteSettings) => {
    setSettings(updated);
    setStoredData('settings', updated);
  };

  // CRUD actions
  const addProject = (p: Omit<Project, 'id'>) => {
    const newProj: Project = { ...p, id: `proj-${Date.now()}` };
    saveProjects([...projects, newProj]);
  };

  const updateProject = (id: string, p: Project) => {
    saveProjects(projects.map(item => item.id === id ? p : item));
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(item => item.id !== id));
  };

  const addService = (s: Omit<Service, 'id'>) => {
    const newSrv: Service = { ...s, id: `srv-${Date.now()}` };
    saveServices([...services, newSrv]);
  };

  const updateService = (id: string, s: Service) => {
    saveServices(services.map(item => item.id === id ? s : item));
  };

  const deleteService = (id: string) => {
    saveServices(services.filter(item => item.id !== id));
  };

  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = { ...t, id: `t-${Date.now()}` };
    saveTestimonials([...testimonials, newTest]);
  };

  const updateTestimonial = (id: string, t: Testimonial) => {
    saveTestimonials(testimonials.map(item => item.id === id ? t : item));
  };

  const deleteTestimonial = (id: string) => {
    saveTestimonials(testimonials.filter(item => item.id !== id));
  };

  const addInquiry = (i: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInq: Inquiry = {
      ...i,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unread'
    };
    saveInquiries([newInq, ...inquiries]);
  };

  const markInquiryRead = (id: string) => {
    saveInquiries(inquiries.map(item => item.id === id ? { ...item, status: 'read' as const } : item));
  };

  const deleteInquiry = (id: string) => {
    saveInquiries(inquiries.filter(item => item.id !== id));
  };

  const updateSettings = (s: WebsiteSettings) => {
    saveSettings(s);
  };

  const loginAdmin = (username: string, password: string): boolean => {
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = `token-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      setAdminToken(token);
      localStorage.setItem('aurelia_admin_token', token);
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem('aurelia_admin_token');
  };

  return (
    <StudioContext.Provider
      value={{
        projects,
        services,
        testimonials,
        inquiries,
        settings,
        adminToken,
        theme,
        toggleTheme,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addInquiry,
        markInquiryRead,
        deleteInquiry,
        updateSettings,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (context === undefined) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
