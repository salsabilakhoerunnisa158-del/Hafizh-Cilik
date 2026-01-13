
import React from 'react';
import { Surah, Doa, QuizQuestion } from './types';
import { BookOpen, Star, PlayCircle, Award, BookOpenCheck } from 'lucide-react';

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
    title: "Bangun Tidur",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation: "Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami dan kepada-Nya kami kembali.",
    imageUrl: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
    transliteration: "Bismika Allahumma ahyaa wa amuutu",
    translation: "Dengan nama-Mu ya Allah aku hidup dan aku mati.",
    imageUrl: "https://images.unsplash.com/photo-1520206153919-5ee71bc86934?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Keluar Rumah",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi tawakkaltu 'alallah, laa hawla walaa quwwata illa billah",
    translation: "Dengan nama Allah, aku bertawakal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "Masuk Rumah",
    arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajnaa, wa bismillahi kharajnaa, wa 'alallahi rabbinaa tawakkalnaa",
    translation: "Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Tuhan kami, kami bertawakal.",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    title: "Masuk Masjid",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahummaf-tah lii abwaaba rahmatik",
    translation: "Ya Allah, bukakanlah bagiku pintu-pintu rahmat-Mu.",
    imageUrl: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    title: "Keluar Masjid",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma innii as'aluka min fadhlik",
    translation: "Ya Allah, aku memohon kepada-Mu akan limpahan karunia-Mu.",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 7,
    title: "Masuk WC",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Allahumma innii a'uudzu bika minal khubutsi wal khabaa'its",
    translation: "Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 8,
    title: "Keluar WC",
    arabic: "غُفْرَانَكَ",
    transliteration: "Ghufranak",
    translation: "Aku memohon ampunan-Mu.",
    imageUrl: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 9,
    title: "Memakai Baju",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi kasani hadha wa razaqanihi min ghayri hawlin minni wala quwwah",
    translation: "Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan memberikan rezeki kepadaku tanpa daya dan kekuatan dariku.",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 10,
    title: "Sebelum Makan",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar",
    translation: "Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan jauhkanlah kami dari siksa api neraka.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 11,
    title: "Orang Tua",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbighfir lii waliwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa",
    translation: "Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah mereka sebagaimana mereka menyayangiku di waktu kecil.",
    imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=400"
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
  { id: 'TALAQQI', label: 'Talaqqi', icon: <PlayCircle className="w-8 h-8" />, color: 'bg-[#00D094]' }, // Vibrant Mint Green
  { id: 'DOA', label: 'Doa Harian', icon: <Star className="w-8 h-8" />, color: 'bg-[#FFB100]' }, // Sunny Yellow
  { id: 'QUIZ', label: 'Kuis Arab', icon: <Award className="w-8 h-8" />, color: 'bg-[#6B66FF]' }, // Playful Purple
  { id: 'STORIES', label: 'Kisah Sahabat', icon: <BookOpenCheck className="w-8 h-8" />, color: 'bg-[#FF5D73]' }, // Cheerful Rose
];
