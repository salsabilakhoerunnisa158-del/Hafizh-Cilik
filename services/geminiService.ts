
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askIslamicTutor = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Anda adalah "Kakak Pencerita" yang hebat, ramah, dan lucu untuk anak-anak muslim.
        Tugas utama Anda adalah menceritakan Kisah Sahabat Nabi Muhammad SAW atau memberikan penjelasan tentang Al-Quran dengan cara yang sangat seru dan penuh hikmah.
        Gunakan bahasa Indonesia yang ceria, mudah dimengerti (seperti mendongeng), dan banyak gunakan emoji yang lucu ✨🌟🛡️.
        Selalu berikan pesan kebaikan (moral) yang konkret dan bisa ditiru anak-anak dalam kehidupan sehari-hari.`,
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
  const prompt = `Berikan "Pesan & Hikmah" yang sangat seru dan menyentuh hati dari Surah ${surahName} khusus untuk anak-anak. Jelaskan apa yang Allah ingin kita lakukan setelah membaca surah ini. Gunakan banyak emoji.`;
  return askIslamicTutor(prompt);
};

export const generateDoaAudio = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Bacakan doa berikut dengan perlahan dan jelas untuk anak-anak: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is usually a friendly child-appropriate voice
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
