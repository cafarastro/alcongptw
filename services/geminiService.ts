import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// NOTE: In a real production app, you might proxy this through a backend to hide the key,
// but for this client-side demo as requested, we use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCelebrationCaption = async (imageBase64: string): Promise<string> => {
  try {
    // Remove header if present (data:image/png;base64,)
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming canvas export is PNG
              data: cleanBase64
            }
          },
          {
            text: "This is a photo of an employee at a company celebration event. Generate a short, exciting, professional yet fun social media caption (max 20 words) for them to post with this picture. Use emojis. Do not include hashtags."
          }
        ]
      }
    });

    return response.text || "Ready to celebrate! 🎉";
  } catch (error) {
    console.error("Gemini Caption Error:", error);
    return "Having a blast at the event! 🚀"; // Fallback
  }
};
