
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askIslamicTutor = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Anda adalah "Kakak Pencerita" yang hebat, ramah, dan lucu untuk anak-anak muslim.
        Tugas utama Anda adalah menceritakan Kisah Sahabat Nabi Muhammad SAW dengan cara yang sangat seru, mendebarkan, dan penuh hikmah.
        Gunakan bahasa Indonesia yang ceria, mudah dimengerti (seperti mendongeng), dan banyak gunakan emoji yang lucu ✨🌟🛡️.
        Selalu akhiri cerita dengan satu pesan kebaikan (moral) yang bisa ditiru anak-anak.
        Jika ditanya di luar kisah sahabat, tetap jawab dengan nada seorang kakak yang membimbing dengan penuh kasih sayang.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ups, Kakak sedang mencari buku cerita lainnya sebentar. Coba tanya lagi nanti ya, Adik manis! 😊📖";
  }
};

export const getSurahExplanation = async (surahName: string) => {
  const prompt = `Ceritakan dengan singkat dan sangat seru untuk anak-anak tentang apa pesan penting di dalam Surah ${surahName}.`;
  return askIslamicTutor(prompt);
};
