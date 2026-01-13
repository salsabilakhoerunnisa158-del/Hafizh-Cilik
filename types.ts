
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio: string;
  translation: string;
}

export interface Doa {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  imageUrl?: string;
  arabicWord: string;
}

export interface QuizTheme {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

export enum AppSection {
  HOME = 'HOME',
  TALAQQI = 'TALAQQI',
  DOA = 'DOA',
  QUIZ = 'QUIZ',
  STORIES = 'STORIES'
}
