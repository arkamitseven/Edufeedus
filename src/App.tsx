import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Info, 
  BookOpen, 
  Settings, 
  Image as ImageIcon, 
  Phone, 
  FileText, 
  LayoutDashboard,
  Menu,
  X,
  Stethoscope,
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';
import { WhatsAppButton } from './components/WhatsAppButton';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const CoursesPage = React.lazy(() => import('./pages/CoursesPage'));
const AdmissionPage = React.lazy(() => import('./pages/AdmissionPage'));
const FacilitiesPage = React.lazy(() => import('./pages/FacilitiesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const PortalPage = React.lazy(() => import('./pages/PortalPage'));

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const location = useLocation();
  const { user, profile, signIn } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Facilities', path: '/facilities', icon: Settings },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Admission', path: '/admission', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">Edufeedus</span>
              <span className="text-[10px] font-medium text-primary uppercase tracking-widest block">GROUP OF INSTITUTES</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link 
                to="/portal" 
                className="btn-primary py-2 px-6"
              >
                Portal
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  className="btn-primary py-2 px-6 flex items-center gap-2"
                >
                  Login <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                    <button onClick={() => { signIn(); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Student Login</button>
                    <button onClick={() => { signIn(); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Teacher Login</button>
                    <button onClick={() => { signIn(); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Admin Login</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-primary transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-4 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                {user ? (
                  <Link 
                    to="/portal" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 btn-primary w-full"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Go to Portal
                  </Link>
                ) : (
                  <button 
                    onClick={() => { signIn(); setIsOpen(false); }} 
                    className="btn-primary w-full"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-grow">
        <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/portal/*" element={<PortalPage />} />
          </Routes>
        </React.Suspense>
      </main>
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Stethoscope className="text-white w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-white block leading-tight">Edufeedus</span>
                  <span className="text-[10px] font-medium text-primary uppercase tracking-widest block">GROUP OF INSTITUTES</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Shaping the future of healthcare Professionals in India. Edufeedus Group of Institutes provides 
                industry-ready nursing training with modern infrastructure.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/courses" className="hover:text-primary transition-colors">Our Courses</Link></li>
                <li><Link to="/facilities" className="hover:text-primary transition-colors">Infrastructure</Link></li>
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link to="/admission" className="hover:text-primary transition-colors">Admissions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-base">📍</span>
                  Nandannagar, Marak Para, Agartala, West Tripura – 799006
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary text-base">📞</span>
                  +91 8414001064
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary text-base">✉️</span>
                  contact@edufeedus.com
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Follow Us</h3>
              <p className="text-sm text-slate-400 mb-6">Stay connected with us on social media for updates and news.</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/edufeedus/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://x.com/edufeedus" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/edufeedus" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@edufeedus" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs">
            <p>© 2026 Edufeedus Group of Institutes | Designed by Arka & Team | All rights reserved.</p>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
