
import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentSection, onNavigate, title }) => {
  return (
    <div className="min-h-screen bg-teal-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-1/2 -left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-30 blur-2xl"></div>

      {/* Header */}
      <header className="bg-emerald-600 text-white p-6 rounded-b-[40px] shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {currentSection !== AppSection.HOME ? (
            <button 
              onClick={() => onNavigate(AppSection.HOME)}
              className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          ) : (
            <div className="w-10"></div>
          )}
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <div className="w-10 flex justify-end">
            <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-800">
              LV1
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {children}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-teal-100 flex justify-around items-center p-3 z-50 rounded-t-3xl shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onNavigate(AppSection.HOME)}
          className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentSection === AppSection.HOME ? 'text-emerald-600 scale-110' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Beranda</span>
        </button>
        <button 
          onClick={() => onNavigate(AppSection.TALAQQI)}
          className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentSection === AppSection.TALAQQI ? 'text-emerald-600 scale-110' : 'text-gray-400'}`}
        >
          <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mb-0.5">30</div>
          <span className="text-[10px] font-semibold">Juz 30</span>
        </button>
        <button 
          onClick={() => onNavigate(AppSection.QUIZ)}
          className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentSection === AppSection.QUIZ ? 'text-emerald-600 scale-110' : 'text-gray-400'}`}
        >
          <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mb-0.5">?</div>
          <span className="text-[10px] font-semibold">Kuis</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
