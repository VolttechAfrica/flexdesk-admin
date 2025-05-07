import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINITOKEN } from "@config/constants";
import retryAsync from "@utilities/retryAsync";

export const generateWithGemini = async (
  prompt: string,
  config: { temperature: number; maxTokens: number; retryAttempts: number }
): Promise<string> => {
  const gemini = new GoogleGenerativeAI(GEMINITOKEN);
  const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

  return retryAsync(async () => {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxTokens
      },
    });
    return result.response.text();
  }, config.retryAttempts);
};