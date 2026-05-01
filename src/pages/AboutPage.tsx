import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users2, 
  Target, 
  Eye, 
  MapPin, 
  Library, 
  Bus,
  Stethoscope,
  HeartPulse,
  Home
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-extrabold text-white mb-6"
          >
            Empowering Future <br/> <span className="text-primary">Healthcare Leaders</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Edufeedus Group of Institutes is committed to providing world-class nursing 
            education with a focus on clinical excellence and compassionate care.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-50 p-12 rounded-[3rem] relative group hover:bg-white hover:shadow-xl transition-all border border-slate-100">
            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mb-8 text-white shadow-lg shadow-teal-500/20">
              <Eye className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              To be a premier healthcare educational institution recognized globally for producing 
              highly skilled, ethically grounded, and compassionate nursing professionals 
              who lead positive changes in the healthcare ecosystem.
            </p>
          </div>
          <div className="bg-slate-50 p-12 rounded-[3rem] relative group hover:bg-white hover:shadow-xl transition-all border border-slate-100">
            <div className="w-16 h-16 bg-medical-blue rounded-3xl flex items-center justify-center mb-8 text-white shadow-lg shadow-sky-500/20">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-lg text-left">
              • Provide rigorous academic and clinical training.<br/>
              • Foster an environment of continuous learning and innovation.<br/>
              • Ensure student success through guidance and placement support.<br/>
              • Bridge the gap between education and industry requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Infrastructure Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">World-Class Infrastructure</h2>
            <p className="text-slate-500 max-w-xs mx-auto text-sm font-bold uppercase tracking-widest">Designed for Excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Separate Hostel', icon: Home, desc: 'Safe and hygienic accommodation for boys and girls.' },
              { title: 'Advanced Labs', icon: Stethoscope, desc: 'Equipped with modern mannequins and clinical tools.' },
              { title: 'Rich Library', icon: Library, desc: '700+ books, medical journals, and digital resources.' },
              { title: 'Transport', icon: Bus, desc: 'Dedicated bus service for hospital visits and students.' },
              { title: 'Smart Classes', icon: Building2, desc: 'Audio-visual enabled learning environments.' },
              { title: 'Clinical Training', icon: HeartPulse, desc: 'Internal tie-ups with AGMC & GBP Government Hospital.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow group border border-white">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Location */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-6">Visit Our Campus</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="text-primary w-6 h-6 flex-shrink-0" />
                <p className="text-slate-400">
                  Nandannagar, Marak Para, Agartala, West Tripura – 799006
                </p>
              </div>
            </div>
            <div className="mt-10">
              <button className="btn-primary">Get Directions</button>
            </div>
          </div>
          <div className="lg:w-1/2 h-80 lg:h-auto bg-slate-800">
            {/* Map Placeholder */}
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <MapPin className="w-12 h-12 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest opacity-30">Google Map Embed Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
