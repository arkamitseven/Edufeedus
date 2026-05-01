import React from 'react';
import { motion } from 'motion/react';
import { ImageIcon, Eye, Plus } from 'lucide-react';

const GalleryPage = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2070&auto=format&fit=crop', title: 'Clinical Training' },
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop', title: 'Main Campus' },
    { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop', title: 'Nursing Lab' },
    { url: 'https://images.unsplash.com/photo-1555854817-5b2247a8175f?q=80&w=2070&auto=format&fit=crop', title: 'Student Hostel' },
    { url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2070&auto=format&fit=crop', title: 'Medical Library' },
    { url: 'https://images.unsplash.com/photo-1516533075015-a3838414c3ca?q=80&w=2070&auto=format&fit=crop', title: 'Smart Class' },
    { url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop', title: 'Computer Lab' },
    { url: 'https://images.unsplash.com/photo-1511174511562-5f7f18b854f2?q=80&w=2070&auto=format&fit=crop', title: 'Anatomy Lab' },
    { url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop', title: 'Clinical Interaction' },
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6"
          >
            Life at <span className="text-primary">Edufeedus</span>
          </motion.h1>
          <p className="text-slate-500 max-w-sm mx-auto font-bold uppercase tracking-widest text-xs">Capturing Moments of Excellence</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all break-inside-avoid"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary transform scale-50 group-hover:scale-100 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-bold text-lg">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
