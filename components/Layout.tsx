
import React from 'react';
import { Home, ChevronLeft, BookOpen, ScrollText } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentSection, onNavigate, title }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF2] flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 -left-20 w-40 h-40 bg-emerald-200 rounded-full opacity-30 blur-3xl"></div>

      {/* Header */}
      <header className="bg-emerald-600 text-white p-6 rounded-b-[45px] shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {currentSection !== AppSection.HOME ? (
            <button 
              onClick={() => onNavigate(AppSection.HOME)}
              className="p-2 hover:bg-emerald-700/50 rounded-2xl transition-all active:scale-90"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          ) : (
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">{title}</h1>
          <div className="w-10"></div> {/* Placeholder to keep title centered */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-5 pb-32">
        {children}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-teal-50 flex justify-around items-center px-4 py-4 z-50 rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        <button 
          onClick={() => onNavigate(AppSection.HOME)}
          className={`flex flex-col items-center p-2 transition-all ${currentSection === AppSection.HOME ? 'text-emerald-600 scale-110' : 'text-gray-300'}`}
        >
          <Home className={`w-7 h-7 ${currentSection === AppSection.HOME ? 'fill-emerald-100' : ''}`} />
          <span className="text-[11px] font-bold mt-1">Home</span>
        </button>
        <button 
          onClick={() => onNavigate(AppSection.TALAQQI)}
          className={`flex flex-col items-center p-2 transition-all ${currentSection === AppSection.TALAQQI ? 'text-emerald-600 scale-110' : 'text-gray-300'}`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm mb-1 ${currentSection === AppSection.TALAQQI ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>30</div>
          <span className="text-[11px] font-bold">Juz 30</span>
        </button>
        <button 
          onClick={() => onNavigate(AppSection.STORIES)}
          className={`flex flex-col items-center p-2 transition-all ${currentSection === AppSection.STORIES ? 'text-rose-500 scale-110' : 'text-gray-300'}`}
        >
          <ScrollText className={`w-7 h-7 ${currentSection === AppSection.STORIES ? 'fill-rose-100' : ''}`} />
          <span className="text-[11px] font-bold mt-1">Kisah</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
