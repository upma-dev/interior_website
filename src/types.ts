export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  client: string;
  completionYear: string;
  featured: boolean;
  budgetGrade: string; // e.g., "Executive Suite", "Ultra-Luxury Penthouse", "Bespoke Residence"
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name matching
  longDescription: string;
  deliverables: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  budgetBracket: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface WebsiteSettings {
  heroTitle: string;
  heroHighlight: string;
  heroSubtext: string;
  agencyPhone: string;
  agencyEmail: string;
  agencyAddress: string;
  instagramUrl: string;
  pinterestUrl: string;
  linkedinUrl: string;
  experienceYears: number;
  completedScale: number; // e.g. 150+ completed
}
