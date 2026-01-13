
import React from 'react';
import { Surah, Doa, QuizTheme } from './types';
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
  { number: 107, name: "Al-Ma'un", englishName: "Small Kindness", numberOfAyahs: 7, revelationType: "Meccan" },
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
    imageUrl: "https://www.svgrepo.com/show/396144/boy-in-bed.svg"
  },
  {
    id: 2,
    title: "Sebelum Tidur",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
    transliteration: "Bismika Allahumma ahyaa wa amuutu",
    translation: "Dengan nama-Mu ya Allah aku hidup dan aku mati.",
    imageUrl: "https://www.svgrepo.com/show/333469/sleep.svg"
  },
  {
    id: 3,
    title: "Masuk WC",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Allahumma innii a'uudzu bika minal khubutsi wal khabaa'its",
    translation: "Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.",
    imageUrl: "https://www.svgrepo.com/show/305214/toilet.svg"
  }
];

export const QUIZ_THEMES: QuizTheme[] = [
  {
    id: 'hewan',
    title: 'Nama Hewan',
    icon: '🦁',
    color: 'bg-orange-400',
    questions: [
      { id: 1, question: "Apa bahasa Arab untuk 'Gajah'?", options: ["Asadun", "Fiilun", "Jamalun", "Qithun"], answer: 1, explanation: "Fiilun (فِيْلٌ) adalah Gajah.", imageUrl: "https://www.svgrepo.com/show/405187/elephant.svg", arabicWord: "فِيْلٌ" },
      { id: 2, question: "Hewan 'Singa' dalam bahasa Arab disebut?", options: ["Qirdu", "Namiru", "Asadun", "Kalbun"], answer: 2, explanation: "Asadun (أَسَدٌ) adalah Singa.", imageUrl: "https://www.svgrepo.com/show/406691/lion.svg", arabicWord: "أَسَدٌ" },
      { id: 3, question: "Apa sebutan untuk 'Unta'?", options: ["Jamalun", "Ghonamun", "Baqorun", "Hisounun"], answer: 0, explanation: "Jamalun (جَمَلٌ) adalah Unta.", imageUrl: "https://www.svgrepo.com/show/404928/camel.svg", arabicWord: "جَمَلٌ" },
      { id: 4, question: "Kucing lucu ini bahasa Arabnya apa ya?", options: ["Kalbun", "Qithun", "Fa'run", "Arnabun"], answer: 1, explanation: "Qithun (قِطٌّ) adalah Kucing.", imageUrl: "https://www.svgrepo.com/show/404958/cat.svg", arabicWord: "قِطٌّ" },
      { id: 5, question: "Apa bahasa Arabnya 'Burung'?", options: ["Thoirun", "Samakun", "Namlun", "Nahlun"], answer: 0, explanation: "Thoirun (طَيْرٌ) adalah Burung.", imageUrl: "https://www.svgrepo.com/show/404889/bird.svg", arabicWord: "طَيْرٌ" },
      { id: 6, question: "Ikan yang berenang di air disebut?", options: ["Samakun", "Thoirun", "Dzulbabun", "Ba'udhoh"], answer: 0, explanation: "Samakun (سَمَكٌ) adalah Ikan.", imageUrl: "https://www.svgrepo.com/show/405333/fish.svg", arabicWord: "سَمَكٌ" },
      { id: 7, question: "Apa bahasa Arabnya 'Kelinci'?", options: ["Arnabun", "Fa'run", "Namiru", "Asadun"], answer: 0, explanation: "Arnabun (أَرْنَبٌ) adalah Kelinci.", imageUrl: "https://www.svgrepo.com/show/406716/rabbit.svg", arabicWord: "أَرْنَبٌ" },
      { id: 8, question: "Hewan 'Monyet' dalam bahasa Arab adalah?", options: ["Asadun", "Kalbun", "Qirdun", "Filun"], answer: 2, explanation: "Qirdun (قِرْدٌ) adalah Monyet.", imageUrl: "https://www.svgrepo.com/show/406696/monkey.svg", arabicWord: "قِرْدٌ" },
      { id: 9, question: "Sapi perah ini bahasa Arabnya apa?", options: ["Ghonamun", "Baqorotun", "Jamalun", "Filun"], answer: 1, explanation: "Baqorotun (بَقَرَةٌ) adalah Sapi.", imageUrl: "https://www.svgrepo.com/show/405021/cow.svg", arabicWord: "بَقَرَةٌ" },
      { id: 10, question: "Kambing yang suka mengembik?", options: ["Ghonamun", "Baqorotun", "Hisounun", "Jamalun"], answer: 0, explanation: "Ghonamun (غَنَمٌ) adalah Kambing.", imageUrl: "https://www.svgrepo.com/show/405401/goat.svg", arabicWord: "غَنَمٌ" }
    ]
  },
  {
    id: 'buah',
    title: 'Buah-buahan',
    icon: '🍎',
    color: 'bg-red-400',
    questions: [
      { id: 1, question: "Apa bahasa Arabnya 'Apel'?", options: ["Mauzun", "Burtuqalun", "Tuffahun", "Inabun"], answer: 2, explanation: "Tuffahun (تُفَّاحٌ) adalah Apel.", imageUrl: "https://www.svgrepo.com/show/404822/apple.svg", arabicWord: "تُفَّاحٌ" },
      { id: 2, question: "Buah 'Pisang' kuning ini?", options: ["Mauzun", "Manja", "Tamrun", "Bithikhun"], answer: 0, explanation: "Mauzun (مَوْزٌ) adalah Pisang.", imageUrl: "https://www.svgrepo.com/show/404859/banana.svg", arabicWord: "مَوْزٌ" },
      { id: 3, question: "Buah 'Jeruk' yang segar?", options: ["Ananas", "Burtuqalun", "Rummanun", "Inabun"], answer: 1, explanation: "Burtuqalun (بُرْتُقَالٌ) adalah Jeruk.", imageUrl: "https://www.svgrepo.com/show/406634/orange.svg", arabicWord: "بُرْتُقَالٌ" },
      { id: 4, question: "Apa bahasa Arabnya 'Anggur'?", options: ["Inabun", "Tamrun", "Tuffahun", "Manja"], answer: 0, explanation: "Inabun (عِنَبٌ) adalah Anggur.", imageUrl: "https://www.svgrepo.com/show/405527/grapes.svg", arabicWord: "عِنَبٌ" },
      { id: 5, question: "Buah 'Kurma' makanan sunnah?", options: ["Mauzun", "Tamrun", "Bithikhun", "Rummanun"], answer: 1, explanation: "Tamrun (تَمْرٌ) adalah Kurma.", imageUrl: "https://www.svgrepo.com/show/421712/date-fruit.svg", arabicWord: "تَمْرٌ" },
      { id: 6, question: "Semangka besar merah?", options: ["Bithikhun", "Ananas", "Tuffahun", "Burtuqalun"], answer: 0, explanation: "Bithikhun (بِطِّيْخٌ) adalah Semangka.", imageUrl: "https://www.svgrepo.com/show/406830/watermelon.svg", arabicWord: "بِطِّيْخٌ" },
      { id: 7, question: "Buah 'Nanas' yang berduri?", options: ["Manja", "Ananas", "Rummanun", "Mauzun"], answer: 1, explanation: "Ananas (أَنَانَاسٌ) adalah Nanas.", imageUrl: "https://www.svgrepo.com/show/406659/pineapple.svg", arabicWord: "أَنَانَاسٌ" },
      { id: 8, question: "Buah 'Delima' dalam Al-Quran?", options: ["Rummanun", "Inabun", "Tuffahun", "Tamrun"], answer: 0, explanation: "Rummanun (رُمَّانٌ) adalah Delima.", imageUrl: "https://www.svgrepo.com/show/406714/pomegranate.svg", arabicWord: "رُمَّانٌ" },
      { id: 9, question: "Apa bahasa Arabnya 'Mangga'?", options: ["Manja", "Ananas", "Mauzun", "Burtuqalun"], answer: 0, explanation: "Manja (مَنْجَا) adalah Mangga.", imageUrl: "https://www.svgrepo.com/show/405995/mango.svg", arabicWord: "مَنْجَا" },
      { id: 10, question: "Buah 'Stroberi' merah mungil?", options: ["Farowilah", "Mauzun", "Inabun", "Tamrun"], answer: 0, explanation: "Farowilah (فَرَاوِلَةٌ) adalah Stroberi.", imageUrl: "https://www.svgrepo.com/show/406789/strawberry.svg", arabicWord: "فَرَاوِلَةٌ" }
    ]
  },
  {
    id: 'benda_langit',
    title: 'Benda Langit',
    icon: '🌙',
    color: 'bg-blue-400',
    questions: [
      { id: 1, question: "Apa bahasa Arabnya 'Matahari'?", options: ["Qomarun", "Syamsun", "Najmun", "Samaaun"], answer: 1, explanation: "Syamsun (شَمْسٌ) adalah Matahari.", imageUrl: "https://www.svgrepo.com/show/489957/sun.svg", arabicWord: "شَمْسٌ" },
      { id: 2, question: "Apa bahasa Arabnya 'Bulan'?", options: ["Syamsun", "Najmun", "Qomarun", "Ardhun"], answer: 2, explanation: "Qomarun (قَمَرٌ) adalah Bulan.", imageUrl: "https://www.svgrepo.com/show/489932/moon.svg", arabicWord: "قَمَرٌ" },
      { id: 3, question: "Bintang-bintang indah disebut?", options: ["Najmun", "Samaaun", "Ardhun", "Sihabun"], answer: 0, explanation: "Najmun (نَجْمٌ) adalah Bintang.", imageUrl: "https://www.svgrepo.com/show/489956/star.svg", arabicWord: "نَجْمٌ" },
      { id: 4, question: "Apa sebutan untuk 'Langit'?", options: ["Ardhun", "Samaaun", "Sahabun", "Mathorun"], answer: 1, explanation: "Samaaun (سَمَاءٌ) adalah Langit.", imageUrl: "https://www.svgrepo.com/show/489955/sky.svg", arabicWord: "سَمَاءٌ" },
      { id: 5, question: "Planet tempat kita tinggal 'Bumi'?", options: ["Ardhun", "Samaaun", "Najmun", "Qomarun"], answer: 0, explanation: "Ardhun (أَرْضٌ) adalah Bumi.", imageUrl: "https://www.svgrepo.com/show/489934/earth.svg", arabicWord: "أَرْضٌ" },
      { id: 6, question: "Awan putih di langit?", options: ["Sahabun", "Mathorun", "Bardun", "Harun"], answer: 0, explanation: "Sahabun (سَحَابٌ) adalah Awan.", imageUrl: "https://www.svgrepo.com/show/489931/cloud.svg", arabicWord: "سَحَابٌ" },
      { id: 7, question: "Air 'Hujan' yang berkah?", options: ["Sahabun", "Mathorun", "Samaaun", "Naharun"], answer: 1, explanation: "Mathorun (مَطَرٌ) adalah Hujan.", imageUrl: "https://www.svgrepo.com/show/489953/rain.svg", arabicWord: "مَطَرٌ" },
      { id: 8, question: "Pelangi warna-warni?", options: ["Quzuquzah", "Najmun", "Syamsun", "Sahabun"], answer: 0, explanation: "Qousu Quzah (قَوْسُ قُزَحَ) adalah Pelangi.", imageUrl: "https://www.svgrepo.com/show/489952/rainbow.svg", arabicWord: "قَوْسُ قُزَحَ" },
      { id: 9, question: "Waktu 'Malam' yang tenang?", options: ["Lailun", "Naharun", "Subhun", "Masaaun"], answer: 0, explanation: "Lailun (لَيْلٌ) adalah Malam.", imageUrl: "https://www.svgrepo.com/show/489932/moon.svg", arabicWord: "لَيْلٌ" },
      { id: 10, question: "Waktu 'Siang' yang cerah?", options: ["Naharun", "Lailun", "Asrun", "Maghribun"], answer: 0, explanation: "Naharun (نَهَارٌ) adalah Siang.", imageUrl: "https://www.svgrepo.com/show/489957/sun.svg", arabicWord: "نَهَارٌ" }
    ]
  },
  {
    id: 'anggota_badan',
    title: 'Anggota Badan',
    icon: '🖐️',
    color: 'bg-green-400',
    questions: [
      { id: 1, question: "Apa bahasa Arabnya 'Kepala'?", options: ["Yadun", "Ra'sun", "Rijlun", "Ainun"], answer: 1, explanation: "Ra'sun (رَأْسٌ) adalah Kepala.", imageUrl: "https://www.svgrepo.com/show/404497/head.svg", arabicWord: "رَأْسٌ" },
      { id: 2, question: "Mata untuk melihat?", options: ["Ainun", "Udzunun", "Anfun", "Fammun"], answer: 0, explanation: "Ainun (عَيْنٌ) adalah Mata.", imageUrl: "https://www.svgrepo.com/show/404481/eye.svg", arabicWord: "عَيْنٌ" },
      { id: 3, question: "Telinga untuk mendengar?", options: ["Udzunun", "Anfun", "Yadun", "Ainun"], answer: 0, explanation: "Udzunun (أُذُنٌ) adalah Telinga.", imageUrl: "https://www.svgrepo.com/show/404471/ear.svg", arabicWord: "أُذُنٌ" },
      { id: 4, question: "Hidung untuk mencium?", options: ["Anfun", "Fammun", "Lisanun", "Ra'sun"], answer: 0, explanation: "Anfun (أَنْفٌ) adalah Hidung.", imageUrl: "https://www.svgrepo.com/show/404555/nose.svg", arabicWord: "أَنْفٌ" },
      { id: 5, question: "Mulut untuk berbicara?", options: ["Fammun", "Lisanun", "Asnanun", "Ra'sun"], answer: 0, explanation: "Fammun (فَمٌ) adalah Mulut.", imageUrl: "https://www.svgrepo.com/show/404543/mouth.svg", arabicWord: "فَمٌ" },
      { id: 6, question: "Tangan untuk bekerja?", options: ["Yadun", "Rijlun", "Ra'sun", "Sothrun"], answer: 0, explanation: "Yadun (يَدٌ) adalah Tangan.", imageUrl: "https://www.svgrepo.com/show/404487/hand.svg", arabicWord: "يَدٌ" },
      { id: 7, question: "Kaki untuk berjalan?", options: ["Rijlun", "Yadun", "Ra'sun", "Bathnun"], answer: 0, explanation: "Rijlun (رِجْلٌ) adalah Kaki.", imageUrl: "https://www.svgrepo.com/show/404483/foot.svg", arabicWord: "رِجْلٌ" },
      { id: 8, question: "Gigi yang putih?", options: ["Asnanun", "Lisanun", "Fammun", "Anfun"], answer: 0, explanation: "Asnanun (أَسْنَانٌ) adalah Gigi.", imageUrl: "https://www.svgrepo.com/show/404618/tooth.svg", arabicWord: "أَسْنَانٌ" },
      { id: 9, question: "Rambut di kepala?", options: ["Sya'run", "Ra'sun", "Wajhun", "Ainun"], answer: 0, explanation: "Sya'run (شَعْرٌ) adalah Rambut.", imageUrl: "https://www.svgrepo.com/show/404505/hair.svg", arabicWord: "Sya'run" },
      { id: 10, question: "Wajah yang berseri?", options: ["Wajhun", "Sya'run", "Bathnun", "Sothrun"], answer: 0, explanation: "Wajhun (وَجْهٌ) adalah Wajah.", imageUrl: "https://www.svgrepo.com/show/404480/face.svg", arabicWord: "وَجْهٌ" }
    ]
  }
];

export const NAV_ITEMS = [
  { id: 'TALAQQI', label: 'Talaqqi', icon: <PlayCircle className="w-8 h-8" />, color: 'bg-[#00D094]' },
  { id: 'DOA', label: 'Doa Harian', icon: <Star className="w-8 h-8" />, color: 'bg-[#FFB100]' },
  { id: 'QUIZ', label: 'Kuis Arab', icon: <Award className="w-8 h-8" />, color: 'bg-[#6B66FF]' },
  { id: 'STORIES', label: 'Kisah Sahabat', icon: <BookOpenCheck className="w-8 h-8" />, color: 'bg-[#FF5D73]' },
];
