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
  const [files, setFiles] = useState<{
    photo: File | null;
    signature: File | null;
    tenth: File | null;
    twelfth: File | null;
    aadhaar: File | null;
  }>({
    photo: null, signature: null, tenth: null, twelfth: null, aadhaar: null
  });

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    gender: '',
    dob: '',
    phone: '',
    email: user?.email || '',
    aadhaarNumber: '',
    address: '',
    state: '',
    pinCode: '',
    course: 'GNM Nursing',
    academicSession: '2026–27',
    mode: 'Regular',
    tenBoard: '', tenYear: '', tenPercent: '',
    twelveBoard: '', twelveYear: '', twelvePercent: '',
    declaration: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    if (formData.aadhaarNumber.length !== 12) {
      setError('Aadhaar number must be exactly 12 digits.');
      return;
    }
    if (formData.pinCode.length !== 6) {
      setError('Pin code must be exactly 6 digits.');
      return;
    }
    if (!formData.declaration) {
      setError('Please accept the declaration.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Logic for submission...
      await addDoc(collection(db, 'admissions'), {
        ...formData,
        userId: user?.uid || 'anonymous',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Submission failed.');
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">1. Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Full Name" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  <input type="text" required placeholder="Father's Name" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})} />
                  <input type="text" required placeholder="Mother's Name" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.motherName} onChange={(e) => setFormData({...formData, motherName: e.target.value})} />
                  <select className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
                  </select>
                  <input type="date" required className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                  <input type="tel" required maxLength={10} placeholder="Mobile Number" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} />
                  <input type="email" required placeholder="Email" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <input type="text" required maxLength={12} placeholder="Aadhaar Number" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.aadhaarNumber} onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value.replace(/\D/g, '')})} />
                </div>
              </div>

              {/* 2. Address Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">2. Address Details</h3>
                <textarea required placeholder="Permanent Address" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    {['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input type="text" required maxLength={6} placeholder="PIN Code" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.pinCode} onChange={(e) => setFormData({...formData, pinCode: e.target.value.replace(/\D/g, '')})} />
                </div>
              </div>

              {/* 3. Course Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">3. Course Details</h3>
                <select className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                  <option>GNM Nursing</option><option>DPT</option><option>Other Paramedical Courses</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.academicSession} onChange={(e) => setFormData({...formData, academicSession: e.target.value})} />
                  <select className="w-full px-4 py-3 bg-slate-50 border rounded-2xl" value={formData.mode} onChange={(e) => setFormData({...formData, mode: e.target.value})}>
                    <option>Regular</option><option>Hostel Required</option>
                  </select>
                </div>
              </div>

              {/* 4. Educational Qualification */}
              <div className="space-y-4 overflow-x-auto">
                <h3 className="text-xl font-bold text-slate-800">4. Educational Qualification</h3>
                <table className="w-full text-sm">
                  <thead><tr><th className="text-left py-2">Exam</th><th>Board/University</th><th>Year</th><th>%</th></tr></thead>
                  <tbody>
                    <tr><td className="py-2">10th</td><td><input type="text" className="w-full p-2 bg-slate-50 border rounded" value={formData.tenBoard} onChange={(e) => setFormData({...formData, tenBoard: e.target.value})} /></td><td><input type="text" className="w-full p-2 bg-slate-50 border rounded" value={formData.tenYear} onChange={(e) => setFormData({...formData, tenYear: e.target.value})} /></td><td><input type="text" className="w-full p-2 bg-slate-50 border rounded" value={formData.tenPercent} onChange={(e) => setFormData({...formData, tenPercent: e.target.value})} /></td></tr>
                    <tr><td className="py-2">12th</td><td><input type="text" className="w-full p-2 bg-slate-50 border rounded" value={formData.twelveBoard} onChange={(e) => setFormData({...formData, twelveBoard: e.target.value})} /></td><td><input type="text" className="w-full p-2 bg-slate-50 border rounded" value={formData.twelveYear} onChange={(e) => setFormData({...formData, twelveYear: e.target.value})} /></td><td><input type="text" className="w-full p-2 bg-slate-50 border rounded" value={formData.twelvePercent} onChange={(e) => setFormData({...formData, twelvePercent: e.target.value})} /></td></tr>
                  </tbody>
                </table>
              </div>

              {/* 5. Documents (Simplified UI) */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">5. Document Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['photo', 'signature', 'tenth', 'twelfth', 'aadhaar'].map((f) => (
                        <div key={f} className="flex items-center gap-2 border p-2 rounded-xl">
                            <span className="text-xs font-semibold uppercase">{f}:</span>
                            <input type="file" onChange={(e) => setFiles({...files, [f]: e.target.files?.[0] || null})} />
                        </div>
                    ))}
                </div>
              </div>

              {/* 6. Declaration & 7. Submit */}
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.declaration} onChange={(e) => setFormData({...formData, declaration: e.target.checked})} />
                <span className="text-sm text-slate-600">I hereby declare that all the information provided is true and correct.</span>
              </label>

              {error && <div className="p-4 bg-red-100 text-red-700 rounded-2xl">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <button type="reset" className="btn-secondary py-4" onClick={() => window.location.reload()}>Reset</button>
                <button type="submit" disabled={loading} className="btn-primary py-4">{loading ? 'Submitting...' : 'Submit Application'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;
