
import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly as specified in the guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askCooperativeAI = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah asisten virtual Koperasi Digital. Anda membantu anggota memahami simulasi pinjaman, aturan simpan pinjam, dan memberikan saran finansial dasar berdasarkan data koperasi. Jawablah dengan bahasa Indonesia yang ramah dan profesional.",
        temperature: 0.7,
      },
    });
    // Use the .text property to get string content from response
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Maaf, asisten AI sedang tidak tersedia saat ini. Silakan coba lagi nanti.";
  }
};
