
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Doa {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export enum AppSection {
  HOME = 'HOME',
  TALAQQI = 'TALAQQI',
  DOA = 'DOA',
  QUIZ = 'QUIZ',
  TUTOR = 'TUTOR'
}
