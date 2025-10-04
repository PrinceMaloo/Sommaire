import { GoogleGenAI } from '@google/genai';
import { SUMMARY_SYSTEM_PROMPT } from '@/lib/prompts';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APIKEY });

export default async function summaryFromGemini(content: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: content,
    config: {
      systemInstruction: SUMMARY_SYSTEM_PROMPT,
    },
  });
  return response.text;
}
