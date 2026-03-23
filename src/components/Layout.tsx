import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, Bot, Camera, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { stars, addTimeSpent } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      addTimeSpent(1);
    }, 1000);
    return () => clearInterval(interval);
  }, [addTimeSpent]);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/conversations', icon: MessageCircle, label: 'Talk' },
    { path: '/dashboard', icon: BarChart2, label: 'Parents' },
    { path: '/chat', icon: Bot, label: 'Ask Leo' },
    { path: '/camera', icon: Camera, label: 'Scan' },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-inner">
            🦁
          </div>
          <h1 className="font-bold text-xl text-slate-800 tracking-tight">VocabKids</h1>
        </div>
        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-300">
          <span className="text-yellow-500 font-bold text-lg">⭐</span>
          <span className="font-bold text-yellow-700">{stars}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 relative">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-slate-200 flex justify-around p-3 pb-safe z-20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
