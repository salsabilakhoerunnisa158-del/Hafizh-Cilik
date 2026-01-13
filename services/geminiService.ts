
import { GoogleGenAI } from "@google/genai";

// Always initialize with direct access to process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askIslamicTutor = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Anda adalah seorang guru mengaji (Ustadz/Ustadzah) yang sangat ramah dan ceria untuk anak-anak. 
        Gunakan bahasa yang mudah dimengerti anak-anak (bahasa Indonesia). 
        Berikan jawaban yang memotivasi mereka untuk belajar Al-Quran, Bahasa Arab, dan Adab. 
        Gunakan emoji yang lucu. Jika ditanya tentang Surah di Juz 30, jelaskan intisari ceritanya dengan menarik.`,
        temperature: 0.7,
      },
    });
    // Correctly using .text property.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf ya sayang, Guru sedang beristirahat sebentar. Coba tanya lagi nanti ya! 😊";
  }
};

export const getSurahExplanation = async (surahName: string) => {
  const prompt = `Ceritakan dengan singkat dan menarik untuk anak-anak tentang apa itu Surah ${surahName} dan kenapa kita harus membacanya.`;
  return askIslamicTutor(prompt);
};
