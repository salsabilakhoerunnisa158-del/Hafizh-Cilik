
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { AppSection, Surah, Doa, Ayah, QuizQuestion, QuizTheme } from './types';
import { JUZ_30_SURAHS, DAILY_DOAS, QUIZ_THEMES, NAV_ITEMS } from './constants';
import { BookOpen, Star, Play, Pause, ChevronLeft, ChevronRight, SkipBack, SkipForward, Info, Award, MessageSquare, RotateCcw, ScrollText, Volume2, X, Music, Sparkles, Heart, CheckCircle2, AlertCircle, Sparkle, LayoutGrid, Volume1, Key } from 'lucide-react';
import { askIslamicTutor, getSurahExplanation, generateDoaAudio } from './services/geminiService';
import { fetchSurahDetails } from './services/quranService';

const BASMALAH = "بِسْم. اللَّهِ الرَّحْمَنِ الرَّحِيمِ";

// Helper for Audio Decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  
  const [selectedDoa, setSelectedDoa] = useState<Doa | null>(null);
  
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorAnswer, setTutorAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [surahWisdom, setSurahWisdom] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pcmAudioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (selectedSurah) {
      loadSurah(selectedSurah.number);
      setSurahWisdom(null);
    } else {
      stopAudio();
      setAyahs([]);
      setSurahWisdom(null);
    }
  }, [selectedSurah]);

  const loadSurah = async (number: number) => {
    setIsLoading(true);
    try {
      const data = await fetchSurahDetails(number);
      if (number !== 1 && data.length > 0) {
        const firstAyah = data[0];
        if (firstAyah.text.startsWith(BASMALAH)) {
          firstAyah.text = firstAyah.text.replace(BASMALAH, "").trim();
        }
      }
      setAyahs(data);
      setCurrentAyahIndex(0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (pcmAudioContextRef.current) {
      pcmAudioContextRef.current.close();
      pcmAudioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleOpenSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setApiError(null); // Clear error after key selection attempt
    }
  };

  const playDoaAudio = async (text: string) => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    
    setIsAudioLoading(true);
    setApiError(null);
    
    try {
      const base64Audio = await generateDoaAudio(text);
      if (base64Audio) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        pcmAudioContextRef.current = ctx;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        setIsPlaying(true);
        source.start();
        source.onended = () => setIsPlaying(false);
      }
    } catch (error: any) {
      console.error("Audio Play Error:", error);
      if (error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
        setApiError("Kebutuhan suara lagi ramai banget nih! Adik bisa pakai kunci API sendiri supaya lancar terus.");
      } else {
        setApiError("Ups, ada sedikit gangguan audio. Coba lagi nanti ya!");
      }
    } finally {
      setIsAudioLoading(false);
    }
  };

  const playAyah = (index: number) => {
    stopAudio();
    if (!ayahs[index]) return;

    setCurrentAyahIndex(index);
    const audio = new Audio(ayahs[index].audio);
    audioRef.current = audio;
    setIsPlaying(true);
    
    audio.play();

    audio.onended = () => {
      setIsPlaying(false);
      if (isAutoPlay && index < ayahs.length - 1) {
        playAyah(index + 1);
      }
    };
  };

  const handlePreviousAyah = () => {
    if (currentAyahIndex > 0) {
      playAyah(currentAyahIndex - 1);
    }
  };

  const handleNextAyah = () => {
    if (currentAyahIndex < ayahs.length - 1) {
      playAyah(currentAyahIndex + 1);
    }
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAyah(currentAyahIndex === -1 ? 0 : currentAyahIndex);
    }
    setIsAutoPlay(!isAutoPlay);
  };

  const handleNavigate = (section: AppSection) => {
    setCurrentSection(section);
    setSelectedSurah(null);
    setSelectedDoa(null);
    setSelectedTheme(null);
    setSelectedAnswer(null);
    setQuizIndex(0);
    setApiError(null);
    stopAudio();
  };

  const handleAskTutor = async () => {
    if (!tutorQuestion.trim()) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const answer = await askIslamicTutor(tutorQuestion);
      setTutorAnswer(answer || '');
    } catch (e: any) {
      if (e.message?.includes("429")) {
        setApiError("Kakak lagi banyak tamu nih! Pakai kunci API adik sendiri yuk biar bisa cerita terus.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchWisdom = async () => {
    if (!selectedSurah) return;
    setIsLoading(true);
    try {
      const wisdom = await getSurahExplanation(selectedSurah.englishName);
      setSurahWisdom(wisdom || null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizAnswer = async (idx: number, currentQuiz: QuizQuestion) => {
    if (!selectedTheme || selectedAnswer !== null) return;
    
    setSelectedAnswer(idx);
    const isCorrect = idx === currentQuiz.answer;
    
    if (isCorrect) {
      setScore(s => s + 10);
      await playDoaAudio(currentQuiz.arabicWord);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (quizIndex < selectedTheme.questions.length - 1) {
        setQuizIndex(q => q + 1);
      } else {
        setShowQuizResult(true);
      }
    }, 1500);
  };

  const renderHome = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-[35px] shadow-lg shadow-emerald-900/5 border border-emerald-50 text-center relative overflow-hidden">
        <div className="absolute -top-4 -left-4 p-4 opacity-5 bg-emerald-500 rounded-full w-24 h-24"></div>
        <h2 className="text-2xl font-bold text-emerald-800 mb-1">Assalamualaikum, Adik! 👋</h2>
        <p className="text-gray-500 text-sm font-medium">Mau dengar kisah hebat hari ini?</p>
        <div className="mt-5 bg-emerald-50 rounded-2xl p-3 flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Hafalanmu</span>
            <div className="flex-1 mx-4 h-2.5 bg-white rounded-full overflow-hidden border border-emerald-100">
                <div className="h-full bg-emerald-400 w-[45%] rounded-full shadow-inner"></div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800">15/37</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id as AppSection)}
            className={`${item.color} p-6 rounded-[35px] text-white shadow-xl shadow-black/5 active:scale-95 hover:scale-[1.02] transition-all flex flex-col items-center gap-3 relative overflow-hidden`}
          >
            <div className="absolute -bottom-2 -right-2 opacity-20 transform rotate-12">
               {React.cloneElement(item.icon as React.ReactElement, { size: 64 })}
            </div>
            <div className="bg-white/20 p-4 rounded-[24px]">
              {item.icon}
            </div>
            <span className="font-bold text-[15px] drop-shadow-md">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-amber-100 p-6 rounded-[35px] border-2 border-dashed border-amber-300 flex items-center gap-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-amber-900 text-sm">Nasihat Hari Ini</h3>
            <p className="text-xs text-amber-800 leading-relaxed font-medium mt-0.5">"Jadilah anak yang jujur seperti Abu Bakar Ash-Shiddiq ya!"</p>
        </div>
      </div>
    </div>
  );

  const renderTalaqqi = () => {
    if (selectedSurah) {
      return (
        <div className="space-y-6 animate-slideUp">
          <div className="bg-white p-8 rounded-[45px] shadow-lg text-center border-b-8 border-emerald-100">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-emerald-100 text-emerald-700 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {selectedSurah.revelationType}
              </span>
              <span className="text-gray-200 text-lg font-black italic">#{selectedSurah.number}</span>
            </div>
            <h2 className="text-5xl font-arabic font-bold text-emerald-950 mb-2">{selectedSurah.name}</h2>
            <p className="text-emerald-500 font-bold text-lg">{selectedSurah.englishName}</p>
          </div>

          <div className="flex justify-center items-center gap-6">
            <button 
              onClick={handlePreviousAyah}
              disabled={currentAyahIndex <= 0}
              className="bg-white text-emerald-500 disabled:text-gray-200 w-14 h-14 rounded-3xl flex items-center justify-center shadow-md active:scale-90 transition-all border border-gray-100"
              title="Ayat Sebelumnya"
            >
              <SkipBack className="w-7 h-7 fill-current" />
            </button>
            <button 
              onClick={toggleAutoPlay}
              className={`${isPlaying ? 'bg-amber-500 shadow-amber-200' : 'bg-emerald-500 shadow-emerald-200'} text-white w-24 h-24 rounded-[35px] flex items-center justify-center shadow-2xl active:scale-90 transition-all border-4 border-white relative`}
            >
              {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12 ml-2" />}
            </button>
            <button 
              onClick={handleNextAyah}
              disabled={currentAyahIndex >= ayahs.length - 1}
              className="bg-white text-emerald-500 disabled:text-gray-200 w-14 h-14 rounded-3xl flex items-center justify-center shadow-md active:scale-90 transition-all border border-gray-100"
              title="Ayat Berikutnya"
            >
              <SkipForward className="w-7 h-7 fill-current" />
            </button>
          </div>

          <div className="bg-white p-5 rounded-[40px] shadow-inner border border-emerald-50">
            <div className="flex items-center justify-between mb-5 px-3">
              <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Murottal</h4>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-gray-400">Terus Baca</span>
                <button 
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isAutoPlay ? 'bg-emerald-400' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${isAutoPlay ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[450px] overflow-y-auto px-1 custom-scrollbar">
              {isLoading && !surahWisdom ? (
                <div className="py-24 text-center">
                    <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 font-bold text-sm">Membuka lembaran indah...</p>
                </div>
              ) : ayahs.length > 0 ? (
                <>
                  {selectedSurah.number !== 1 && (
                    <div className="text-center py-6 bg-emerald-50/50 rounded-[30px] border-2 border-dashed border-emerald-100 mb-6">
                        <p className="text-3xl font-arabic text-emerald-950">{BASMALAH}</p>
                        <p className="text-[10px] text-emerald-600 font-bold mt-2">Dengan Nama Allah Yang Maha Pengasih Lagi Maha Penyayang</p>
                    </div>
                  )}

                  {ayahs.map((ayah, idx) => (
                    <div 
                      key={ayah.number}
                      className={`p-6 rounded-[30px] transition-all cursor-pointer relative ${currentAyahIndex === idx ? 'bg-emerald-50 border-2 border-emerald-200 ring-4 ring-emerald-50 shadow-lg scale-[1.02]' : 'bg-white border-2 border-gray-50'}`}
                      onClick={() => playAyah(idx)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-black ${currentAyahIndex === idx ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {ayah.numberInSurah}
                        </div>
                        <div className="flex items-center gap-3">
                          {currentAyahIndex === idx && isPlaying && (
                            <div className="flex gap-1 items-end h-5">
                              {[0,1,2].map(i => <div key={i} className={`w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:${i*0.2}s]`} style={{height: `${40+Math.random()*60}%`}}></div>)}
                            </div>
                          )}
                          <div className={`p-2 rounded-xl ${currentAyahIndex === idx ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-300'}`}>
                              <Play className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-3xl font-arabic text-right leading-[1.8] text-emerald-950 drop-shadow-sm mb-4">
                        {ayah.text}
                      </p>
                      <p className="text-[13px] text-gray-600 font-semibold italic border-t border-gray-100 pt-3">
                        {ayah.translation}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="py-20 text-center">
                    <div className="text-rose-400 text-4xl mb-4">😿</div>
                    <p className="text-gray-400 font-bold text-sm">Gagal memuat ayat. Coba lagi ya!</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-5 border-t border-gray-100">
               <button 
                 onClick={handleFetchWisdom}
                 className="flex items-center gap-3 py-3 px-6 bg-emerald-50 text-emerald-700 font-black text-xs rounded-2xl mx-auto shadow-sm active:scale-95 transition-all"
               >
                 <Info className="w-4 h-4" /> PESAN & HIKMAH SURAH INI
               </button>
            </div>
          </div>

          {surahWisdom && (
            <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end justify-center p-4 animate-fadeIn">
                <div className="bg-white w-full max-w-md rounded-[45px] p-8 shadow-2xl border-t-8 border-emerald-400 animate-slideUp relative">
                    <button 
                      onClick={() => setSurahWisdom(null)}
                      className="absolute top-6 right-6 bg-gray-100 p-2 rounded-full text-gray-400 hover:text-rose-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-emerald-100 p-4 rounded-3xl text-emerald-600">
                            <Star className="fill-current" />
                        </div>
                        <h3 className="text-xl font-black text-emerald-900">Pesan & Hikmah</h3>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                        <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                            {surahWisdom}
                        </p>
                    </div>
                    <button 
                        onClick={() => setSurahWisdom(null)}
                        className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-[25px] font-black shadow-lg shadow-emerald-200 active:scale-95 transition-all"
                    >
                        Masya Allah, Hebat!
                    </button>
                </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fadeIn">
        <h3 className="px-2 text-emerald-800 font-black text-lg">Pilih Surah</h3>
        <div className="grid grid-cols-1 gap-3">
            {JUZ_30_SURAHS.map((surah) => (
            <button
                key={surah.number}
                onClick={() => setSelectedSurah(surah)}
                className="w-full bg-white p-5 rounded-[30px] shadow-sm border-2 border-gray-50 flex items-center gap-5 hover:border-emerald-300 transition-all group active:scale-[0.98]"
            >
                <div className="w-12 h-12 bg-emerald-50 rounded-[18px] flex items-center justify-center text-emerald-600 font-black text-lg group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                {surah.number}
                </div>
                <div className="flex-1 text-left">
                <h3 className="font-black text-gray-800 text-lg">{surah.englishName}</h3>
                <p className="text-xs text-emerald-600 font-bold">{surah.numberOfAyahs} Ayat • {surah.revelationType}</p>
                </div>
                <div className="text-3xl font-arabic text-emerald-900 drop-shadow-sm">
                {surah.name}
                </div>
            </button>
            ))}
        </div>
      </div>
    );
  };

  const renderDoa = () => {
    if (selectedDoa) {
      return (
        <div className="space-y-6 animate-slideUp">
          <div className="bg-white p-0 rounded-[50px] shadow-2xl overflow-hidden border-b-[12px] border-amber-100 relative">
             {selectedDoa.imageUrl && (
               <div className="h-80 relative overflow-hidden bg-[#FFF9EA]">
                 <img 
                   src={selectedDoa.imageUrl} 
                   alt={selectedDoa.title} 
                   className={`w-full h-full object-contain p-6 transform transition-all duration-700 ${isPlaying ? 'animate-gentlePulse scale-105' : 'hover:scale-105'}`} 
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/396144/boy-in-bed.svg';
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                 <div className="absolute bottom-4 left-0 right-0 px-8 text-center">
                    <div className="flex items-center gap-2 mb-1 justify-center">
                      <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                      <span className="text-[12px] text-amber-800 font-black uppercase tracking-widest">Waktunya Berdoa</span>
                    </div>
                    <h2 className="text-3xl font-black text-emerald-900 drop-shadow-sm">{selectedDoa.title}</h2>
                 </div>
               </div>
             )}
             
             <div className="p-8 pt-4 space-y-8 text-center">
               <div className="flex justify-center items-center gap-4">
                  <div className={`flex gap-1 items-end h-10 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                    {[0,1,2].map(i => <div key={i} className="w-2.5 rounded-full bg-emerald-400 animate-bounce" style={{height: `${40+Math.random()*60}%`, animationDelay: `${i*0.2}s`}}></div>)}
                  </div>
                  
                  <button 
                    onClick={() => playDoaAudio(selectedDoa.arabic)}
                    disabled={isAudioLoading}
                    className={`w-32 h-32 rounded-[45px] flex items-center justify-center shadow-2xl transition-all active:scale-90 border-[8px] border-white relative group overflow-hidden ${isPlaying ? 'bg-rose-500 scale-110 shadow-rose-200' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'}`}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {isAudioLoading ? (
                      <div className="w-14 h-14 border-[6px] border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isPlaying ? (
                      <Pause className="w-16 h-16 text-white fill-current" />
                    ) : (
                      <Volume2 className="w-16 h-16 text-white" />
                    )}
                  </button>

                  <div className={`flex gap-1 items-end h-10 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                    {[0,1,2].map(i => <div key={i} className="w-2.5 rounded-full bg-emerald-400 animate-bounce" style={{height: `${40+Math.random()*60}%`, animationDelay: `${i*0.2}s`}}></div>)}
                  </div>
               </div>

               {apiError && (
                 <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-100 text-rose-700 text-sm font-bold animate-fadeIn">
                    <p className="mb-2">{apiError}</p>
                    <button 
                      onClick={handleOpenSelectKey}
                      className="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2 mx-auto shadow-md"
                    >
                      <Key size={14} /> Atur Kunci API Sendiri
                    </button>
                 </div>
               )}

               <div className="bg-emerald-50/50 p-8 rounded-[45px] border-4 border-dashed border-emerald-100 shadow-inner">
                <p className="text-4xl font-arabic leading-[1.8] text-emerald-950 text-right drop-shadow-sm">
                  {selectedDoa.arabic}
                </p>
               </div>
               
               <div className="text-left bg-amber-50 p-6 rounded-[35px] border-2 border-amber-200/50 shadow-inner">
                 <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Music className="w-5 h-5" /> Cara Membaca
                 </p>
                 <p className="italic text-lg text-amber-950 font-bold leading-relaxed">"{selectedDoa.transliteration}"</p>
               </div>
               
               <div className="text-left bg-indigo-50/50 p-6 rounded-[35px] border-2 border-indigo-100/50">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-indigo-200" /> Artinya
                 </p>
                 <p className="text-indigo-900 text-[15px] leading-relaxed font-bold">{selectedDoa.translation}</p>
               </div>
             </div>
          </div>
          <button 
            onClick={() => { setSelectedDoa(null); stopAudio(); }}
            className="w-full py-6 bg-emerald-600 text-white rounded-[40px] font-black text-xl shadow-2xl shadow-emerald-200 active:scale-95 transition-all mb-10 flex items-center justify-center gap-3 border-b-8 border-emerald-800"
          >
            Alhamdulillah, Hebat! <Sparkles className="w-7 h-7" />
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fadeIn">
        <h3 className="px-2 text-amber-800 font-black text-xl flex items-center gap-2">
          Hafalan Doa Harian <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
        </h3>
        <div className="grid grid-cols-1 gap-4">
            {DAILY_DOAS.map((doa) => (
            <button
                key={doa.id}
                onClick={() => setSelectedDoa(doa)}
                className="bg-white p-4 rounded-[40px] shadow-sm border-2 border-amber-50 flex items-center gap-6 group active:scale-[0.98] transition-all hover:bg-amber-50/50 overflow-hidden"
            >
                <div className="w-28 h-28 rounded-[35px] overflow-hidden shadow-md flex-shrink-0 border-4 border-white bg-amber-50 relative">
                  <img 
                    src={doa.imageUrl} 
                    alt={doa.title} 
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/396144/boy-in-bed.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent"></div>
                </div>
                <div className="flex-1 text-left">
                  <span className="font-black text-gray-800 text-xl block group-hover:text-amber-600 transition-colors mb-1">{doa.title}</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-sm">
                      <Volume2 size={12} /> Audio Jernih
                    </span>
                    <span className="bg-amber-50 text-amber-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      Kartun Seru ✨
                    </span>
                  </div>
                </div>
                <div className="pr-2">
                  <div className="w-12 h-12 bg-amber-100 rounded-[20px] flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                    <ChevronRight className="w-7 h-7" />
                  </div>
                </div>
            </button>
            ))}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (!selectedTheme) {
      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-indigo-600 p-8 rounded-[45px] text-white shadow-xl relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
             <h2 className="text-3xl font-black mb-2">Pilih Tema Seru! 🧩</h2>
             <p className="opacity-80 font-bold">Ayo tebak kosa kata bahasa Arab!</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {QUIZ_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme);
                  setQuizIndex(0);
                  setScore(0);
                  setShowQuizResult(false);
                  setApiError(null);
                }}
                className="bg-white p-6 rounded-[35px] shadow-lg border-2 border-gray-50 flex items-center gap-6 group hover:border-indigo-400 transition-all active:scale-[0.98]"
              >
                <div className={`w-20 h-20 ${theme.color} rounded-[28px] flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform`}>
                   {theme.icon}
                </div>
                <div className="flex-1 text-left">
                   <h3 className="text-xl font-black text-gray-800 mb-1">{theme.title}</h3>
                   <div className="flex items-center gap-2">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">10 Soal</span>
                      <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Audio ✨</span>
                   </div>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                   <ChevronRight />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (showQuizResult) {
      return (
        <div className="bg-white p-10 rounded-[50px] shadow-2xl text-center animate-bounceIn border-b-[12px] border-indigo-100">
          <div className="w-40 h-40 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <Award className="w-24 h-24 text-indigo-500" />
            <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white shadow-lg animate-pulse">✨</div>
          </div>
          <h2 className="text-4xl font-black text-gray-800 mb-2">WOW HEBAT! 🎈</h2>
          <p className="text-gray-400 font-bold mb-4">Petualangan {selectedTheme.title} Selesai!</p>
          <div className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-[30px] shadow-xl shadow-indigo-200 mb-10">
              <span className="text-6xl font-black">{score}</span>
              <span className="text-xl font-bold opacity-70 ml-2">Poin</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => {
                setQuizIndex(0);
                setScore(0);
                setShowQuizResult(false);
                setApiError(null);
              }}
              className="w-full py-5 bg-indigo-600 text-white rounded-[30px] font-black text-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
            >
              Coba Lagi Yuk!
            </button>
            <button 
              onClick={() => handleNavigate(AppSection.QUIZ)}
              className="w-full py-5 bg-gray-100 text-gray-600 rounded-[30px] font-black text-xl hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LayoutGrid size={24} /> Pilih Tema Lain
            </button>
          </div>
        </div>
      );
    }

    const currentQuiz = selectedTheme.questions[quizIndex];

    return (
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="flex justify-between items-center text-xs font-black text-indigo-400 px-4">
          <button 
            onClick={() => setSelectedTheme(null)}
            className="bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 hover:bg-indigo-100 transition-colors"
          >
             <ChevronLeft size={14} /> Kembali
          </button>
          <div className="flex items-center gap-4">
            <span className="bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">{selectedTheme.title}</span>
            <span className="text-lg font-black">{quizIndex + 1} <span className="text-indigo-100">/</span> {selectedTheme.questions.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[55px] shadow-2xl border-4 border-white text-center relative overflow-hidden group">
            {currentQuiz.imageUrl && (
              <div className={`w-full h-56 sm:h-72 mb-6 rounded-[45px] overflow-hidden bg-white border-2 border-indigo-50 shadow-inner relative flex items-center justify-center p-6 transition-all duration-300 ${selectedAnswer !== null && selectedAnswer === currentQuiz.answer ? 'ring-8 ring-emerald-100' : ''}`}>
                <img 
                  src={currentQuiz.imageUrl} 
                  alt="Kuis Gambar" 
                  className={`max-w-full max-h-full object-contain transition-all duration-700 ${isPlaying ? 'animate-gentlePulse scale-110' : ''}`} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://www.svgrepo.com/show/406691/lion.svg";
                  }}
                />
                {isPlaying && (
                   <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/10 backdrop-blur-[1px] animate-fadeIn">
                      <Volume2 className="w-16 h-16 text-indigo-600 animate-pulse" />
                   </div>
                )}
              </div>
            )}
            
            {/* Speaker Button ALWAYS VISIBLE below image */}
            <div className="flex justify-center mb-6">
              <button 
                onClick={() => playDoaAudio(currentQuiz.arabicWord)}
                disabled={isAudioLoading}
                className={`flex items-center gap-3 px-10 py-4 rounded-full font-black text-sm transition-all active:scale-90 shadow-xl border-b-4 ${isPlaying ? 'bg-indigo-600 text-white border-indigo-800 animate-pulse' : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50'}`}
              >
                {isAudioLoading ? (
                  <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Volume2 size={24} />
                )}
                DENGERIN SUARANYA
              </button>
            </div>

            {apiError && (
              <div className="mb-6 bg-rose-50 p-4 rounded-3xl border-2 border-rose-100 text-rose-700 text-xs font-black animate-fadeIn">
                 <p className="mb-2">{apiError}</p>
                 <button 
                    onClick={handleOpenSelectKey}
                    className="bg-rose-600 text-white px-5 py-2 rounded-2xl flex items-center gap-2 mx-auto active:scale-95 transition-all shadow-md"
                 >
                    <Key size={14} /> Atur Kunci API
                 </button>
              </div>
            )}

            <h2 className="text-[22px] sm:text-[26px] font-black text-indigo-950 leading-tight drop-shadow-sm mb-4">
              {currentQuiz.question}
            </h2>

            {selectedAnswer !== null && (
               <div className={`py-4 px-6 rounded-3xl font-black text-center mb-4 animate-bounceIn shadow-sm border-2 ${selectedAnswer === currentQuiz.answer ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                  {selectedAnswer === currentQuiz.answer ? (
                    <div className="flex flex-col items-center gap-1">
                       <span className="text-4xl font-arabic">{currentQuiz.arabicWord}</span>
                       <span className="text-[10px] uppercase tracking-[0.2em] font-black">Masya Allah! Jawabanmu Benar ✨</span>
                    </div>
                  ) : "Ups, Jawaban Kurang Tepat 😿"}
               </div>
            )}
        </div>

        <div className="grid grid-cols-1 gap-4 px-2">
          {currentQuiz.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuiz.answer;
            
            let buttonClass = "bg-white border-b-8 border-gray-100 text-gray-800 hover:border-indigo-400";
            if (isSelected) {
              buttonClass = isCorrect 
                ? "bg-emerald-500 border-emerald-700 text-white scale-105" 
                : "bg-rose-500 border-rose-700 text-white scale-95";
            } else if (selectedAnswer !== null && isCorrect) {
              buttonClass = "bg-emerald-50 border-emerald-200 text-emerald-700 opacity-60";
            }

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleQuizAnswer(idx, currentQuiz)}
                className={`w-full p-6 sm:p-8 rounded-[40px] text-center font-black text-[20px] sm:text-[22px] transition-all shadow-xl active:translate-y-1 active:border-b-0 group relative overflow-hidden ${buttonClass}`}
              >
                <span className="relative z-10">{opt}</span>
                {isSelected && isCorrect && <Sparkles className="absolute top-2 right-4 w-10 h-10 text-white/30 animate-pulse" />}
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 rounded-[40px] flex items-center gap-4 shadow-lg shadow-indigo-200 border-2 border-white">
            <div className="bg-white/20 p-3 rounded-2xl text-white animate-bounce">
                <Music size={24} />
            </div>
            <p className="text-[12px] sm:text-sm font-black text-white leading-relaxed tracking-wide">
               Ingat gambar dan dengar suaranya!<br/>
               <span className="opacity-80 font-bold uppercase text-[10px]">Ayo kumpulkan bintang juara! 🌟</span>
            </p>
        </div>
      </div>
    );
  };

  const renderStories = () => (
    <div className="space-y-4 flex flex-col h-full animate-fadeIn">
      <div className="bg-white p-5 rounded-[35px] border-2 border-rose-100 flex items-center gap-5 shadow-sm shadow-rose-900/5">
        <div className="w-16 h-16 bg-rose-500 rounded-[24px] flex items-center justify-center text-white shadow-lg relative overflow-hidden">
            <ScrollText className="w-9 h-9 relative z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-rose-400 opacity-30 transform -rotate-45 scale-150"></div>
        </div>
        <div>
          <h3 className="font-black text-gray-800 text-lg">Pencerita Kisah</h3>
          <p className="text-[11px] text-rose-500 font-black uppercase tracking-widest animate-pulse">Siap bercerita...</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 min-h-[400px] px-2 custom-scrollbar">
        {!tutorAnswer && !isLoading && (
            <div className="text-center py-20 opacity-50 space-y-4">
                <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-rose-400">
                    <BookOpen size={40} />
                </div>
                <p className="text-rose-900 font-bold text-sm">Tulis nama Sahabat yang<br/>ingin kamu dengar kisahnya!</p>
            </div>
        )}
        {tutorAnswer && (
          <div className="bg-white p-6 rounded-[35px] shadow-md border-2 border-rose-50 self-start max-w-[95%] text-[15px] leading-relaxed text-gray-700 font-medium animate-slideUp">
             <div className="mb-4 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                <div className="w-2 h-2 rounded-full bg-rose-300"></div>
                <div className="w-2 h-2 rounded-full bg-rose-200"></div>
             </div>
            {tutorAnswer}
          </div>
        )}
        {isLoading && (
          <div className="flex gap-2 items-center p-6 bg-rose-50 rounded-[35px] w-fit shadow-inner">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            <span className="text-xs font-black text-rose-800 ml-2">Kakak sedang buka buku...</span>
          </div>
        )}
        {apiError && (
          <div className="bg-rose-50 p-6 rounded-[35px] border-2 border-rose-100 text-rose-700 font-bold text-sm animate-fadeIn">
             <p className="mb-4 text-center">{apiError}</p>
             <button 
                onClick={handleOpenSelectKey}
                className="w-full bg-rose-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
             >
                <Key size={18} /> Pakai Kunci API Sendiri
             </button>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white p-5 rounded-t-[45px] shadow-[0_-20px_40px_rgba(255,93,115,0.08)] space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={tutorQuestion}
            onChange={(e) => setTutorQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskTutor()}
            placeholder="Tanya kisah Khalid bin Walid..."
            className="flex-1 bg-gray-50 border-2 border-transparent rounded-[25px] px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-rose-100 focus:bg-white focus:border-rose-300 outline-none transition-all placeholder:text-gray-300"
          />
          <button
            onClick={handleAskTutor}
            disabled={isLoading || !tutorQuestion.trim()}
            className="bg-rose-500 text-white p-4 rounded-[25px] disabled:opacity-30 shadow-lg shadow-rose-200 active:scale-90 transition-all"
          >
            <MessageSquare className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );

  const getTitle = () => {
    switch(currentSection) {
      case AppSection.HOME: return "Hafiz Cilik";
      case AppSection.TALAQQI: return selectedSurah ? selectedSurah.name : "Belajar Hafalan";
      case AppSection.DOA: return selectedDoa ? "Baca Doa" : "Doa Harian";
      case AppSection.QUIZ: return selectedTheme ? `Kuis ${selectedTheme.title}` : "Kuis Seru";
      case AppSection.STORIES: return "Kisah Sahabat";
      default: return "Hafiz Cilik";
    }
  };

  return (
    <Layout currentSection={currentSection} onNavigate={handleNavigate} title={getTitle()}>
      {currentSection === AppSection.HOME && renderHome()}
      {currentSection === AppSection.TALAQQI && renderTalaqqi()}
      {currentSection === AppSection.DOA && renderDoa()}
      {currentSection === AppSection.QUIZ && renderQuiz()}
      {currentSection === AppSection.STORIES && renderStories()}
    </Layout>
  );
};

export default App;
