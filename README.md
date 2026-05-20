# Aurelia Luxury Interior Design Studio

A premium, cinematic luxury interior design studio website built with React, TypeScript, and Tailwind CSS. This project showcases high-end architectural projects, services, testimonials, and provides an interactive style consultation experience.

## 🌟 Features

- **Portfolio Showcase**: Display before/after transformations of luxury interior projects
- **Service Catalog**: Detailed service offerings including residential architecture, kitchen planning, 3D visuals, and executive offices
- **Interactive Style Consultant**: AI-powered interior style matcher with archetype recommendations
- **Testimonials Section**: Client reviews with carousel navigation and submission form
- **Admin Dashboard**: Manage projects, services, testimonials, and client inquiries
- **Contact Form**: Inquiry submission with service type and budget selection
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Elegant dark theme with gold accent colors
- **Smooth Animations**: Powered by Framer Motion for seamless transitions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts (for admin analytics)
- **State Management**: React Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd luxury-interior-design-studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 📁 Project Structure

```
luxury-interior-design-studio/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── BeforeAfter.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── StyleConsultant.tsx
│   ├── context/         # React Context providers
│   │   └── StudioContext.tsx
│   ├── pages/           # Page components
│   │   ├── About.tsx
│   │   ├── Admin.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Services.tsx
│   │   └── Testimonials.tsx
│   ├── utils/           # Utility functions
│   │   └── image.ts
│   ├── App.tsx          # Main app component
│   ├── data.ts          # Initial data and storage helpers
│   ├── index.css        # Global styles
│   ├── main.tsx         # Entry point
│   └── types.ts         # TypeScript type definitions
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🎨 Design System

- **Primary Color**: Gold (#C9A14A)
- **Background**: Dark (#0B0B0F, #16161C)
- **Typography**: Sans-serif with monospace accents
- **Spacing**: Consistent 4px base unit
- **Border Radius**: Rounded corners for modern aesthetic

## 📝 Data Management

The application uses localStorage to persist:
- Projects and their before/after images
- Services and deliverables
- Client testimonials
- Contact inquiries
- Website settings

All data is initialized with premium sample content featuring Indian clients and locations.

## 🌐 Pages Overview

### Home
Hero section with cinematic branding and featured projects

### Portfolio
Grid display of interior design projects with before/after comparisons

### Services
Detailed service offerings with long descriptions and deliverables

### About
Company history, milestones, and core values

### Testimonials
Client reviews carousel with submission form for new testimonials

### Contact
Inquiry form with service type and budget selection

### Admin
Dashboard for managing all content (projects, services, testimonials, inquiries)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Contact

- **Studio**: Aurelia Luxury Interiors
- **Address**: Studio 402, Bandra Kurla Complex, Mumbai, Maharashtra
- **Phone**: +91 22 4567 8900
- **Email**: curator@aureliainteriors.in

---

Built with ❤️ for luxury interior design excellence
