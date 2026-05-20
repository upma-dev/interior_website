import { Project, Service, Testimonial, WebsiteSettings, Inquiry } from './types';

// Premium high-fidelity stock images from Unsplash
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Obsidian Penthouse',
    description: 'A dark, dramatic luxury loft designed around bespoke raw metal sheets, dark timber ceiling beams, and integrated ambient gold strip lighting.',
    category: 'Residential',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    location: 'South Mumbai, India',
    client: 'Aditya Sharma',
    completionYear: '2025',
    featured: true,
    budgetGrade: 'Ultra-Luxury Penthouse'
  },
  {
    id: 'proj-2',
    title: 'Minimalist Monolithic Kitchen',
    description: 'Seamless custom push-to-open dark matte charcoal cabinetry paired with a floating hand-carved Calacatta gold marble island.',
    category: 'Kitchen',
    beforeImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    location: 'Bangalore, Karnataka',
    client: 'Dr. Priya Verma',
    completionYear: '2025',
    featured: true,
    budgetGrade: 'Executive Grade Kitchen'
  },
  {
    id: 'proj-3',
    title: 'Zen Sanctuary Bedroom',
    description: 'A bespoke low-profile oak platform bed, custom acoustic felt wood wall paneling, and a soft concealed architectural halo design.',
    category: 'Bedroom',
    beforeImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    location: 'Pune, Maharashtra',
    client: 'Ananya & Rohan Desai',
    completionYear: '2024',
    featured: true,
    budgetGrade: 'Bespoke Private Residence'
  },
  {
    id: 'proj-4',
    title: 'Aero Dynamics Corporate Suite',
    description: 'An ergonomic executive office styled with customized brushed brass acoustic spatial sound baffles and low-iron architectural glass.',
    category: 'Commercial',
    beforeImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    location: 'Gurugram, Haryana',
    client: 'TechVenture India Ltd.',
    completionYear: '2025',
    featured: false,
    budgetGrade: 'Executive Corporate Grade'
  },
  {
    id: 'proj-5',
    title: 'Aurelia Lounge & Dining Hall',
    description: 'Mid-century Italian style lounge highlighting velvet mustard accent armchairs and a premium hand-welded architectural light pendant.',
    category: 'Residential',
    beforeImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    location: 'Delhi, India',
    client: 'Natasha Singh',
    completionYear: '2024',
    featured: false,
    budgetGrade: 'Ultra-Luxury Dining'
  },
  {
    id: 'proj-6',
    title: 'Skyline Atelier Suite',
    description: 'A serene penthouse workspace blending warm oak, softened brass lighting, and sculptural storage walls with a gallery-like atmosphere.',
    category: 'Commercial',
    beforeImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
    location: 'Mumbai, Maharashtra',
    client: 'Madhuri Kapoor',
    completionYear: '2026',
    featured: true,
    budgetGrade: 'Executive Atelier Grade'
  },
  {
    id: 'proj-7',
    title: 'The Brass & Terrazzo Kitchen',
    description: 'Custom-cast gray terrazzo countertop matched with hand-brushed solid brass cabinet pulls and integrated warm under-cabinet strip lighting.',
    category: 'Kitchen',
    beforeImage: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    location: 'Hyderabad, Telangana',
    client: 'Rajesh Patel',
    completionYear: '2025',
    featured: true,
    budgetGrade: 'Premium Bespoke Kitchen'
  },
  {
    id: 'proj-8',
    title: 'The Silk Canopy Suite',
    description: 'Soft textured silk wall linings, custom floating bedside tables, and a majestic custom-welded brass canopy bed frame overlooking private gardens.',
    category: 'Bedroom',
    beforeImage: 'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    location: 'Jaipur, Rajasthan',
    client: 'Vikram Khurana',
    completionYear: '2024',
    featured: false,
    budgetGrade: 'Heritage Estate Bedroom'
  },
  {
    id: 'proj-9',
    title: 'The Alabaster Oasis',
    description: 'A bright, airy double-height living room featuring high-honed Turkish alabaster fireplace surrounds, soft cream linen lounge chairs, and light oak floorboards.',
    category: 'Residential',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80',
    location: 'Kerala, India',
    client: 'Neha & Arjun Nair',
    completionYear: '2025',
    featured: true,
    budgetGrade: 'Ultra-Luxury Villa'
  },
  {
    id: 'proj-10',
    title: 'The Emerald Boardroom',
    description: 'Rich emerald green lacquer walls, a large-form oval solid walnut table, and custom leather seating with hidden workspace connectivity panels.',
    category: 'Commercial',
    beforeImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
    location: 'Noida, Uttar Pradesh',
    client: 'Indus Global Tech',
    completionYear: '2026',
    featured: false,
    budgetGrade: 'High-End Corporate Boardroom'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Residential Architecture',
    description: 'Turnkey interior architecture for ultra-luxury penthouses, seaside estates, and premium high-rise villas.',
    iconName: 'Home',
    longDescription: 'We craft comprehensive architectural floor planning, electrical designs, lighting schematics, and structural coordination. Our premium layouts maximize natural lighting while ensuring standard comfort in every quadrant of your private living space.',
    deliverables: ['Custom Concept Boards', 'Detailed 2D Floor Plans', 'Lighting & Power Layouts', 'Material Specification Register']
  },
  {
    id: 'srv-2',
    title: 'Cinematic Kitchen Planning',
    description: 'Designing fully bespoke master chef grade kitchens blending professional functionality and invisible technology.',
    iconName: 'ChefHat',
    longDescription: 'From high-definition seamless cabinetry to hand-cut marble breakfast bars, we provide kitchen spaces that balance luxurious dining setup with peak ergonomic efficiency. All heavy utilities are neatly concealed behind luxurious acoustic panels.',
    deliverables: ['Stone Selection Procurement', 'Hardware Fitting Schematics', 'Appliance Integration Design', 'Ventilation Planning']
  },
  {
    id: 'srv-3',
    title: 'High-Fidelity 3D Visuals',
    description: 'Ultra-photorealistic 3D rendering projections using digital twins, complex lighting maps, and precise texture details.',
    iconName: 'Sparkles',
    longDescription: 'Experience your spaces before they are built. We compile highly precise lighting setups, environment maps, and realistic fabric normal mapping to render premium immersive visuals, saving expensive pre-production material layout errors.',
    deliverables: ['12K High-Definition Renderings', '360° VR Immersive Tours', 'Material Sample Pairing Guides', 'Daylight Cycle Animations']
  },
  {
    id: 'srv-4',
    title: 'Executive Offices & Suites',
    description: 'Acoustically treated, productivity-optimized commercial executive workspaces that showcase branding power.',
    iconName: 'Briefcase',
    longDescription: 'Professional corporate layouts with modern ergonomic task desks, soundproof architectural partitions, warm luxury boardrooms, and highly attractive lounge areas designed specifically to cultivate collaborative and creative thinking.',
    deliverables: ['Space Efficiency Diagnostics', 'Acoustic Barrier Planning', 'Custom Boardroom Joinery', 'Brand Color Palette Balance']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Arjun Sharma',
    role: 'Managing Director',
    company: 'Sharma Estates Pvt Ltd',
    comment: 'The team at Aurelia transformed our dull industrial loft into a breathtaking, warm obsidian workspace. Their attention to lighting accents and premium matte metal textures represents peak modern interior artistry.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-2',
    name: 'Dr. Priya Verma',
    role: 'Neurosurgeon',
    company: 'Apollo Hospitals Group',
    comment: 'The monolithic kitchen they designed is a masterclass in clean geometry and premium ergonomics. Everything is tucked away beautifully, leaving a stunningly clean line that receives endless compliments from my guests.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-3',
    name: 'Rahul Mehta',
    role: 'Principal Architect',
    company: 'Mehta & Associates Architects',
    comment: 'As a fellow architect, I have extremely high standards for craftsmanship and precision. Aurelia is one of the rare design studios that executes complex acoustic wood alignments with flawless structural tolerances.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Vikram Malhotra',
    email: 'vikram@malhotragroup.com',
    phone: '+91 98765 43210',
    serviceType: 'Residential Architecture',
    budgetBracket: 'Ultra-Luxury ($100k+)',
    message: 'We recently acquired a penthouse in South Mumbai and require standard-setting luxury interior architecture. Looking for high contrast, dark rich stones, and custom acoustic ceiling panels.',
    date: '2026-05-18T10:30:00Z',
    status: 'unread'
  },
  {
    id: 'inq-2',
    name: 'Ananya Kapoor',
    email: 'ananya@creativepulse.in',
    phone: '+91 98765 43211',
    serviceType: 'Executive Offices & Suites',
    budgetBracket: 'Premium ($50k - $100k)',
    message: 'Seeking a sleek design overhaul for our creative advertising agency workspace in Bangalore. Need ergonomic desks, an open floor lounge, and high-fidelity textures.',
    date: '2026-05-19T14:15:00Z',
    status: 'read'
  }
];

export const INITIAL_SETTINGS: WebsiteSettings = {
  heroTitle: 'CRAFTING CINEMATIC',
  heroHighlight: 'LUXURY INTERIORS',
  heroSubtext: 'Bespoke high-end architectural coordination & dramatic spaces designed for those who value standard-setting aesthetic precision.',
  agencyPhone: '+91 22 4567 8900',
  agencyEmail: 'curator@aureliainteriors.in',
  agencyAddress: 'Studio 402, Bandra Kurla Complex, Mumbai, Maharashtra',
  instagramUrl: 'https://instagram.com/aurelia.studio',
  pinterestUrl: 'https://pinterest.com/aureliadesigns',
  linkedinUrl: 'https://linkedin.com/company/aurelia-interiors',
  experienceYears: 12,
  completedScale: 240
};

// LocalStorage Helper functions to persist modifications securely in the sandbox browser!
const STORAGE_PREFIX = 'aurelia_interior_';

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
