import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Home, 
  Library, 
  Bus, 
  Wifi, 
  Utensils, 
  ShieldCheck, 
  Stethoscope,
  Microscope,
  Baby,
  Monitor,
  HeartPulse
} from 'lucide-react';

const FacilitiesPage = () => {
  const facilities = [
    {
      title: 'Nursing Laboratories',
      icon: Stethoscope,
      desc: 'Our specialized labs are designed to simulate real-world clinical environments.',
      items: [
        { name: 'Foundation Lab', icon: Microscope },
        { name: 'CHN & Nutrition Lab', icon: Utensils },
        { name: 'OBG & Pediatrics Lab', icon: Baby },
        { name: 'Pre-clinical Lab', icon: HeartPulse },
        { name: 'Computer Lab', icon: Monitor },
      ]
    },
    {
      title: 'Student Accommodation',
      icon: Home,
      desc: 'Comfortable and safe living spaces located within or near the campus.',
      items: [
        { name: 'Separate Boys Hostel', icon: ShieldCheck },
        { name: 'Separate Girls Hostel', icon: ShieldCheck },
        { name: 'Homemade Food', icon: Utensils },
        { name: '24/7 Security', icon: ShieldCheck },
        { name: 'Common Room', icon: Tv },
      ]
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6"
          >
            Premier <span className="text-primary">Campus Facilities</span>
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We believe that a conducive environment is key to learning. Our campus is 
            equipped with modern infrastructure to support your academic and personal growth.
          </p>
        </div>

        {facilities.map((fac, idx) => (
          <div key={idx} className="mb-24 last:mb-0">
            <div className="flex flex-col lg:flex-row gap-12 items-start mb-12">
              <div className="lg:w-1/3">
                <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center mb-6">
                  <fac.icon className="text-primary w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{fac.title}</h2>
                <p className="text-slate-500 leading-relaxed">{fac.desc}</p>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fac.items.map((item, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-lg transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-[3rem] overflow-hidden shadow-xl aspect-video bg-slate-200 relative group">
              <img 
                src={idx === 0 
                  ? "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop" 
                  : "https://images.unsplash.com/photo-1555854817-5b2247a8175f?q=80&w=2070&auto=format&fit=crop"
                } 
                alt={fac.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest">
                  Infrastructure
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Other Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
          <div className="flex gap-8 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-medical-blue/20 blur-3xl group-hover:scale-150 transition-transform" />
            <Library className="w-16 h-16 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Library (700+ Books)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our library is a treasure house of knowledge with a vast collection of medical journals, 
                reports, and textbooks from world-renowned authors.
              </p>
            </div>
          </div>
          <div className="flex gap-8 p-10 bg-primary rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl group-hover:scale-150 transition-transform" />
            <Bus className="w-16 h-16 text-white flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Dedicated Transport</h3>
              <p className="text-teal-50 text-sm leading-relaxed opacity-90">
                Safe and timely transport for students and staff to various clinical sites 
                and hospitals (AGMC & GBP Hospital, IGM) for clinical training and rotational duties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tv = ({className}: {className?: string}) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
    <polyline points="17 2 12 7 7 2"></polyline>
  </svg>
);

export default FacilitiesPage;
