
import React, { useState } from 'react';
import Layout from './components/Layout';
import { AppSection, Surah, Doa } from './types';
import { JUZ_30_SURAHS, DAILY_DOAS, ARABIC_QUIZZES, NAV_ITEMS } from './constants';
// Added Award and MessageSquare to the lucide-react import
import { BookOpen, Star, Play, ChevronRight, Mic, Info, Award, MessageSquare } from 'lucide-react';
import { askIslamicTutor, getSurahExplanation } from './services/geminiService';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedDoa, setSelectedDoa] = useState<Doa | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorAnswer, setTutorAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (section: AppSection) => {
    setCurrentSection(section);
    setSelectedSurah(null);
    setSelectedDoa(null);
  };

  const handleAskTutor = async () => {
    if (!tutorQuestion.trim()) return;
    setIsLoading(true);
    const answer = await askIslamicTutor(tutorQuestion);
    setTutorAnswer(answer || '');
    setIsLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BookOpen className="w-16 h-16" />
        </div>
        <h2 className="text-xl font-bold text-emerald-800 mb-1">Assalamualaikum, Adik! 👋</h2>
        <p className="text-gray-600 text-sm">Sudah hafal Surah apa hari ini? Yuk belajar bareng!</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[30%]"></div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Progress: 12/37</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id as AppSection)}
            className={`${item.color} p-5 rounded-3xl text-white shadow-lg shadow-black/5 active:scale-95 transition-all flex flex-col items-center gap-3`}
          >
            <div className="bg-white/20 p-3 rounded-2xl">
              {item.icon}
            </div>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
        <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          Doa Hari Ini
        </h3>
        <p className="text-sm text-amber-800 italic">"Doa sebelum belajar: Ya Allah tambahkanlah ilmuku dan berilah aku pemahaman."</p>
      </div>
    </div>
  );

  const renderTalaqqi = () => {
    if (selectedSurah) {
      return (
        <div className="space-y-6 animate-slideUp">
          <div className="bg-white p-8 rounded-[40px] shadow-sm text-center">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold">
                {selectedSurah.revelationType}
              </span>
              <span className="text-gray-400 text-sm">#{selectedSurah.number}</span>
            </div>
            <h2 className="text-4xl font-arabic font-bold text-emerald-900 mb-2">{selectedSurah.name}</h2>
            <p className="text-emerald-600 font-semibold">{selectedSurah.englishName}</p>
            <p className="text-xs text-gray-400 mt-1">{selectedSurah.numberOfAyahs} Ayat</p>
          </div>

          <div className="flex justify-center gap-4">
            <button className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <Play className="w-8 h-8 ml-1" />
            </button>
            <button className="bg-white text-emerald-600 w-16 h-16 rounded-full border-2 border-emerald-600 flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <Mic className="w-8 h-8" />
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-3xl border border-emerald-100">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Murottal View</h4>
            <div className="space-y-6 text-right">
              <p className="text-3xl font-arabic leading-relaxed text-emerald-950">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
              <p className="text-3xl font-arabic leading-relaxed text-gray-800">عَمَّ يَتَسَآءَلُونَ ﴿١﴾</p>
              <p className="text-3xl font-arabic leading-relaxed text-gray-800">عَنِ ٱلنَّبَإِ ٱلْعَظِيمِ ﴿٢﴾</p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-50">
               <button 
                 onClick={async () => {
                   setIsLoading(true);
                   const explanation = await getSurahExplanation(selectedSurah.englishName);
                   alert(explanation);
                   setIsLoading(false);
                 }}
                 className="flex items-center gap-2 text-emerald-600 font-bold text-sm mx-auto"
               >
                 <Info className="w-4 h-4" /> Apa makna surah ini?
               </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {JUZ_30_SURAHS.map((surah) => (
          <button
            key={surah.number}
            onClick={() => setSelectedSurah(surah)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 hover:border-emerald-300 transition-colors group"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {surah.number}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-800">{surah.englishName}</h3>
              <p className="text-xs text-gray-400">{surah.numberOfAyahs} Ayat • {surah.revelationType}</p>
            </div>
            <div className="text-2xl font-arabic text-emerald-800">
              {surah.name}
            </div>
            <ChevronRight className="text-gray-300 w-5 h-5" />
          </button>
        ))}
      </div>
    );
  };

  const renderDoa = () => {
    if (selectedDoa) {
      return (
        <div className="space-y-6 animate-slideUp">
          <div className="bg-white p-8 rounded-[40px] shadow-sm text-center">
             <h2 className="text-2xl font-bold text-amber-800 mb-6">{selectedDoa.title}</h2>
             <div className="space-y-8">
               <p className="text-3xl font-arabic leading-relaxed text-emerald-950 text-right">
                 {selectedDoa.arabic}
               </p>
               <div className="text-left bg-amber-50 p-4 rounded-2xl italic text-sm text-amber-900 border border-amber-100">
                 "{selectedDoa.transliteration}"
               </div>
               <div className="text-left text-gray-600 text-sm leading-relaxed">
                 <span className="font-bold text-gray-800">Artinya:</span><br/>
                 {selectedDoa.translation}
               </div>
             </div>
          </div>
          <button 
            onClick={() => setSelectedDoa(null)}
            className="w-full py-4 bg-amber-500 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/20"
          >
            Kembali ke Daftar
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {DAILY_DOAS.map((doa) => (
          <button
            key={doa.id}
            onClick={() => setSelectedDoa(doa)}
            className="bg-white p-6 rounded-3xl shadow-sm border border-amber-50 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <span className="font-bold text-gray-700">{doa.title}</span>
            </div>
            <ChevronRight className="text-amber-300 group-hover:text-amber-500" />
          </button>
        ))}
      </div>
    );
  };

  const renderQuiz = () => {
    if (showQuizResult) {
      return (
        <div className="bg-white p-10 rounded-[40px] shadow-lg text-center animate-bounceIn">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-20 h-20 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Hebat! ✨</h2>
          <p className="text-gray-500 mb-8">Skor kamu: <span className="text-emerald-600 font-bold text-4xl">{score}</span> / {ARABIC_QUIZZES.length * 10}</p>
          <button 
            onClick={() => {
              setQuizIndex(0);
              setScore(0);
              setShowQuizResult(false);
            }}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold"
          >
            Main Lagi
          </button>
        </div>
      );
    }

    const currentQuiz = ARABIC_QUIZZES[quizIndex];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm font-bold text-gray-400 px-2">
          <span>Kuis Arab</span>
          <span>{quizIndex + 1} / {ARABIC_QUIZZES.length}</span>
        </div>
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-indigo-50 min-h-[120px] flex items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 leading-relaxed">{currentQuiz.question}</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {currentQuiz.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx === currentQuiz.answer) setScore(s => s + 10);
                if (quizIndex < ARABIC_QUIZZES.length - 1) {
                  setQuizIndex(q => q + 1);
                } else {
                  setShowQuizResult(true);
                }
              }}
              className="w-full p-5 bg-white rounded-2xl border-2 border-transparent hover:border-indigo-400 text-left font-semibold text-gray-700 active:bg-indigo-50 transition-all shadow-sm flex items-center justify-between"
            >
              {opt}
              <div className="w-6 h-6 rounded-full border border-gray-200"></div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTutor = () => (
    <div className="space-y-4 flex flex-col h-full">
      <div className="bg-white p-4 rounded-2xl border border-rose-100 flex items-center gap-3">
        <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl">👨‍🏫</div>
        <div>
          <h3 className="font-bold text-gray-800">Ustadz AI</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Online & Siap Bantu</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 min-h-[300px]">
        {tutorAnswer && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 self-start max-w-[90%] text-sm leading-relaxed text-gray-700 animate-fadeIn">
            {tutorAnswer}
          </div>
        )}
        {isLoading && (
          <div className="flex gap-1 items-center p-4 bg-gray-50 rounded-2xl w-fit">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white p-4 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.02)] space-y-3">
        <p className="text-[10px] text-gray-400 text-center uppercase font-bold">Tanyakan apa saja tentang Islam!</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={tutorQuestion}
            onChange={(e) => setTutorQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskTutor()}
            placeholder="Ketik pertanyaanmu..."
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
          />
          <button
            onClick={handleAskTutor}
            disabled={isLoading || !tutorQuestion.trim()}
            className="bg-rose-500 text-white p-3 rounded-xl disabled:opacity-50"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const getTitle = () => {
    switch(currentSection) {
      case AppSection.HOME: return "Hafiz Cilik";
      case AppSection.TALAQQI: return selectedSurah ? selectedSurah.name : "Talaqqi Juz 30";
      case AppSection.DOA: return selectedDoa ? "Bacaan Doa" : "Doa Harian";
      case AppSection.QUIZ: return "Kuis Seru";
      case AppSection.TUTOR: return "Tanya Guru";
      default: return "Hafiz Cilik";
    }
  };

  return (
    <Layout currentSection={currentSection} onNavigate={handleNavigate} title={getTitle()}>
      {currentSection === AppSection.HOME && renderHome()}
      {currentSection === AppSection.TALAQQI && renderTalaqqi()}
      {currentSection === AppSection.DOA && renderDoa()}
      {currentSection === AppSection.QUIZ && renderQuiz()}
      {currentSection === AppSection.TUTOR && renderTutor()}
    </Layout>
  );
};

export default App;
