import OpenAI from "openai";
import { DEEP_SEEK_TOKEN, DEEP_SEEK_URL } from "@config/constants";
import retryAsync from "@utilities/retryAsync";

const openai = new OpenAI({
  baseURL: DEEP_SEEK_URL,
  apiKey: DEEP_SEEK_TOKEN,
  defaultHeaders: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json",
  },
});

export const generateWithDeepSeek = async (
  prompt: string,
  config: { temperature: number; maxTokens: number; retryAttempts: number }
): Promise<string> => {
  return retryAsync(async () => {
    const result = await openai.chat.completions.create({
      messages: [
        { role: "user", content: prompt }],
      model: "deepseek-chat",
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    });

    return result.choices?.[0]?.message?.content || "";
  }, config.retryAttempts);
};
