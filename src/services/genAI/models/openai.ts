import OpenAI from "openai";
import { OPENAI_API_KEY } from "@config/constants";
import retryAsync from "@utilities/retryAsync";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const generateWithOpenAI = async (
  prompt: string,
  config: { temperature: number; maxTokens: number; retryAttempts: number }
): Promise<string> => {
  return retryAsync(async () => {
    const result = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4.1",
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    });

    return result.choices?.[0]?.message?.content || "";
  }, config.retryAttempts);
};
