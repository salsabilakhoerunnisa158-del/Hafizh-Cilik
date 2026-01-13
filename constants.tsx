
import React from 'react';
import { Surah, Doa, QuizQuestion } from './types';
import { BookOpen, Star, MessageSquare, PlayCircle, Award } from 'lucide-react';

export const JUZ_30_SURAHS: Surah[] = [
  { number: 78, name: "An-Naba'", englishName: "The Tidings", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 79, name: "An-Nazi'at", englishName: "Those who drag forth", numberOfAyahs: 46, revelationType: "Meccan" },
  { number: 80, name: "Abasa", englishName: "He frowned", numberOfAyahs: 42, revelationType: "Meccan" },
  { number: 87, name: "Al-A'la", englishName: "The Most High", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 93, name: "Ad-Duha", englishName: "The Morning Hours", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 94, name: "Ash-Sharh", englishName: "The Relief", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 95, name: "At-Tin", englishName: "The Fig", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 96, name: "Al-Alaq", englishName: "The Clot", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 97, name: "Al-Qadr", englishName: "The Power", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 107, name: "Al-Ma'un", englishName: "Small Kindnesses", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 108, name: "Al-Kawthar", englishName: "Abundance", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 109, name: "Al-Kafirun", englishName: "The Disbelievers", numberOfAyahs: 6, revelationType: "Meccan" },
  { number: 110, name: "An-Nasr", englishName: "The Divine Support", numberOfAyahs: 3, revelationType: "Medinan" },
  { number: 111, name: "Al-Masad", englishName: "The Palm Fiber", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 112, name: "Al-Ikhlas", englishName: "Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "Al-Falaq", englishName: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "An-Nas", englishName: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" },
];

export const DAILY_DOAS: Doa[] = [
  {
    id: 1,
    title: "Doa Sebelum Makan",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar",
    translation: "Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan jauhkanlah kami dari siksa api neraka."
  },
  {
    id: 2,
    title: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
    transliteration: "Bismika Allahumma ahyaa wa amuutu",
    translation: "Dengan nama-Mu ya Allah aku hidup dan aku mati."
  },
  {
    id: 3,
    title: "Doa Untuk Orang Tua",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbighfir lii waliwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa",
    translation: "Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah mereka sebagaimana mereka menyayangiku di waktu kecil."
  }
];

export const ARABIC_QUIZZES: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa arti dari 'Baitun' (بَيْتٌ)?",
    options: ["Sekolah", "Rumah", "Masjid", "Taman"],
    answer: 1,
    explanation: "Baitun berarti Rumah."
  },
  {
    id: 2,
    question: "Warna 'Ahmar' (أَحْمَرُ) adalah?",
    options: ["Biru", "Hijau", "Kuning", "Merah"],
    answer: 3,
    explanation: "Ahmar adalah warna Merah."
  },
  {
    id: 3,
    question: "Berapa jumlah rakaat shalat Subuh?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation: "Shalat Subuh terdiri dari 2 rakaat."
  }
];

export const NAV_ITEMS = [
  { id: 'TALAQQI', label: 'Talaqqi', icon: <PlayCircle className="w-6 h-6" />, color: 'bg-emerald-500' },
  { id: 'DOA', label: 'Doa Harian', icon: <Star className="w-6 h-6" />, color: 'bg-amber-500' },
  { id: 'QUIZ', label: 'Kuis Arab', icon: <Award className="w-6 h-6" />, color: 'bg-indigo-500' },
  { id: 'TUTOR', label: 'Tanya Guru', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-rose-500' },
];
