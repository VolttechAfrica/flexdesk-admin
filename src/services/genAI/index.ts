import extractJSON from "@utilities/extract";
import { GenAIRequest, GenAIResponse } from "@type/genAI";
import { generateWithGemini } from "@services/genAI/models/gemini";
import { generateWithDeepSeek } from "@services/genAI/models/deepseek";
import { generateWithOpenAI } from "@services/genAI/models/openai";
import { buildPromptForGemini, buildPromptForDeepSeek } from "@services/genAI/buildPrompt";
import { modelConfigs } from "@config/modelConfigs";

const processQuestion = async (
  params: GenAIRequest
): Promise<GenAIResponse> => {
  try {
    const config = modelConfigs[params.model];
    let prompt: string;
    let rawResponse: string;

    switch (params.model) {
      case "gemini":
        prompt = buildPromptForGemini(params);
        rawResponse = await Promise.race([
          generateWithGemini(prompt, config),
          new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 120000)
          ),
        ])
        break;
      case "deepseek":

        prompt = buildPromptForDeepSeek(params);
        rawResponse = await Promise.race([
          generateWithDeepSeek(prompt, config),
          new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 120000)
          ),
        ]);
        break;
      case "openai":
        prompt = buildPromptForDeepSeek(params)
        rawResponse = await Promise.race([
          generateWithOpenAI(prompt, config),
          new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 120000)
          ),
        ])
      default:
        throw new Error(`Unsupported model: ${params.model}`);
    }

    console.log('This is a raw output', rawResponse);

  

    const cleanedJSON = extractJSON(rawResponse);
   
    const parsed = JSON.parse(cleanedJSON) as GenAIResponse;
    if(!parsed || !Array.isArray(parsed.questions)){
      throw new Error(" No valid questions returned from AI")
    }

    return parsed

   
  } catch (error: any) {
    console.error("AI question generation failed:", error);
    throw new Error(error?.message || "Failed to generate questions.");
  }
};

export default processQuestion;
