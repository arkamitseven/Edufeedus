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
  Home,
  UserCheck
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

      {/* About the Management */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <span className="text-primary font-bold text-xs uppercase tracking-widest px-4 py-1.5 bg-teal-50 rounded-full border border-teal-100 inline-block mb-3">
              Leadership & Guidance
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">About the Management</h2>
          </div>

          {/* Chairman */}
          <div className="bg-white rounded-[3rem] p-8 lg:p-12 border border-slate-200/80 shadow-sm max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100 flex-shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden mb-4 border-2 border-primary/30 shadow-md flex-shrink-0 bg-slate-100 relative group">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1mGDbnvhHgAQOUg885h6sZBsHqN3eTH_-" 
                    onError={(e) => {
                      // Fallback to alternative Google Drive direct thumbnail format if needed
                      (e.currentTarget as HTMLImageElement).src = "https://drive.google.com/thumbnail?id=1mGDbnvhHgAQOUg885h6sZBsHqN3eTH_-&sz=w800";
                    }}
                    alt="Mr. Debasish Datta - Chairman" 
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Mr. Debasish Datta</h3>
                <p className="text-primary font-bold text-sm mt-1">Chairman</p>
                <p className="text-slate-500 text-xs font-semibold mt-1 uppercase tracking-wider">Edufeedus Group of Institutes</p>
              </div>

              <div className="w-full md:w-2/3 space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  Mr. Debasish Datta serves as the Chairman of Edufeedus Group of Institutes, providing visionary leadership and strategic direction in the institution's pursuit of academic excellence and social responsibility. Guided by the conviction that education has the power to transform lives and strengthen communities, he has been instrumental in fostering an environment that promotes quality learning, integrity, and innovation.
                </p>
                <p>
                  As Chairman, Mr. Datta is committed to building an institution that not only delivers high standards of professional education but also nurtures ethical values, discipline, and a spirit of service. His leadership is driven by a long-term vision of developing competent healthcare professionals who are prepared to meet the evolving needs of society with knowledge, compassion, and professionalism.
                </p>
                <p>
                  Under his guidance, Edufeedus Group of Institutes has embraced a culture of continuous improvement, student-centric learning, and institutional excellence. He firmly believes that an educational institution should serve as a platform for personal growth, professional development, and lifelong learning, empowering students to become responsible citizens and future leaders.
                </p>
                <p>
                  With a steadfast commitment to excellence, transparency, and sustainable growth, Mr. Datta continues to inspire the institution's journey toward becoming a distinguished centre of healthcare education. His dedication to nurturing talent, strengthening academic standards, and creating meaningful opportunities for students remains at the heart of Edufeedus Group of Institutes' mission and future aspirations.
                </p>
              </div>
            </div>
          </div>

          {/* Managing Director */}
          <div className="bg-white rounded-[3rem] p-8 lg:p-12 border border-slate-200/80 shadow-sm max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100 flex-shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden mb-4 border-2 border-primary/30 shadow-md flex-shrink-0 bg-slate-100 relative group">
                  <img 
                    src="https://lh3.googleusercontent.com/d/18EhrBAr_pOkztOhsZPjdySdql-4x9OOu" 
                    onError={(e) => {
                      // Fallback to Google Drive direct thumbnail format if needed
                      (e.currentTarget as HTMLImageElement).src = "https://drive.google.com/thumbnail?id=18EhrBAr_pOkztOhsZPjdySdql-4x9OOu&sz=w800";
                    }}
                    alt="Mr. Amit Das - Managing Director" 
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Mr. Amit Das</h3>
                <p className="text-primary font-bold text-sm mt-1">Managing Director</p>
                <p className="text-slate-500 text-xs font-semibold mt-1 uppercase tracking-wider">Edufeedus Group of Institutes</p>
              </div>

              <div className="w-full md:w-2/3 space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  Mr. Amit Das is the visionary Managing Director of Edufeedus Group of Institutes, dedicated to building an institution that empowers aspiring healthcare professionals through quality education, innovation, and ethical leadership. With expertise in institutional administration, strategic planning, technology, branding, and organizational development, he has played a pivotal role in establishing Edufeedus as one of the emerging centres for nursing education in Tripura.
                </p>
                <p>
                  Driven by the belief that education is the foundation of a progressive society, Mr. Das has consistently focused on creating an academic ecosystem where knowledge, practical exposure, discipline, and compassion come together to prepare students for successful professional careers. His leadership philosophy emphasizes academic excellence, transparency, continuous improvement, and student-centric development.
                </p>
                <p>
                  Under his guidance, Edufeedus Group of Institutes has developed modern infrastructure, strengthened clinical training partnerships, and adopted innovative approaches to teaching and learning. His vision extends beyond classroom education—he is committed to nurturing confident, competent, and socially responsible healthcare professionals who can contribute meaningfully to the nation's healthcare system.
                </p>
                <p>
                  As a forward-thinking education entrepreneur, Mr. Das continues to lead the institution with a clear mission: to make quality professional education accessible, industry-relevant, and globally competitive. His long-term vision is to transform Edufeedus into a centre of excellence in healthcare education by expanding academic opportunities, embracing innovation, fostering research, and creating an environment that inspires lifelong learning.
                </p>
                <p>
                  Through his unwavering commitment to excellence, integrity, and service, Mr. Das continues to shape the future of Edufeedus Group of Institutes and inspire the next generation of healthcare professionals to lead with knowledge, compassion, and purpose.
                </p>
              </div>
            </div>
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
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">Edufeedus Group of Institutes</span>
            <h2 className="text-3xl font-bold text-white mb-6">Visit Our Campus</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-1">Campus Address</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Nandannagar, Marak Para, Agartala, West Tripura – 799006
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Building2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-1">Nearby Landmark</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Close to AGMC & GBP Government Hospital, Agartala
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Edufeedus+Group+of+Institutes+Nandannagar+Agartala+Tripura" 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" /> Get Directions on Google Maps
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 min-h-[320px] lg:min-h-[420px] bg-slate-800 relative">
            <iframe 
              title="Edufeedus Group of Institutes Location Map"
              src="https://maps.google.com/maps?q=Nandannagar,+Marak+Para,+Agartala,+West+Tripura+-+799006&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[320px] lg:min-h-[420px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
