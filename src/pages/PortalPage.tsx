import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Bell, 
  Settings, 
  FileCheck, 
  GraduationCap,
  ClipboardList,
  LogOut,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { MaterialsList } from '../components/portal/MaterialsList';
import { MockTestsList } from '../components/portal/MockTestsList';
import { ResultsList } from '../components/portal/ResultsList';
import { AnnouncementsList } from '../components/portal/AnnouncementsList';

const PortalPage = () => {
  const { user, profile, loading, logout, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) return <div className="h-screen flex items-center justify-center">Loading Portal...</div>;
  
  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="text-primary w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Student & Staff Portal</h1>
          <p className="text-slate-600 mb-8">Access your personalized dashboard, materials, and academic records.</p>
          <button onClick={signIn} className="btn-primary w-full">Sign In to Continue</button>
        </div>
      </div>
    );
  }

  const role = profile?.role || 'student';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materials', label: 'Materials', icon: BookOpen },
    { id: 'tests', label: 'Mock Tests', icon: ClipboardList },
    { id: 'results', label: 'Results', icon: FileCheck },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    ...(role === 'staff' || role === 'admin' ? [
      { id: 'students', label: 'Students', icon: Users },
      { id: 'admissions', label: 'Applications', icon: GraduationCap },
    ] : []),
  ];

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="avatar" />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-slate-900 truncate text-sm">{user.displayName || 'User'}</h4>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-md shadow-teal-500/20' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-10 left-6 right-6">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 capitalize">
                {activeTab.replace('-', ' ')}
              </h2>
              <p className="text-slate-500 font-medium">Welcome back, {user.displayName?.split(' ')[0]}</p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center relative hover:shadow-sm transition-shadow">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Upcoming Tests', value: '03', icon: ClipboardList, color: 'bg-indigo-50 text-indigo-600' },
                    { label: 'Attendance', value: '92%', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Materials', value: '18', icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
                      <div className={`w-16 h-16 ${stat.color} rounded-3xl flex items-center justify-center`}>
                        <stat.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-black text-slate-900">{stat.value}</h4>
                      </div>
                    </div>
                  ))}
                  
                  <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold mb-6">Recent Activities</h4>
                    <div className="space-y-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 items-start pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 leading-tight">Mock Test Uploaded</h5>
                            <p className="text-sm text-slate-500 mb-1">New material for Foundation of Nursing (Part 2) is now available.</p>
                            <span className="text-[10px] font-bold text-teal-600 uppercase">2 hours ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-1 bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-teal-500/20 flex flex-col justify-between">
                    <div>
                      <h4 className="text-2xl font-bold mb-4">Course Progress</h4>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                        <div className="w-2/3 h-full bg-white rounded-full" />
                      </div>
                      <p className="text-sm font-medium opacity-80">67% Module Completed</p>
                    </div>
                    <button className="mt-8 py-3 bg-white text-primary font-bold rounded-2xl text-sm hover:scale-105 transition-transform">
                      Continue Learning
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && <MaterialsList />}
              {activeTab === 'tests' && <MockTestsList />}
              {activeTab === 'results' && <ResultsList />}
              {activeTab === 'announcements' && <AnnouncementsList />}
              {activeTab !== 'dashboard' && activeTab !== 'materials' && activeTab !== 'tests' && activeTab !== 'results' && activeTab !== 'announcements' && (
                <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Settings className="w-12 h-12 text-slate-300 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Section Under Development</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    We are currently populating your {activeTab} with data. 
                    Please check back soon for the full version.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PortalPage;
