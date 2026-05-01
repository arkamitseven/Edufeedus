import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  Stethoscope, 
  BookOpen, 
  Target, 
  Users, 
  Building,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  return (
    <div className="bg-white">
      {/* Course Hero */}
      <section className="bg-teal-50 py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-medical-blue/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-primary-dark font-bold text-xs uppercase tracking-widest mb-6">
                <GraduationCap className="w-4 h-4" />
                Premier Nursing Education
              </div>
              <h1 className="text-4xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
                General Nursing and <br/> <span className="text-primary">Midwifery (GNM)</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                A comprehensive 3-year diploma course designed to prepare students 
                for a successful career in clinical nursing, midwifery, and healthcare 
                administration.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center">
                    <CheckCircle className="text-primary w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700">Tripura Nursing Council Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center">
                    <Users className="text-primary w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700">60 Seats/Year</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Details Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <BookOpen className="text-primary w-8 h-8" />
                Course Curriculum
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our GNM program blend's theoretical knowledge with intensive practical 
                training. Students rotate through various departments at AGMC & GBP Hospital 
                to gain hands-on experience under the guidance of expert clinicians.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Year 1: Foundations', desc: 'Anatomy, Physiology, Microbiology, Psychology, and Fundamentals of Nursing.' },
                  { title: 'Year 2: Specialties', desc: 'Medical Surgical Nursing, Mental Health, and Child Health Nursing.' },
                  { title: 'Year 3: Global Health', desc: 'Midwifery, Gynecology, and Community Health Nursing.' }
                ].map((year, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary transition-all">
                    <h4 className="font-bold text-slate-900 mb-2">{year.title}</h4>
                    <p className="text-sm text-slate-600">{year.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Target className="text-primary w-8 h-8" />
                Learning Objectives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Develop clinical competence in medical-surgical nursing.',
                  'Acquire skills in maternal and child health care.',
                  'Understand community health patterns in local context.',
                  'Administer safe and effective patient care.',
                  'Practice ethical and professional nursing behavior.',
                  'Collaborate with healthcare teams in emergency states.'
                ].map((obj, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="text-primary w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-medium">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl" />
                <h3 className="text-xl font-bold mb-6">Course Quick Facts</h3>
                <ul className="space-y-6">
                  {[
                    { label: 'Level', val: 'Diploma' },
                    { label: 'Duration', val: '3 Years' },
                    { label: 'Intake', val: '60 Students' },
                    { label: 'Affiliation', val: 'AGMC & GBP Hospital' },
                    { label: 'Loan Support', val: '100% Assist' },
                  ].map((fact, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{fact.label}</span>
                      <span className="font-bold text-primary">{fact.val}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/admission" className="btn-primary w-full mt-8">Apply This Course</Link>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                <h3 className="font-bold text-slate-900 mb-4">Need Help?</h3>
                <p className="text-sm text-slate-500 mb-6">Talk to our career counselor for guidance on course selection and career paths.</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Phone className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Admission Cell</p>
                    <p className="font-bold text-slate-900">+91 8414001064</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section id="fees" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Fee Structure</h2>
            <p className="text-slate-600">Transparent and affordable pricing for our GNM nursing program. Flexible payment options available.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { title: '1st Year', amount: '₹1.36 Lakh' },
              { title: '2nd Year', amount: '₹1.00 Lakh' },
              { title: '3rd Year', amount: '₹0.99 Lakh' },
              { title: 'Course Total', amount: '₹3.35 Lakh', highlight: true }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-3xl border flex flex-col justify-center ${stat.highlight ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-50 border-slate-100'}`}>
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">{stat.title}</h4>
                <p className={`text-2xl font-black ${stat.highlight ? 'text-white' : 'text-slate-900'}`}>{stat.amount}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden border border-slate-100 rounded-[2rem] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-5 px-6 text-sm font-bold text-slate-900 border-b border-slate-100">Particulars</th>
                    <th className="py-5 px-6 text-sm font-bold text-slate-900 border-b border-slate-100 text-center">1st Year</th>
                    <th className="py-5 px-6 text-sm font-bold text-slate-900 border-b border-slate-100 text-center">2nd Year</th>
                    <th className="py-5 px-6 text-sm font-bold text-slate-900 border-b border-slate-100 text-center">3rd Year</th>
                    <th className="py-5 px-6 text-sm font-bold text-primary border-b border-slate-100 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Admission Fee', y1: '18,000', y2: '-', y3: '-', total: '18,000' },
                    { name: 'Tuition Fee', y1: '89,000', y2: '89,000', y3: '88,000', total: '2,66,000' },
                    { name: 'Development Fee', y1: '10,000', y2: '10,000', y3: '10,000', total: '30,000' },
                    { name: 'Uniform', y1: '5,000', y2: '-', y3: '-', total: '5,000' },
                    { name: 'Sports, Cultural & IT Fees', y1: '1,000', y2: '1,000', y3: '1,000', total: '3,000' },
                    { name: 'Library Caution Money (Refundable)', y1: '8,000', y2: '-', y3: '-', total: '8,000' },
                    { name: 'Laboratory Caution Money', y1: '5,000', y2: '-', y3: '-', total: '5,000' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 text-sm text-slate-600 font-medium">{row.name}</td>
                      <td className="py-5 px-6 text-sm text-slate-900 text-center">₹{row.y1}</td>
                      <td className="py-5 px-6 text-sm text-slate-900 text-center">₹{row.y2}</td>
                      <td className="py-5 px-6 text-sm text-slate-900 text-center">₹{row.y3}</td>
                      <td className="py-5 px-6 text-sm font-bold text-slate-900 text-right bg-slate-50/30">₹{row.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white">
                    <td className="py-6 px-6 font-bold">Total Annual Fee</td>
                    <td className="py-6 px-6 font-black text-center text-primary text-xl">₹1,36,000</td>
                    <td className="py-6 px-6 font-black text-center text-primary text-xl">₹1,00,000</td>
                    <td className="py-6 px-6 font-black text-center text-primary text-xl">₹99,000</td>
                    <td className="py-6 px-6 font-black text-right text-primary text-2xl">₹3,35,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-teal-50 rounded-[2.5rem] border border-teal-100 flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-teal-100">
                <Building className="text-primary w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Hostel & Food Charges</h3>
                <p className="text-sm text-slate-600 mb-4">Comfortable on-campus accommodation with nutritious meal plans.</p>
                <div className="space-y-2">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Security Deposit (One-time)</span>
                      <span className="font-bold text-slate-900">₹8,000</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Monthly Fee (Food + Stay)</span>
                      <span className="font-bold text-slate-900">₹5,000 / month</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100">
                <ShieldCheck className="text-primary w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Important Notes</h3>
                <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
                  <li>Transport/bus fees are not included in the above structure.</li>
                  <li>Caution money is refundable as per institute norms.</li>
                  <li>Examination fees as per TNMC/University norms are extra.</li>
                  <li>Loan assistance provided for eligible students.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Banner */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto rounded-[3.5rem] bg-slate-50 border border-slate-100 p-8 md:p-16 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Placement Statistics</h2>
              <div className="flex gap-12">
                <div>
                  <h4 className="text-4xl font-extrabold text-primary mb-1 leading-none">100%</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Internship Rate</p>
                </div>
                <div>
                  <h4 className="text-4xl font-extrabold text-medical-blue mb-1 leading-none">Job</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support Portal</p>
                </div>
              </div>
              <p className="mt-8 text-slate-600 max-w-sm">
                We bridge the gap between classroom and clinic. Our dedicated placement cell 
                provides regular guidance for hospital placements and interview preparation.
              </p>
            </div>
            <div className="relative group">
              <div className="bg-white p-8 rounded-3xl shadow-xl relative z-10">
                <ShieldCheck className="text-primary w-12 h-12 mb-4" />
                <h4 className="text-xl font-bold mb-2">Government Hospital Tie-Ups</h4>
                <p className="text-sm text-slate-500 mb-6">Internship and clinical training at tertiary care centers across Tripura.</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 bg-slate-50 rounded-full text-xs font-bold text-slate-600">AGMC & GBP Hospital</span>
                  <span className="px-4 py-1.5 bg-slate-50 rounded-full text-xs font-bold text-slate-600">IGM Hospital</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -z-0 group-hover:rotate-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
