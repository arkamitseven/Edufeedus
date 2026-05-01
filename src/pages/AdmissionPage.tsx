import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

const AdmissionPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marksheet, setMarksheet] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    course: 'GNM Nursing (3 Years)',
    address: '',
    state: '',
    pinCode: '',
    parentName: '',
    category: 'General',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    if (formData.pinCode.length !== 6) {
      setError('Pin code must be exactly 6 digits.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (marksheet) data.append('marksheet', marksheet);
      
      console.log('Step 1: Saving to Firestore via Client SDK...');
      await addDoc(collection(db, 'admissions'), {
        ...formData,
        userId: user?.uid || 'anonymous',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      console.log('Firestore write success');

      console.log('Step 2: Sending Email Notification...');
      const response = await fetch('/api/admission', {
        method: 'POST',
        body: data,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Email notification failed, but application was saved.');
      }
      
      setSuccess(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Submission failed. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-teal-100"
        >
          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-primary w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for applying to Edufeedus Group of Institutes. Our admission team 
            will review your details and contact you within 2-3 working days.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="btn-primary w-full"
          >
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6">Enroll in Your Future</h1>
              <p className="text-lg text-slate-600 mb-12">
                Begin your journey as a healthcare professional. Fill out the application 
                form below, and our experts will guide you through the document 
                verification and confirmation process.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Document Verification', desc: 'Online check of your 10+2 marksheet and category certificates.', icon: FileText },
                  { title: 'Personal Interview', desc: 'A short interaction to understand your medical career goals.', icon: User },
                  { title: 'Admission Confirmed', desc: 'Final seat allocation and hostel preference selection.', icon: CheckCircle },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                      <step.icon className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 bg-primary/10 rounded-3xl border-2 border-primary/20">
                <div className="flex gap-4 items-start">
                  <AlertCircle className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Need Guidance?</h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Our experts are available 10 AM to 6 PM purely for admission queries.
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <a href="tel:+918414001064" className="flex items-center gap-2 text-primary font-bold hover:underline">
                        <Phone className="w-4 h-4" />
                        +91 8414001064
                      </a>
                      <a 
                        href="/Edufeedus_Brochure_2026_2027.pdf" 
                        download="Edufeedus_Brochure_2026-27.pdf"
                        className="flex items-center gap-2 text-primary font-bold hover:underline border-l border-primary/20 pl-6"
                      >
                        <Download className="w-4 h-4" />
                        Download Brochure
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Admission Form 2026–27</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Parent/Guardian Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="tel" 
                    required
                    maxLength={10}
                    placeholder="XXXXXXXXXX"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({...formData, phone: value});
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  <option>GNM Nursing (3 Years)</option>
                  <option>B.Sc Nursing (Upcoming)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category (for Scholarship)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['General', 'SC', 'ST', 'OBC'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`py-2 rounded-xl text-sm font-semibold border transition-all ${
                        formData.category === cat 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                  <textarea 
                    placeholder="Enter your permanent address"
                    rows={2}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  >
                    <option value="">Select State</option>
                    {[
                      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
                      'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
                      'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
                      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
                      'Uttarakhand', 'West Bengal'
                    ].map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pin Code</label>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    placeholder="XXXXXX"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.pinCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 6) {
                        setFormData({...formData, pinCode: value});
                      }
                    }}
                  />
                </div>
              </div>

              <label className="p-6 border-2 border-dashed border-slate-200 rounded-3xl text-center group hover:border-primary transition-colors cursor-pointer block">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setMarksheet(e.target.files?.[0] || null)} 
                />
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-slate-500 group-hover:text-primary">
                  {marksheet ? marksheet.name : 'Click to Upload Marksheets'}
                </span>
              </label>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex gap-3 text-sm animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-4 text-lg"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;
