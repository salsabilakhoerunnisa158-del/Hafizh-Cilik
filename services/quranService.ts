
import { Ayah } from '../types';

export const fetchSurahDetails = async (surahNumber: number): Promise<Ayah[]> => {
  try {
    // Fetch both Arabic (Alafasy) and Indonesian translation editions
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/ar.alafasy,id.indonesian`);
    const data = await response.json();
    
    if (data.code === 200) {
      const arabicEd = data.data[0];
      const indonesianEd = data.data[1];

      return arabicEd.ayahs.map((a: any, index: number) => ({
        number: a.number,
        numberInSurah: a.numberInSurah,
        text: a.text,
        audio: a.audio,
        translation: indonesianEd.ayahs[index].text
      }));
    }
    throw new Error('Gagal mengambil data Surah');
  } catch (error) {
    console.error('Quran API Error:', error);
    return [];
  }
};
