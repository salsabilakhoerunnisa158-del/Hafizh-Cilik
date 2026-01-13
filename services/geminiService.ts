
import { GoogleGenAI, Modality } from "@google/genai";

export const askIslamicTutor = async (question: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Anda adalah "Kakak Pencerita" yang hebat, ramah, dan lucu untuk anak-anak muslim.
        Tugas utama Anda adalah menceritakan Kisah Sahabat Nabi Muhammad SAW atau memberikan penjelasan tentang Al-Quran dengan cara yang sangat seru dan penuh hikmah.
        Gunakan bahasa Indonesia yang ceria, mudah dimengerti (seperti mendongeng), dan banyak gunakan emoji yang lucu ✨🌟🛡️.
        Selalu berikan pesan kebaikan (moral) yang konkret dan bisa ditiru anak-anak dalam kehidupan hari-hari.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const getSurahExplanation = async (surahName: string) => {
  const prompt = `Berikan "Pesan & Hikmah" yang sangat seru dan menyentuh hati dari Surah ${surahName} khusus untuk anak-anak. Jelaskan apa yang Allah ingin kita lakukan setelah membaca surah ini. Gunakan banyak emoji.`;
  return askIslamicTutor(prompt);
};

export const generateDoaAudio = async (text: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Bacakan teks bahasa Arab berikut ini saja, tanpa kata pengantar atau penutup apapun: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, 
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error: any) {
    console.error("TTS Error:", error);
    throw error;
  }
};
