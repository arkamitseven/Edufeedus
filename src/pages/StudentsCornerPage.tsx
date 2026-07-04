import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Download, 
  FileText, 
  BookOpen, 
  Shield, 
  HelpCircle, 
  Send, 
  Printer, 
  Search, 
  User, 
  CheckCircle,
  AlertCircle,
  Phone,
  ArrowRight,
  GraduationCap,
  Clock,
  MapPin,
  X,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface EventItem {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'holiday' | 'event' | 'academic';
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'academic' | 'hostel' | 'general' | 'clinical';
}

interface FormItem {
  id: string;
  name: string;
  size: string;
  description: string;
  fields: { label: string; placeholder: string; type: string }[];
}

export default function StudentsCornerPage() {
  const { user, signIn } = useAuth();
  
  // States
  const [activeTab, setActiveTab] = useState<'calendar' | 'forms' | 'rules' | 'support'>('calendar');
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'exam' | 'holiday' | 'event'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulated Form Modal
  const [selectedForm, setSelectedForm] = useState<FormItem | null>(null);
  const [modalFormData, setModalFormData] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [printPreview, setPrintPreview] = useState(false);

  // Student Query Form State
  const [queryData, setQueryData] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    category: 'Academic Queries',
    message: '',
  });
  const [queryLoading, setQueryLoading] = useState(false);
  const [querySuccess, setQuerySuccess] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);

  // Data
  const calendarEvents: EventItem[] = [
    { id: '1', title: 'Van Mahotsav', date: '2026-07-07', type: 'event', description: 'Annual tree-planting festival celebrated with tree plantation drives across the campus.' },
    { id: '2', title: 'Annual Test Examination - GNM 1st Year', date: '2026-07-20', type: 'exam', description: 'Compulsory internal test examination from July 20th to July 24th.' },
    { id: '3', title: 'Independence Day Celebration', date: '2026-08-15', type: 'holiday', description: 'National flag hoisting ceremony and cultural programs on campus.' },
    { id: '4', title: 'Janmashtami Holiday', date: '2026-09-04', type: 'holiday', description: 'College holiday on the auspicious occasion of Janmashtami.' },
    { id: '5', title: 'Durga Puja Holiday', date: '2026-10-16', type: 'holiday', description: 'Autumn break from October 16th to October 20th. Hostels and offices remain closed.' },
  ];

  const formsList: FormItem[] = [
    {
      id: 'leave',
      name: 'Hostel / Academic Leave Application Form',
      size: '142 KB',
      description: 'Request formal leave permission for home visits or medical absence.',
      fields: [
        { label: 'Student Roll Number', placeholder: 'e.g. GNM-2025-042', type: 'text' },
        { label: 'Reason for Leave', placeholder: 'Specify reason for leave request', type: 'text' },
        { label: 'From Date', placeholder: 'YYYY-MM-DD', type: 'date' },
        { label: 'To Date', placeholder: 'YYYY-MM-DD', type: 'date' },
        { label: 'Parent Phone Number', placeholder: '10-digit mobile number', type: 'tel' }
      ]
    },
    {
      id: 'library',
      name: 'Library Membership Card Requisition',
      size: '98 KB',
      description: 'Apply for fresh or duplicate college library card issues.',
      fields: [
        { label: 'Full Student Name', placeholder: 'As in documents', type: 'text' },
        { label: 'Session / Batch', placeholder: 'e.g. 2026-27', type: 'text' },
        { label: 'Current Semester', placeholder: '1st Year / 2nd Year', type: 'text' },
        { label: 'Aadhaar Number', placeholder: '12-digit UIDAI number', type: 'text' }
      ]
    },
    {
      id: 'scholarship',
      name: 'Scholarship / NOC Application request',
      size: '185 KB',
      description: 'Request No-Objection Certificate for State/PM schemes or study loans.',
      fields: [
        { label: 'Scholarship Scheme Name', placeholder: 'e.g. Tripura Post Matric Scheme', type: 'text' },
        { label: 'Annual Family Income', placeholder: 'Specify annual income in INR', type: 'text' },
        { label: 'Registered Email Address', placeholder: 'Your personal registered email', type: 'email' }
      ]
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: 'What is the required clinical uniform dress code?',
      answer: 'All students must wear clean, ironed uniform scrub sets provided by the institute during hospital clinical postings. Shoes must be fully enclosed white nursing shoes, and hair must be securely bunned back with white hairnets.',
      category: 'clinical'
    },
    {
      question: 'How is the mandatory minimum attendance calculated?',
      answer: 'As per Tripura Nursing Council guidelines, a minimum of 80% attendance in theory lectures and 100% attendance in practical training/clinical posting is mandatory to be eligible to appear in the annual examinations.',
      category: 'academic'
    },
    {
      question: 'What are the hostel rules regarding outing hours?',
      answer: 'Hostel residents must return to campus by 6:00 PM. Weekend outpasses are granted only on written or verified phone confirmation from registered parents/guardians to the Hostel Warden.',
      category: 'hostel'
    },
    {
      question: 'How do we access the PM Vidyalaxmi Study Loan scheme?',
      answer: 'Edufeedus provides full document support (Fee structure, Affiliation Certificate, and Admission letter) required for PM Vidyalaxmi. You can apply directly on the national portal or consult with our admin office.',
      category: 'general'
    }
  ];

  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  // Handle support query submit
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryData.name || !queryData.message) {
      setQueryError('Please enter your name and message.');
      return;
    }
    if (queryData.phone && queryData.phone.length !== 10) {
      setQueryError('Phone number must be exactly 10 digits.');
      return;
    }
    
    setQueryLoading(true);
    setQueryError(null);
    try {
      await addDoc(collection(db, 'student_queries'), {
        ...queryData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      setQuerySuccess(true);
      setQueryData({
        name: '',
        rollNo: '',
        email: '',
        phone: '',
        category: 'Academic Queries',
        message: '',
      });
    } catch (err: any) {
      setQueryError(err.message || 'Failed to submit query. Please try again.');
    } finally {
      setQueryLoading(false);
    }
  };

  // Filter events
  const filteredEvents = calendarEvents.filter(ev => {
    if (calendarFilter !== 'all' && ev.type !== calendarFilter) return false;
    if (searchTerm) {
      return ev.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             ev.description.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] px-8 py-20 lg:py-24 text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 blur-[120px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-primary/30 inline-block mb-6">
              Edufeedus Hub
            </span>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
              Students' <span className="text-primary">Corner</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Access schedules, official academic downloads, compliance guidelines, 
              and submit support tickets directly to the administration.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {user ? (
                <Link to="/portal" className="btn-primary flex items-center gap-2 py-3 px-8 text-sm">
                  Go to Portal <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button onClick={signIn} className="btn-primary flex items-center gap-2 py-3 px-8 text-sm">
                  Login to Student Portal <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <a href="#support-section" className="bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-8 rounded-2xl border border-white/10 transition-all text-sm flex items-center gap-2">
                Submit Grievance
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Portal Notice Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-700 flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-lg">Looking for Study Materials or Exam Results?</h4>
              <p className="text-sm text-blue-700 mt-1 max-w-xl">
                Personalized study lectures, downloadable nursing PDF booklets, internal mock tests, 
                and final exam results require logging into your private portal dashboard.
              </p>
            </div>
          </div>
          <button onClick={signIn} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 text-sm flex-shrink-0 transition-colors">
            Access Dashboard
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation Tabs Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-2 sticky top-28">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider px-3 mb-4">Navigation</h3>
              
              <button 
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'calendar' 
                    ? 'bg-primary text-white shadow-md shadow-teal-500/20' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                Academic Calendar
              </button>

              <button 
                onClick={() => setActiveTab('forms')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'forms' 
                    ? 'bg-primary text-white shadow-md shadow-teal-500/20' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Download className="w-5 h-5" />
                Form Downloads
              </button>

              <button 
                onClick={() => setActiveTab('rules')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'rules' 
                    ? 'bg-primary text-white shadow-md shadow-teal-500/20' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-5 h-5" />
                Rules & Conduct
              </button>

              <button 
                onClick={() => setActiveTab('support')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'support' 
                    ? 'bg-primary text-white shadow-md shadow-teal-500/20' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                Support & Queries
              </button>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm"
              >
                {/* 1. ACADEMIC CALENDAR TAB */}
                {activeTab === 'calendar' && (
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Academic Calendar & Dates</h2>
                        <p className="text-slate-500 text-sm">Stay informed of exams, clinical postings, and holidays.</p>
                      </div>
                      
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Search events..."
                          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary focus:bg-white"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Filter categories */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['all', 'exam', 'holiday', 'event'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCalendarFilter(cat as any)}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                            calendarFilter === cat 
                              ? 'bg-primary border-primary text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Events list */}
                    <div className="space-y-4">
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((ev) => (
                          <div key={ev.id} className="flex gap-6 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all text-left">
                            <div className="w-16 h-16 rounded-xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 flex-shrink-0">
                              <span className="text-xs font-bold text-slate-400 uppercase">
                                {new Date(ev.date).toLocaleString('default', { month: 'short' })}
                              </span>
                              <span className="text-xl font-black text-slate-800 leading-none mt-1">
                                {new Date(ev.date).getDate()}
                              </span>
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-bold text-slate-900 text-base">{ev.title}</h4>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                  ev.type === 'exam' 
                                    ? 'bg-rose-50 border-rose-200 text-rose-700' 
                                    : ev.type === 'holiday' 
                                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                    : ev.type === 'event'
                                    ? 'bg-teal-50 border-teal-200 text-teal-700'
                                    : 'bg-sky-50 border-sky-200 text-sky-700'
                                }`}>
                                  {ev.type}
                                </span>
                              </div>
                              <p className="text-sm text-slate-500 leading-relaxed">{ev.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-12 text-center text-slate-400">
                          <AlertCircle className="w-10 h-10 mx-auto mb-4 opacity-40" />
                          <p className="text-sm">No academic events found matching your search.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. FORM DOWNLOADS TAB */}
                {activeTab === 'forms' && (
                  <div>
                    <div className="pb-6 border-b border-slate-100 mb-8">
                      <h2 className="text-2xl font-bold text-slate-900">Official Form Center</h2>
                      <p className="text-slate-500 text-sm">Download or draft digital versions of official student request applications.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formsList.map((form) => (
                        <div key={form.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all text-left">
                          <div>
                            <div className="w-12 h-12 bg-teal-50 border border-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                              <FileText className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2 leading-tight">{form.name}</h4>
                            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{form.description}</p>
                            <span className="text-xs font-mono text-slate-400 block mb-6">File Size: {form.size}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                            <button 
                              onClick={() => {
                                setSelectedForm(form);
                                setModalFormData({});
                                setFormSubmitted(false);
                                setPrintPreview(false);
                              }}
                              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Printer className="w-4 h-4" /> Draft Online
                            </button>
                            <a 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`Downloading ${form.name} (${form.size}) template. This simulated print form contains academic stamps.`);
                              }}
                              className="px-4 py-2.5 bg-primary text-white hover:bg-teal-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-teal-500/10"
                            >
                              <Download className="w-4 h-4" /> Download PDF
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. RULES & CONDUCT TAB */}
                {activeTab === 'rules' && (
                  <div>
                    <div className="pb-6 border-b border-slate-100 mb-8">
                      <h2 className="text-2xl font-bold text-slate-900">Rules & Code of Conduct</h2>
                      <p className="text-slate-500 text-sm">Mandatory guidelines and regulations for nursing students on campus and clinics.</p>
                    </div>

                    <div className="space-y-4">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                          <button
                            onClick={() => setFaqOpenIdx(faqOpenIdx === idx ? null : idx)}
                            className="w-full p-5 bg-slate-50/50 hover:bg-slate-50 flex justify-between items-center text-left transition-colors"
                          >
                            <span className="font-bold text-slate-800 text-base">{faq.question}</span>
                            <span className={`w-8 h-8 bg-white border rounded-full flex items-center justify-center text-slate-500 transition-transform ${
                              faqOpenIdx === idx ? 'rotate-45' : ''
                            }`}>
                              <Plus className="w-4 h-4" />
                            </span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {faqOpenIdx === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-white text-left">
                                  <p className="mb-4">{faq.answer}</p>
                                  <div className="flex gap-2">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                                      Category: {faq.category}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>

                    {/* Anti-Ragging Disclaimer */}
                    <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-start gap-4 text-left">
                      <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-rose-900 mb-1">Strict Anti-Ragging Compliance</h4>
                        <p className="text-sm text-rose-700 leading-relaxed">
                          Edufeedus Group of Institutes maintains a absolute ZERO-TOLERANCE policy towards ragging. 
                          Any student found guilty of mental or physical ragging will be immediately rusticated from the 
                          institute and prosecuted under state criminal laws.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SUPPORT & QUERIES TAB */}
                {activeTab === 'support' && (
                  <div id="support-section">
                    <div className="pb-6 border-b border-slate-100 mb-8 text-left">
                      <h2 className="text-2xl font-bold text-slate-900">Student Query & Grievance Box</h2>
                      <p className="text-slate-500 text-sm">Have a question or query? Post it securely to the Academic Council.</p>
                    </div>

                    {querySuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-10 text-center"
                      >
                        <div className="w-16 h-16 bg-teal-50 text-primary border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Query Submitted Successfully</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">
                          Thank you. Your message has been safely logged in our admin registry. Our Student Council 
                          representative will get back to you shortly.
                        </p>
                        <button 
                          onClick={() => setQuerySuccess(false)}
                          className="btn-primary py-2 px-6"
                        >
                          Submit Another Ticket
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleQuerySubmit} className="space-y-6 text-left">
                        {queryError && (
                          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex gap-3 text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{queryError}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Priyasree Das"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-sm"
                              value={queryData.name}
                              onChange={(e) => setQueryData({...queryData, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Roll Number (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. GNM-2026-004"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-sm"
                              value={queryData.rollNo}
                              onChange={(e) => setQueryData({...queryData, rollNo: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID</label>
                            <input 
                              type="email" 
                              required
                              placeholder="e.g. student@gmail.com"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-sm"
                              value={queryData.email}
                              onChange={(e) => setQueryData({...queryData, email: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">10-Digit Mobile Phone</label>
                            <input 
                              type="tel" 
                              required
                              maxLength={10}
                              placeholder="e.g. 8787667006"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-sm"
                              value={queryData.phone}
                              onChange={(e) => setQueryData({...queryData, phone: e.target.value.replace(/\D/g, '')})}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                          <select 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm"
                            value={queryData.category}
                            onChange={(e) => setQueryData({...queryData, category: e.target.value})}
                          >
                            <option>Academic Queries</option>
                            <option>Hostel & Canteen Queries</option>
                            <option>Scholarships & Study Loans</option>
                            <option>Exam & Attendance Disputes</option>
                            <option>Other Feedback</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Brief Query / Description</label>
                          <textarea 
                            required
                            rows={4}
                            placeholder="Write your query or request description here..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-sm resize-none"
                            value={queryData.message}
                            onChange={(e) => setQueryData({...queryData, message: e.target.value})}
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={queryLoading}
                          className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" /> {queryLoading ? 'Sending...' : 'Submit Inquiry'}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Online Draft simulated form modal */}
      <AnimatePresence>
        {selectedForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Digital Draft Simulator</h3>
                  <p className="text-xs text-slate-500">Draft online and prepare for clinical verification</p>
                </div>
                <button 
                  onClick={() => setSelectedForm(null)}
                  className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content / Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-grow text-left">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-teal-50 border border-teal-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Draft Completed successfully</h4>
                    <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                      Your completed form is stamped and saved under your local record draft cache.
                    </p>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left mb-6 font-mono text-xs text-slate-700 whitespace-pre-wrap">
                      <div className="text-center font-bold pb-2 border-b border-slate-300 mb-3 text-slate-800 uppercase tracking-wider">
                        Edufeedus Group of Institutes
                      </div>
                      <strong>DRAFT ID:</strong> EDF-{Math.floor(Math.random() * 900000 + 100000)}<br/>
                      <strong>FORM:</strong> {selectedForm.name}<br/>
                      {Object.entries(modalFormData).map(([label, val]) => (
                        <div key={label} className="mt-1">
                          <strong>{label}:</strong> {val || 'N/A'}
                        </div>
                      ))}
                      <div className="mt-4 pt-3 border-t border-dashed border-slate-300 text-center text-slate-500">
                        * Present Draft ID to Office Desk to get official seal *
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          window.print();
                        }}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Printer className="w-4 h-4" /> Print PDF
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedForm(null);
                        }}
                        className="flex-1 py-2.5 btn-primary font-bold text-xs"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-500 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800">
                      <strong>Draft Preview Mode:</strong> Fill in the fields below to prepare a printable, custom pre-filled college form.
                    </p>

                    <div className="space-y-4 pt-2">
                      {selectedForm.fields.map((field) => (
                        <div key={field.label}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">{field.label}</label>
                          <input 
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-primary transition-all"
                            value={modalFormData[field.label] || ''}
                            onChange={(e) => setModalFormData({...modalFormData, [field.label]: e.target.value})}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex gap-3">
                      <button 
                        onClick={() => setSelectedForm(null)}
                        className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-600 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => setFormSubmitted(true)}
                        className="flex-1 py-3 btn-primary text-xs"
                      >
                        Generate Sealed Draft
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
