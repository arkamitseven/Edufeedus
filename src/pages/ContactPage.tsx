import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Building2,
  Navigation,
  ExternalLink
} from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8"
            >
              Get in Touch <br/> <span className="text-primary">We're here to help</span>
            </motion.h1>
            <p className="text-lg text-slate-600 mb-12 max-w-lg leading-relaxed">
              Have questions about admissions, courses, or hostel facilities? 
              Our team is ready to provide all the information you need.
            </p>

            <div className="space-y-10">
              {[
                { 
                  icon: MapPin, 
                  title: 'Edufeedus Group of Institutes Location', 
                  content: 'Nandannagar, Marak Para, Agartala, West Tripura – 799006' 
                },
                { icon: Phone, title: 'Call Us', content: '+91 8414001064 / +91 8787667006' },
                { icon: Mail, title: 'Email Us', content: 'contact@edufeedus.com' },
                { icon: Clock, title: 'Office Hours', content: 'Mon - Sat: 10:00 AM - 6:00 PM' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: 'https://www.facebook.com/edufeedus/' },
                  { icon: Instagram, href: 'https://www.instagram.com/edufeedus' },
                  { icon: Twitter, href: 'https://x.com/edufeedus' },
                  { icon: Youtube, href: 'https://www.youtube.com/@edufeedus' }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-teal-50 transition-all">
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors"
                    placeholder="Inquiry Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button className="btn-primary w-full py-4 text-lg group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              
              <div className="mt-8 flex justify-center">
                <a href="https://wa.me/918414001064" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-emerald-400 font-bold hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dedicated Location & Interactive Map Section */}
        <section className="mt-24 pt-16 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-bold text-xs uppercase tracking-widest px-4 py-1.5 bg-teal-50 rounded-full border border-teal-100 inline-block mb-3">
              Campus Location & Navigation
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Edufeedus Group of Institutes Location
            </h2>
            <p className="text-slate-600 mt-3 text-sm lg:text-base">
              Located conveniently in Nandannagar, Agartala with easy transport connectivity to major healthcare centers and transport hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Location Info Box */}
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Campus Location</h3>
                
                <div className="space-y-5 text-sm text-slate-300">
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Institute Address:</strong>
                      Nandannagar, Marak Para, Agartala, West Tripura – 799006
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Navigation className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Landmark:</strong>
                      Near AGMC & GBP Government Hospital, Agartala
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Phone Contacts:</strong>
                      +91 8414001064 | +91 8787667006
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Edufeedus+Group+of+Institutes+Nandannagar+Agartala+Tripura" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Embedded Interactive Google Map */}
            <div className="lg:col-span-2 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-md min-h-[380px] bg-slate-100 relative">
              <iframe 
                title="Edufeedus Group of Institutes Campus Map"
                src="https://maps.google.com/maps?q=Nandannagar,+Marak+Para,+Agartala,+West+Tripura+-+799006&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const MessageSquare = ({className}: {className?: string}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.031 6.172c-3.181 0-5.767 2.181-5.767 4.866 0 1.52.847 2.871 2.158 3.735l-.546 2.01c-.027.101.07.189.162.146l2.39-1.12c.504.1 1.031.155 1.579.155 3.182 0 5.767-2.18 5.767-4.866 0-2.685-2.585-4.866-5.767-4.866zm3.327 5.922c-.179.178-.47.178-.648 0-.179-.179-.179-.47 0-.648l.648-.648c.178-.179.469-.179.648 0 .178.179.178.47 0 .648l-.648.648zm-2.023 0c-.179.178-.47.178-.648 0-.179-.179-.179-.47 0-.648l.648-.648c.178-.179.469-.179.648 0 .178.179.178.47 0 .648l-.648.648zm-2.023 0c-.179.178-.47.178-.648 0-.179-.179-.179-.47 0-.648l.648-.648c.178-.179.469-.179.648 0 .178.179.178.47 0 .648l-.648.648z"/>
  </svg>
);

export default ContactPage;
