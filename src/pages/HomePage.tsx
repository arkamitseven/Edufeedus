import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Building2, 
  ShieldCheck,
  Star,
  Download,
  ScrollText,
  HeartPulse,
  GraduationCap,
  Stethoscope
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-primary-dark font-bold text-sm mb-6 border border-teal-100">
                <ShieldCheck className="w-4 h-4" />
                Admissions Open 2026–27
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Start Your <span className="text-primary">Nursing</span> Career with <span className="relative">Edufeedus
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-teal-200" preserveAspectRatio="none" viewBox="0 0 318 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 45C51 -11 267 -11 317 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">
                Shaping Future Healthcare Professionals with industry-ready training, 
                premium hostel facilities, scholarship & education loan support.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/admission" className="btn-primary group">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="/Edufeedus_Brochure_2026_2027.pdf" 
                  download="Edufeedus_Brochure_2026-27.pdf"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Brochure
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Seats Available', value: '60', icon: GraduationCap },
              { label: 'Books in Library', value: '700+', icon: BookOpen },
              { label: 'Multiple Labs', value: '6+', icon: Building2 },
              { label: 'Staff Members', value: '25+', icon: Users },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                  alt="Modern Campus" 
                  className="rounded-3xl shadow-xl w-full z-10 relative"
                />
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-3xl -z-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">About Edufeedus Group of Institutes</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                At Edufeedus, we are committed to excellence in healthcare education. Our vision is to empower students 
                with the clinical skills and compassionate mindset required to thrive in the complex world of modern medicine.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Focus on Healthcare Education Excellence',
                  'High-standard Nursing Laboratories',
                  'Strong Clinical Exposure and Internships'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-secondary">Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Flagship Course</h2>
          <p className="text-slate-600 mb-16 max-w-2xl mx-auto">
            Choose a career that matters. Our comprehensive programs are designed 
            to make you job-ready from day one.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="glass-card rounded-[2.5rem] overflow-hidden group hover:scale-105 transition-all duration-500 border-teal-100 border-2">
              <div className="bg-primary p-8 text-white relative">
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold">3 Years</div>
                </div>
                <GraduationCap className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">GNM Nursing</h3>
                <p className="text-teal-50 opacity-90 text-sm">General Nursing and Midwifery</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Available Seats</span>
                    <span className="font-bold text-slate-900">60</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Duration</span>
                    <span className="font-bold text-slate-900">3 Years</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Eligibility</span>
                    <span className="font-bold text-slate-900">10+2 Any Stream</span>
                  </li>
                </ul>
                <Link to="/admission" className="btn-primary w-full">Apply For Admission</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Why Students Choose Edufeedus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Education Loan Assist', desc: '100% Assistance via Vidyalaxmi Portal support.', icon: ScrollText },
              { title: 'Healthy Food', desc: 'Hygienic homemade food for hostel students.', icon: HeartPulse },
              { title: 'Mock Tests', desc: 'Regular mock tests to prepare for real-world exams.', icon: BookOpen },
              { title: 'Scholarships', desc: 'Support for SC/ST/OBC and minority students.', icon: Star },
              { title: 'Internship Support', desc: 'Clinical training at recognized Government hospitals.', icon: Stethoscope },
              { title: 'Modern Hostel', desc: 'Separate, safe and comfortable hostels for boys and girls.', icon: Building2 },
            ].map((usp, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                  <usp.icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{usp.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-medical-blue/20 blur-[120px]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Secure Your Future in <br/> Healthcare Today</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">
              Join the region's most trusted nursing institute and start your journey 
              towards a fulfilling medical career.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admission" className="btn-primary">Apply Online Now</Link>
              <a href="https://wa.me/918414001064" target="_blank" rel="noreferrer" className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10">
                Contact on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
